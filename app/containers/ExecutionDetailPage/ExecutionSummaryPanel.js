/**
 * ExecutionSummaryPanel
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import ErrorBoundary from 'components/ErrorBoundary';
import { Panel, PanelHeaderMini } from 'components/Panel';
import ExecutionStatus, { getStatusColor } from 'components/ExecutionStatus';
import ExecutionStartMessage from 'components/ExecutionStartMessage';
import ExecutionStopMessage from 'components/ExecutionStopMessage';
import CommitMeta from 'components/CommitMeta';

const lineRenderError = <span><em>(Render Error)</em></span>;

function getActionIcon(action) {
    if (action === 'stop') {
        return 'fas fa-stop-circle';
    }
    else if (action === 'rerun') {
        return 'fas fa-redo-alt';
    }
    else {
        return null;
    }
}

function getActionButtonStyle(action) {
    if (action === 'stop') {
        return 'btn-outline-danger';
    }
    else if (action === 'rerun') {
        return 'btn-outline-primary';
    }
    else {
        return 'btn-outline-secondary';
    }
}

function ExecutionSummaryPanel({
    githubHost,
    owner,
    repo,
    commit,
    author,
    commitMessage,
    status,
    createTime,
    executionEvent,
    conclusion,
    conclusionTime,
    stopUser,
    stopRequestTime,
    actions,
    actionRequested,
    actionError,
    onActionRequest,
}) {
    return (
        <Panel bandColor={getStatusColor(conclusion || status)}>
            <PanelHeaderMini>
                <FormattedMessage {...messages.headerExecution}/>
            </PanelHeaderMini>

            <ErrorBoundary errorMessage={lineRenderError}>
                <div className="mt-1 mb-1 execution-status">
                    <ErrorBoundary errorMessage={lineRenderError}>
                        <ExecutionStatus status={conclusion || status}/>
                    </ErrorBoundary>
                </div>

                <div className="d-flex flex-wrap-sm mt-1 mb-1">
                    <div className="d-flex flex-wrap-xs">
                        <div className="d-flex mr-2 flex-shrink-0">
                            <CommitMeta
                                githubHost={githubHost}
                                message={commitMessage}
                                author={author}
                            />
                        </div>
                    </div>
                </div>

                <div className="d-inline-flex flex-wrap">
                    <span className="mr-2">
                        <a href={`https://${githubHost}/${owner}/${repo}`}>
                            <i className="fab fa-github fa-fw text-muted mr-1"/>
                            {owner}/{repo}
                        </a>
                    </span>

                    <span className="mr-2">
                        <a href={`https://${githubHost}/${owner}/${repo}/commit/${commit}`}>
                            <i className="fas fa-code-branch fa-fw text-muted mr-1"/>
                            <code>{commit.substr(0, 10)}</code>
                        </a>
                    </span>
                </div>

                <div className="d-flex align-items-baseline mt-1 mb-1">
                    <ErrorBoundary errorMessage={lineRenderError}>
                        <ExecutionStartMessage
                            createTime={createTime}
                            githubHost={githubHost}
                            owner={owner}
                            repo={repo}
                            event={executionEvent}
                        />
                    </ErrorBoundary>
                </div>

                {(conclusionTime != null || stopRequestTime != null) && (
                    <div className="d-flex align-items-baseline mt-1 mb-1">
                        <ErrorBoundary errorMessage={lineRenderError}>
                            <ExecutionStopMessage
                                githubHost={githubHost}
                                stopUser={stopUser}
                                createTime={createTime}
                                conclusionTime={conclusionTime}
                                stopRequestTime={stopRequestTime}
                            />
                        </ErrorBoundary>
                    </div>
                )}

                {actions.length > 0 && (
                    <div className="mt-2 mb-1 btn-toolbar" role="toolbar" aria-label="Actions to take on the execution">
                        {actions.map((action) => {
                            const icon = getActionIcon(action);
                            const buttonStyle = getActionButtonStyle(action);
                            return (
                                <div key={action} className="btn-group mr-2">
                                    <button
                                        onClick={actionRequested ? null : () => onActionRequest(action)}
                                        className={`btn ${buttonStyle} btn-sm`}
                                        disabled={!!actionRequested}>
                                        {icon && <i className={`${icon} mr-1`}/>}
                                        <FormattedMessage {...messages.actionButton} values={{ action }}/>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {actionError && (
                    <div className="alert alert-danger mt-2 mb-0">
                        <div><strong>Failed to request action:</strong></div>
                        <div><code>{actionError.message}</code></div>
                    </div>
                )}
            </ErrorBoundary>
        </Panel>
    );
}

ExecutionSummaryPanel.propTypes = {
    githubHost: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    commit: PropTypes.string.isRequired,
    author: PropTypes.object.isRequired,
    commitMessage: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    createTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]).isRequired,
    executionEvent: PropTypes.object,
    conclusion: PropTypes.string,
    conclusionTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    actions: PropTypes.arrayOf(PropTypes.string).isRequired,
    actionRequested: PropTypes.string,
    actionError: PropTypes.object,
    stopUser: PropTypes.string,
    stopRequestTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),

    onActionRequest: PropTypes.func.isRequired,
};

ExecutionSummaryPanel.defaultProps = {
    actionRequested: null,
    actionError: null,
};

export default ExecutionSummaryPanel;
