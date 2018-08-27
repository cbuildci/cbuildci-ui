/**
 * RepoExecutionsPage
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
import CommitMeta from 'components/CommitMeta';

import reducer, { injectReducer } from './reducer';
import saga, { injectSaga } from './saga';
import messages from './messages';

import {
    selectGithubHost,
} from 'containers/App/selectors';

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
export class RepoExecutionsPage extends React.Component {

    componentDidMount() {
        this.props.onOpen();
    }

    componentWillUnmount() {
        this.props.onClose();
    }

    render() {
        const {
            githubHost,
            owner,
            repo,
            isLoading,
            loadError,
            executions,
        } = this.props;

        return (
            <React.Fragment>
                <Helmet>
                    <title>{`Executions for ${owner}/${repo}`}</title>
                    <meta name="description" content={`Executions for ${owner}/${repo}`}/>
                </Helmet>

                <ExecutionsBreadcrumb
                    owner={owner}
                    repo={repo}
                />

                <PageHeader>
                    <FormattedMessage
                        {...messages.header}
                        values={{ owner, repo }}
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
                    <Panel bandColor={getStatusColor(execution.conclusion || execution.status)} key={`${execution.commit}/${execution.executionNum}`}>
                        <div className="d-flex flex-column-sm">
                            <div className="flex-shrink-0" style={{ fontSize: '1.3rem', marginRight: '12px' }}>
                                <Link to={`/repo/${execution.owner}/${execution.repo}/commit/${execution.commit}/exec/${execution.executionNum}`}>
                                    <i className="fas fa-code-branch fa-fw mr-2"/>{execution.commit.substr(0, 10)}<br/>
                                    <i className="fas fa-shipping-fast fa-fw mr-2"/>#{execution.executionNum}
                                </Link>
                            </div>
                            <div>
                                <div>
                                    <ExecutionStatus status={execution.conclusion || execution.status}/>
                                </div>
                                {execution.meta.commit && (
                                    <div>
                                        <CommitMeta
                                            githubHost={githubHost}
                                            message={execution.meta.commit.message}
                                            author={execution.meta.commit.author}
                                        />
                                    </div>
                                )}
                                <div className="d-flex align-items-baseline">
                                    {/* <i className="fas fa-play-circle fa-fw text-muted mr-1 flex-shrink-0"/> */}
                                    <ExecutionStartMessage
                                        githubHost={githubHost}
                                        createTime={execution.createTime}
                                        owner={execution.owner}
                                        repo={execution.repo}
                                        event={execution.meta.event}
                                    />
                                </div>
                                {(execution.conclusionTime != null || execution.meta.stop) && (
                                    <div className="d-flex align-items-baseline">
                                        {/* <i className="fas fa-stop-circle fa-fw text-muted mr-1 flex-shrink-0"/> */}
                                        <ExecutionStopMessage
                                            githubHost={githubHost}
                                            createTime={execution.createTime}
                                            conclusionTime={execution.conclusionTime}
                                            stopUser={execution.meta.stop && execution.meta.stop.user}
                                            stopRequestTime={execution.meta.stop && execution.meta.stop.requestTime}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </Panel>
                ))}

            </React.Fragment>
        );
    }
}

RepoExecutionsPage.propTypes = {
    githubHost: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,

    isLoading: PropTypes.bool,
    executions: PropTypes.arrayOf(PropTypes.object),
    loadError: PropTypes.object,

    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

RepoExecutionsPage.defaultProps = {
    isLoading: false,
    executions: null,
    loadError: null,
};

function mapStateToProps(state) {
    return {
        // Store values
        githubHost: selectGithubHost(state),
        isLoading: selectIsLoading(state),
        executions: selectExecutions(state),
        loadError: selectLoadError(state),
    };
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    onOpen: () => pageOpened(
        ownProps.owner,
        ownProps.repo,
    ),
    onClose: pageClosed,
}, dispatch);

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer('repoExecutionsPage', reducer);
const withSaga = injectSaga('repoExecutionsPage', saga);

export default compose(
    withReducer,
    withSaga,
    withConnect
)(RepoExecutionsPage);
