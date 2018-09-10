/**
 * ExecutionDetailPage
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';
import { Switch, Route } from 'react-router-dom';

import ErrorBoundary from 'components/ErrorBoundary';
import { panelErrorMessage } from 'components/RenderErrorPanel';
import { WindowHeightConsumer } from 'contexts/WindowHeight';
import { Panel, PanelHeader, PanelHeaderMini } from 'components/Panel';
import LoadingIndicator from 'components/LoadingIndicator';
import ExecutionsBreadcrumb from 'components/ExecutionsBreadcrumb';
import ExecutionSummaryPanel from './ExecutionSummaryPanel';
import BuildsPanel from './BuildsPanel';
import BuildSummaryPanel from './BuildSummaryPanel';
import BuildDetailPanel from './BuildDetailPanel';

import {
    selectIsLoading,
    selectExecution,
    selectLoadError,
} from './selectors';
import {
    selectGithubHost,
} from 'containers/App/selectors';
import reducer, { injectReducer } from './reducer';
import saga, { injectSaga } from './saga';
import {
    executionOpened,
    executionClosed,
} from './actions';

function BuildDetail({ execution, buildKey }) {
    const buildState = execution.state.builds[buildKey];

    if (!buildState) {
        return (
            <Panel>
                <PanelHeaderMini>
                    BUILD DETAIL
                </PanelHeaderMini>

                <div>Build <strong>{buildKey}</strong> does not exist.</div>
            </Panel>
        );
    }

    return (
        <React.Fragment>
            <BuildSummaryPanel
                buildState={buildState}
                executionCreateTime={execution.createTime}
                executionUpdateTime={execution.updateTime}
            />

            <WindowHeightConsumer>
                {(height) => (
                    <div style={{ minHeight: `${Math.max(height - 30, 0)}px` }}>
                        <ErrorBoundary errorMessage={panelErrorMessage}>
                            <BuildDetailPanel
                                key={buildKey}
                                execution={execution}
                                buildKey={buildKey}
                            />
                        </ErrorBoundary>
                    </div>
                )}
            </WindowHeightConsumer>
        </React.Fragment>
    );
}

BuildDetail.propTypes = {
    execution: PropTypes.object.isRequired,
    buildKey: PropTypes.string.isRequired,
};

export class ExecutionDetailPage extends React.Component {

    componentDidMount() {
        this.props.onOpen();
    }

    componentWillUnmount() {
        this.props.onClose();
    }

    render() {
        const {
            url,
            githubHost,
            owner,
            repo,
            commit,
            executionNum,
            isLoading,
            loadError,
            execution,
        } = this.props;

        return (
            <React.Fragment>
                <Helmet>
                    <title>{`Execution ${owner}/${repo}/${commit.substr(0, 8)}/#${executionNum}`}</title>
                    <meta name="description" content={`Execution ${owner}/${repo}/${commit.substr(0, 8)}/#${executionNum}`}/>
                </Helmet>

                <Switch>
                    <Route
                        path={`${url}/build/:buildKey`}
                        render={({ match }) => (
                            <ExecutionsBreadcrumb
                                owner={owner}
                                repo={repo}
                                commit={commit}
                                executionNum={executionNum}
                                buildKey={match.params.buildKey}
                            />
                        )}
                    />

                    <Route
                        path=""
                        render={() => (
                            <ExecutionsBreadcrumb
                                owner={owner}
                                repo={repo}
                                commit={commit}
                                executionNum={executionNum}
                            />
                        )}
                    />
                </Switch>

                {isLoading && !execution && (
                    <LoadingIndicator/>
                )}

                {loadError && (
                    <Panel>
                        <PanelHeader>Error</PanelHeader>
                        <div>{loadError.message}</div>
                    </Panel>
                )}

                {execution && (
                    <ErrorBoundary errorMessage={panelErrorMessage}>
                        <ExecutionSummaryPanel
                            githubHost={githubHost}
                            owner={owner}
                            repo={repo}
                            commit={commit}
                            author={execution.meta.commit.author}
                            commitMessage={execution.meta.commit.message}
                            status={execution.status}
                            createTime={execution.createTime}
                            executionEvent={execution.meta.event}
                            conclusion={execution.conclusion}
                            conclusionTime={execution.conclusionTime}
                            stopUser={execution.meta.stop && execution.meta.stop.user}
                            stopRequestTime={execution.meta.stop && execution.meta.stop.requestTime}
                        />
                    </ErrorBoundary>
                )}

                {execution && (
                    <Switch>
                        <Route
                            path={`${url}/build/:buildKey`}
                            render={({ match }) => (
                                <ErrorBoundary errorMessage={panelErrorMessage}>
                                    <BuildDetail
                                        execution={execution}
                                        buildKey={match.params.buildKey}
                                    />
                                </ErrorBoundary>
                            )}
                        />

                        <Route
                            path=""
                            render={() => (
                                <ErrorBoundary errorMessage={panelErrorMessage}>
                                    <BuildsPanel
                                        execution={execution}
                                    />
                                </ErrorBoundary>
                            )}
                        />
                    </Switch>
                )}
            </React.Fragment>
        );
    }
}

ExecutionDetailPage.propTypes = {
    url: PropTypes.string.isRequired,
    githubHost: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    commit: PropTypes.string.isRequired,
    executionNum: PropTypes.number.isRequired,

    isLoading: PropTypes.bool,
    execution: PropTypes.object,
    loadError: PropTypes.object,

    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

ExecutionDetailPage.defaultProps = {
    isLoading: false,
    execution: null,
    loadError: null,
};

function mapStateToProps(state) {
    return {
        // Store values
        isLoading: selectIsLoading(state),
        execution: selectExecution(state),
        loadError: selectLoadError(state),
        githubHost: selectGithubHost(state),
    };
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    onOpen: () => executionOpened(
        ownProps.owner,
        ownProps.repo,
        ownProps.commit,
        ownProps.executionNum,
    ),
    onClose: executionClosed,
}, dispatch);

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer('executionDetailPage', reducer);
const withSaga = injectSaga('executionDetailPage', saga);

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ExecutionDetailPage);
