/**
 * BuildSummary
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { getDateTime } from 'utils/date';
import ErrorBoundary from 'components/ErrorBoundary';
import BuildStatus from 'components/BuildStatus';
import TimeDuration from 'components/TimeDuration';
import Time from 'components/Time';
import messages from './messages';

function BuildSummary({
    buildState,
    executionCreateTime,
    executionUpdateTime,
}) {
    executionCreateTime = getDateTime(executionCreateTime);
    executionUpdateTime = getDateTime(executionUpdateTime);

    const codeBuild = buildState.codeBuild;
    const startTime = codeBuild && getDateTime(codeBuild.startTime);
    const endTime = codeBuild && getDateTime(codeBuild.endTime);

    return (
        <React.Fragment>
            <div className="mb-1 build-status text-info">
                <ErrorBoundary errorMessage={() => <span>Error</span>}>
                    <BuildStatus status={buildState.status}/>
                </ErrorBoundary>
            </div>
            {codeBuild && (
                <div className="mb-1">
                    <ErrorBoundary errorMessage={() => <span>Error</span>}>
                        {/* <i className="far fa-clock fa-fw text-muted mr-1"/> */}
                        <FormattedMessage
                            {...messages.timingMessage}
                            values={{
                                startDurationHtml: (
                                    <strong>
                                        <Time date={startTime}>
                                            <TimeDuration seconds={Math.round((startTime - executionCreateTime) / 1000)}/>
                                        </Time>
                                    </strong>
                                ),
                                hasEnded: endTime != null ? 'yes' : 'no',
                                endDurationHtml: (
                                    <strong>
                                        <Time date={endTime || executionUpdateTime}>
                                            <TimeDuration seconds={Math.round(((endTime || executionUpdateTime) - startTime) / 1000)}/>
                                        </Time>
                                    </strong>
                                ),
                            }}
                        />
                    </ErrorBoundary>
                </div>
            )}
        </React.Fragment>
    );
}

BuildSummary.propTypes = {
    buildState: PropTypes.object.isRequired,
    executionCreateTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]).isRequired,
    executionUpdateTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]).isRequired,
};

export default BuildSummary;
