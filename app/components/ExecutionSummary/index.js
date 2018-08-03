/**
 * ExecutionSummary
 */

import React from 'react';
import PropTypes from 'prop-types';
import ExecutionStatus from 'components/ExecutionStatus';
import IdentifierLine from './IdentifierLine';
import StartLine from './StartLine';
import StopLine from './StopLine';
import ErrorBoundary from 'components/ErrorBoundary';

const lineRenderError = <span><em>(Render Error)</em></span>;

function ExecutionSummary({
    githubHost,
    owner,
    repo,
    commit,
    executionNum,
    status,
    createTime,
    conclusion,
    conclusionTime,
    initiator,
    stopUser,
    stopRequestTime,
}) {
    return (
        <div className="execution-summary mt-3 mb-3">
            <div className="mt-1 mb-1 execution-status">
                <ErrorBoundary errorMessage={lineRenderError}>
                    <ExecutionStatus status={conclusion || status}/>
                </ErrorBoundary>
            </div>

            <div className="mt-1 mb-1">
                <ErrorBoundary errorMessage={lineRenderError}>
                    <IdentifierLine
                        githubHost={githubHost}
                        owner={owner}
                        repo={repo}
                        commit={commit}
                        executionNum={executionNum}
                    />
                </ErrorBoundary>
            </div>

            <div className="d-flex align-items-baseline mt-1 mb-1">
                <i className="fas fa-play-circle fa-fw text-muted mr-1 flex-shrink-0"/>
                <ErrorBoundary errorMessage={lineRenderError}>
                    <StartLine
                        createTime={createTime}
                        githubHost={githubHost}
                        owner={owner}
                        repo={repo}
                        event={initiator}
                    />
                </ErrorBoundary>
            </div>

            {(conclusionTime != null || stopRequestTime != null) && (
                <div className="d-flex align-items-baseline mt-1 mb-1">
                    <i className="fas fa-stop-circle fa-fw text-muted mr-1 flex-shrink-0"/>
                    <ErrorBoundary errorMessage={lineRenderError}>
                        <StopLine
                            githubHost={githubHost}
                            stopUser={stopUser}
                            createTime={createTime}
                            conclusionTime={conclusionTime}
                            stopRequestTime={stopRequestTime}
                        />
                    </ErrorBoundary>
                </div>
            )}
        </div>
    );
}

ExecutionSummary.propTypes = {
    githubHost: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    commit: PropTypes.string.isRequired,
    executionNum: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    createTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]).isRequired,
    conclusion: PropTypes.string,
    conclusionTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    initiator: PropTypes.object,
    stopUser: PropTypes.string,
    stopRequestTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
};

ExecutionSummary.defaultProps = {
    initiator: null,
    conclusion: null,
    conclusionTime: null,
    stopUser: null,
    stopRequestTime: null,
};

export default ExecutionSummary;
