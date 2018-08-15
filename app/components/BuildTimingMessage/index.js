/*
 * BuildTimingMessage
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { getDateTime } from 'utils/date';
import TimeDuration from 'components/TimeDuration';
import Time from 'components/Time';
import messages from './messages';

function BuildTimingMessage({
    startTime,
    endTime,
    executionCreateTime,
    executionUpdateTime,
}) {
    executionCreateTime = getDateTime(executionCreateTime);
    executionUpdateTime = getDateTime(executionUpdateTime);

    startTime = getDateTime(startTime);
    endTime = getDateTime(endTime);

    return (
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
    );
}

BuildTimingMessage.propTypes = {
    startTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]).isRequired,
    endTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
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

export default BuildTimingMessage;
