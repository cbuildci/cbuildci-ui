/**
 * ExecutionDetailPage
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Panel, PanelTabs, TabButton } from 'components/Panel';
import PhasesTable from 'components/PhasesTable';
import BuildParamsTable from './BuildParamsTable';

const logs = [
    { text: '[Container] 2018/07/08 19:13:46 Waiting for agent ping' },
    { text: '[Container] 2018/07/08 19:13:50 Waiting for DOWNLOAD_SOURCE' },
    { text: '[Container] 2018/07/08 19:13:50 Phase is DOWNLOAD_SOURCE' },
    { text: '[Container] 2018/07/08 19:13:50 CODEBUILD_SRC_DIR=/codebuild/output/src090371394/src' },
    { text: '[Container] 2018/07/08 19:13:50 YAML location is /codebuild/output/src090371394/src/buildspec.yml' },
    { text: '[Container] 2018/07/08 19:13:50 Processing environment variables' },
    { text: '[Container] 2018/07/08 19:13:50 Moving to directory /codebuild/output/src090371394/src' },
    { text: '[Container] 2018/07/08 19:13:50 Registering with agent' },
    { text: '[Container] 2018/07/08 19:13:50 Phases found in YAML: 4' },
    { text: '[Container] 2018/07/08 19:13:50 INSTALL: 2 commands' },
    { text: '[Container] 2018/07/08 19:13:50 PRE_BUILD: 1 commands' },
    { text: '[Container] 2018/07/08 19:13:50 BUILD: 2 commands' },
    { text: '[Container] 2018/07/08 19:13:50 POST_BUILD: 1 commands' },
    { text: '[Container] 2018/07/08 19:13:50 Phase complete: DOWNLOAD_SOURCE Success: true', color: '#859900' },
    { text: '[Container] 2018/07/08 19:13:50 Phase context status code: Message:' },
    { text: '[Container] 2018/07/08 19:13:50 Entering phase INSTALL', color: '#268bd2' },
    { text: '[Container] 2018/07/08 19:13:50 Running command echo install', color: '#6c71c4' },
    { text: 'install' },
    { text: '' },
    { text: '[Container] 2018/07/08 19:13:50 Running command sleep $SLEEP_TIME', color: '#6c71c4' },
    { text: '' },
    { text: '[Container] 2018/07/08 19:13:55 Phase complete: INSTALL Success: true', color: '#859900' },
    { text: '[Container] 2018/07/08 19:13:55 Phase context status code: Message:' },
    { text: '[Container] 2018/07/08 19:13:55 Entering phase PRE_BUILD', color: '#268bd2' },
    { text: '[Container] 2018/07/08 19:13:55 Running command echo pre_build', color: '#6c71c4' },
    { text: 'pre_build' },
    { text: '' },
    { text: '[Container] 2018/07/08 19:13:55 Phase complete: PRE_BUILD Success: true', color: '#859900' },
    { text: '[Container] 2018/07/08 19:13:55 Phase context status code: Message:' },
    { text: '[Container] 2018/07/08 19:13:55 Entering phase BUILD', color: '#268bd2' },
    { text: '[Container] 2018/07/08 19:13:55 Running command echo build', color: '#6c71c4' },
    { text: 'build' },
    { text: '' },
    { text: '[Container] 2018/07/08 19:13:55 Running command bash -c \'[ "$FAIL" == "" ]\'', color: '#6c71c4' },
    { text: '' },
    { text: '[Container] 2018/07/08 19:13:55 Phase complete: BUILD Success: true', color: '#859900' },
    { text: '[Container] 2018/07/08 19:13:55 Phase context status code: Message:' },
    { text: '[Container] 2018/07/08 19:13:55 Entering phase POST_BUILD', color: '#268bd2' },
    { text: '[Container] 2018/07/08 19:13:55 Running command echo post_build', color: '#6c71c4' },
    { text: 'post_build' },
    { text: '' },
    { text: '[Container] 2018/07/08 19:13:55 Phase complete: POST_BUILD Success: true', color: '#859900' },
    { text: '[Container] 2018/07/08 19:13:55 Phase context status code: Message:' },
];

const Logs = styled.pre`
    font-size: 0.85rem;
    background-color: #002B36;
    color: #93A1A1;
    padding: 8px;
    margin: 0;
`;

const TAB_LOGS = 'LOGS';
const TAB_PHASES = 'PHASES';
const TAB_ARTIFACTS = 'ARTIFACTS';
const TAB_PARAMETERS = 'PARAMETERS';

class BuildDetailPanel extends React.Component {

    constructor(props) {
        super(props);

        this.handleChangeTab = this.handleChangeTab.bind(this);
    }

    state = {
        tab: TAB_LOGS,
    };

    handleChangeTab(evt) {
        this.setState({
            tab: evt.target.getAttribute('data-tab'),
        });
    }

    render() {
        const { execution, buildKey } = this.props;
        const { tab } = this.state;

        const buildState = execution.state.builds[buildKey];

        return (
            <Panel>
                <PanelTabs>
                    <TabButton active={tab === TAB_LOGS} data-tab={TAB_LOGS} onClick={this.handleChangeTab}>
                        <i className="fas fa-desktop mr-2 text-muted"/>
                        Console
                    </TabButton>
                    <TabButton active={tab === TAB_PHASES} data-tab={TAB_PHASES} onClick={this.handleChangeTab}>
                        <i className="fas fa-tasks mr-2 text-muted"/>
                        Phases
                    </TabButton>
                    <TabButton active={tab === TAB_ARTIFACTS} data-tab={TAB_ARTIFACTS} onClick={this.handleChangeTab}>
                        <i className="fas fa-archive mr-2 text-muted"/>
                        Artifacts
                    </TabButton>
                    <TabButton active={tab === TAB_PARAMETERS} data-tab={TAB_PARAMETERS} onClick={this.handleChangeTab}>
                        <i className="fas fa-wrench mr-2 text-muted"/>
                        Parameters
                    </TabButton>
                </PanelTabs>

                {tab === TAB_LOGS && (
                    <React.Fragment>
                        <div className="mb-2">
                            Showing last 20 lines - <a href="#">View All</a>
                        </div>
                        <Logs>
                            {logs.slice(-20).map((v, i) => {
                                return (
                                    <span key={i} style={{ color: v.color }}>{`${v.text}\n`}</span>
                                );
                            })}
                        </Logs>
                    </React.Fragment>
                )}

                {tab === TAB_PHASES && (
                    <PhasesTable
                        phases={buildState.codeBuild && buildState.codeBuild.phases}
                    />
                )}

                {tab === TAB_ARTIFACTS && (
                    <div>Artifacts</div>
                )}

                {tab === TAB_PARAMETERS && (
                    <BuildParamsTable
                        buildParams={buildState.buildParams}
                    />
                )}
            </Panel>
        );
    }
}

BuildDetailPanel.propTypes = {
    execution: PropTypes.object.isRequired,
    buildKey: PropTypes.string.isRequired,
};

export default BuildDetailPanel;
