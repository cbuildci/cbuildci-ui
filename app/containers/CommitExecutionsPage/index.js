/**
 * CommitExecutionsPage
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import ExecutionsBreadcrumb from 'components/ExecutionsBreadcrumb';
import { Panel, PanelHeader } from 'components/Panel';
import PageHeader from 'components/PageHeader';
import LoadingIndicator from 'components/LoadingIndicator';
import ExecutionStatus, { getStatusColor } from 'components/ExecutionStatus';
import ExecutionStartMessage from 'components/ExecutionStartMessage';
import ExecutionStopMessage from 'components/ExecutionStopMessage';

import reducer, { injectReducer } from './reducer';
import saga, { injectSaga } from './saga';
import messages from './messages';

import {
    selectIsLoading,
    selectExecutions,
    selectLoadError,
} from './selectors';

import {
    pageOpened,
    pageClosed,
} from './actions';

/* eslint-disable react/prefer-stateless-function */
export class CommitExecutionsPage extends React.Component {

    componentDidMount() {
        this.props.onOpen();
    }

    componentWillUnmount() {
        this.props.onClose();
    }

    render() {
        const {
            owner,
            repo,
            commit,
            isLoading,
            loadError,
            executions,
        } = this.props;

        return (
            <React.Fragment>
                <Helmet>
                    <title>{`Executions for ${owner}/${repo}/${commit.substr(0, 8)}`}</title>
                    <meta name="description" content={`Executions for ${owner}/${repo}/${commit.substr(0, 8)}`}/>
                </Helmet>

                <ExecutionsBreadcrumb
                    owner={owner}
                    repo={repo}
                    commit={commit}
                />

                <PageHeader>
                    <FormattedMessage
                        {...messages.header}
                        values={{ commit: commit.substr(0, 10) }}
                    />
                </PageHeader>

                {isLoading && !executions && (
                    <LoadingIndicator/>
                )}

                {loadError && (
                    <Panel>
                        <PanelHeader>Error</PanelHeader>
                        <div>{loadError.message}</div>
                    </Panel>
                )}

                {executions && executions.map((execution) => (
                    <Panel bandColor={getStatusColor(execution.conclusion || execution.status)} key={execution.executionNum}>
                        <div className="d-flex flex-column-sm">
                            <div className="flex-shrink-0" style={{ fontSize: '2rem', marginRight: '12px' }}>
                                <Link to={`/repo/${execution.owner}/${execution.repo}/commit/${execution.commit}/exec/${execution.executionNum}`}>
                                    <i className="fas fa-shipping-fast fa-fw mr-2"/>#{execution.executionNum}
                                </Link>
                            </div>
                            <div>
                                <div>
                                    <ExecutionStatus status={execution.conclusion || execution.status}/>
                                </div>
                                <div className="d-flex align-items-baseline">
                                    <i className="fas fa-play-circle fa-fw text-muted mr-1 flex-shrink-0"/>
                                    <ExecutionStartMessage
                                        githubHost={'foobar'}
                                        createTime={execution.createTime}
                                        owner={execution.owner}
                                        repo={execution.repo}
                                        event={execution.meta.event}
                                    />
                                </div>
                                <div className="d-flex align-items-baseline">
                                    <i className="fas fa-stop-circle fa-fw text-muted mr-1 flex-shrink-0"/>
                                    <ExecutionStopMessage
                                        githubHost={'foobar'}
                                        createTime={execution.createTime}
                                        conclusionTime={execution.conclusionTime}
                                        stopUser={execution.meta.stop && execution.meta.stop.user}
                                        stopRequestTime={execution.meta.stop && execution.meta.stop.requestTime}
                                    />
                                </div>
                            </div>
                        </div>
                    </Panel>
                ))}

            </React.Fragment>
        );
    }
}

CommitExecutionsPage.propTypes = {
    owner: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    commit: PropTypes.string.isRequired,

    isLoading: PropTypes.bool,
    executions: PropTypes.arrayOf(PropTypes.object),
    loadError: PropTypes.object,

    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

CommitExecutionsPage.defaultProps = {
    isLoading: false,
    executions: null,
    loadError: null,
};

function mapStateToProps(state) {
    return {
        // Store values
        isLoading: selectIsLoading(state),
        executions: selectExecutions(state),
        loadError: selectLoadError(state),
    };
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    onOpen: () => pageOpened(
        ownProps.owner,
        ownProps.repo,
        ownProps.commit,
        ownProps.executionNum,
    ),
    onClose: pageClosed,
}, dispatch);

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer('commitExecutionsPage', reducer);
const withSaga = injectSaga('commitExecutionsPage', saga);

export default compose(
    withReducer,
    withSaga,
    withConnect
)(CommitExecutionsPage);
