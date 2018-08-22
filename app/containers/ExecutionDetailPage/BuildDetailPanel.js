/**
 * ExecutionDetailPage
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Panel, PanelTabs, TabButton } from 'components/Panel';
import PhasesTable from 'components/PhasesTable';
import BuildParamsTable from './BuildParamsTable';

import {
    selectIsLoadingLogs,
    selectExecutionLogs,
    selectLoadLogsError,
} from './selectors';
import {
    selectGithubHost,
} from 'containers/App/selectors';
import {
    buildOpened,
    buildClosed,
} from './actions';

function getLineColor(message) {
    const match = message.match(/^\[Container] \d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2} (Phase complete: |Entering phase |Running command )/);
    if (!match) {
        return null;
    }

    if (match[1] === 'Phase complete: ') {
        return '#859900';
    }
    else if (match[1] === 'Entering phase ') {
        return '#268bd2';
    }
    else if (match[1] === 'Running command ') {
        return '#6c71c4';
    }
}

const Logs = styled.pre`
    font-size: 0.85rem;
    background-color: #002B36;
    color: #93A1A1;
    padding: 8px;
    margin: 0;
`;

const LogLine = styled.div`
    min-height: 1.25rem;

    ${({ color }) => color && css`
        color: ${color};
    `}
`;

const TAB_LOGS = 'LOGS';
const TAB_PHASES = 'PHASES';
const TAB_ARTIFACTS = 'ARTIFACTS';
const TAB_PARAMETERS = 'PARAMETERS';

export class BuildDetailPanel extends React.Component {

    componentDidMount() {
        this.props.onOpen();
    }

    componentWillUnmount() {
        this.props.onClose();
    }

    constructor(props) {
        super(props);

        this.handleChangeTab = this.handleChangeTab.bind(this);
    }

    state = {
        tab: TAB_LOGS,
    };

    handleChangeTab(evt) {
        this.setState({
            tab: evt.currentTarget.getAttribute('data-tab'),
        });
    }

    render() {
        const {
            execution,
            buildKey,
            executionLogs,
        } = this.props;
        const { tab } = this.state;

        const buildState = execution.state.builds[buildKey];
        const logLines = [];

        if (tab === TAB_LOGS) {
            for (let i = 0; i < 50; i++) {
                const message = executionLogs && executionLogs[i]
                    ? executionLogs[i].message.replace(/\n$/, '')
                    : '';

                const color = getLineColor(message);

                logLines.push(
                    <LogLine key={i} color={color}>
                        {message}
                    </LogLine>
                );
            }
        }

        return (
            <Panel>
                <PanelTabs>
                    <TabButton active={tab === TAB_LOGS} data-tab={TAB_LOGS} onClick={this.handleChangeTab}>
                        <i className="fas fa-desktop mr-2 text-muted"/>
                        <span className={tab === TAB_LOGS ? '' : 'd-none d-sm-inline'}>Console</span>
                    </TabButton>
                    <TabButton active={tab === TAB_PHASES} data-tab={TAB_PHASES} onClick={this.handleChangeTab}>
                        <i className="fas fa-tasks mr-2 text-muted"/>
                        <span className={tab === TAB_PHASES ? '' : 'd-none d-sm-inline'}>Phases</span>
                    </TabButton>
                    <TabButton active={tab === TAB_ARTIFACTS} data-tab={TAB_ARTIFACTS} onClick={this.handleChangeTab}>
                        <i className="fas fa-archive mr-2 text-muted"/>
                        <span className={tab === TAB_ARTIFACTS ? '' : 'd-none d-sm-inline'}>Artifacts</span>
                    </TabButton>
                    <TabButton active={tab === TAB_PARAMETERS} data-tab={TAB_PARAMETERS} onClick={this.handleChangeTab}>
                        <i className="fas fa-wrench mr-2 text-muted"/>
                        <span className={tab === TAB_PARAMETERS ? '' : 'd-none d-sm-inline'}>Parameters</span>
                    </TabButton>
                </PanelTabs>

                {tab === TAB_LOGS && !!buildState.codeBuild && (
                    <React.Fragment>
                        <div className="mb-2">
                            Showing last 50 lines - <a href="#">View All</a>
                        </div>
                        <Logs>
                            {logLines}
                        </Logs>
                    </React.Fragment>
                )}

                {tab === TAB_PHASES && (
                    <div className="table-responsive-md">
                        <PhasesTable
                            phases={buildState.codeBuild && buildState.codeBuild.phases}
                        />
                    </div>
                )}

                {tab === TAB_ARTIFACTS && (
                    <div>Artifacts</div>
                )}

                {tab === TAB_PARAMETERS && (
                    <div className="table-responsive-md">
                        <BuildParamsTable
                            buildParams={buildState.buildParams}
                        />
                    </div>
                )}
            </Panel>
        );
    }
}

BuildDetailPanel.propTypes = {
    execution: PropTypes.object.isRequired,
    buildKey: PropTypes.string.isRequired,

    isLoadingLogs: PropTypes.bool,
    executionLogs: PropTypes.arrayOf(PropTypes.object),
    loadLogsError: PropTypes.object,

    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

BuildDetailPanel.defaultProps = {
    isLoadingLogs: false,
    executionLogs: null,
    loadLogsError: null,
};

function mapStateToProps(state) {
    return {
        // Store values
        isLoadingLogs: selectIsLoadingLogs(state),
        executionLogs: selectExecutionLogs(state),
        loadLogsError: selectLoadLogsError(state),
        githubHost: selectGithubHost(state),
    };
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    onOpen: () => buildOpened(
        ownProps.buildKey,
    ),
    onClose: buildClosed,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BuildDetailPanel);
