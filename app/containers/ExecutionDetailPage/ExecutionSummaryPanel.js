/**
 * ExecutionSummaryPanel
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import ErrorBoundary from 'components/ErrorBoundary';
import ExecutionStatus, { getStatusColor } from 'components/ExecutionStatus';
import ExecutionStartMessage from 'components/ExecutionStartMessage';
import ExecutionStopMessage from 'components/ExecutionStopMessage';
import { Panel, PanelHeaderMini } from 'components/Panel';

const lineRenderError = <span><em>(Render Error)</em></span>;

function ExecutionSummaryPanel({
    githubHost,
    owner,
    repo,
    status,
    createTime,
    executionEvent,
    conclusion,
    conclusionTime,
    stopUser,
    stopRequestTime,
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

                <div className="d-flex align-items-baseline mt-1 mb-1">
                    <i className="fas fa-play-circle fa-fw text-muted mr-1 flex-shrink-0"/>
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
                        <i className="fas fa-stop-circle fa-fw text-muted mr-1 flex-shrink-0"/>
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

                <div className="mt-2 mb-1 btn-toolbar" role="toolbar" aria-label="Actions to take on the execution">
                    {!conclusion && !stopRequestTime && (
                        <div className="btn-group mr-2">
                            <button type="button" className="btn btn-outline-danger btn-sm"><i className="fas fa-stop-circle"/> Stop
                            </button>
                        </div>
                    )}
                    {!!conclusion && (
                        <div className="btn-group mr-2">
                            <button type="button" className="btn btn-outline-primary btn-sm"><i className="fas fa-redo-alt"/> Re-Run</button>
                        </div>
                    )}
                </div>
            </ErrorBoundary>
        </Panel>
    );
}

ExecutionSummaryPanel.propTypes = {
    githubHost: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
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
    stopUser: PropTypes.string,
    stopRequestTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
};

export default ExecutionSummaryPanel;
