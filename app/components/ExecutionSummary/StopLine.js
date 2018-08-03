/**
 * StopLine
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import TimeDuration from 'components/TimeDuration';
import Time from 'components/Time';
import { getDateTime } from '../../utils/date';

function StopLine({
    githubHost,
    stopUser,
    createTime,
    conclusionTime,
    stopRequestTime,
}) {
    const values = {
        hasConcluded: 'no',
        hasStop: 'no',
    };

    createTime = Math.round(getDateTime(createTime) / 1000);

    if (stopRequestTime != null) {
        stopRequestTime = Math.round(getDateTime(stopRequestTime) / 1000);
        values.hasStop = 'yes';

        values.stopDurationHtml = (
            <strong>
                <Time date={stopRequestTime}>
                    <TimeDuration seconds={stopRequestTime - createTime}/>
                </Time>
            </strong>
        );

        values.stopUserHtml = (
            <a href={`https://${githubHost}/${stopUser}`}>
                @{stopUser}
            </a>
        );
    }

    if (conclusionTime != null) {
        conclusionTime = Math.round(getDateTime(conclusionTime) / 1000);
        values.hasConcluded = 'yes';

        values.conclusionDurationHtml = (
            <strong>
                <Time date={conclusionTime}>
                    <TimeDuration seconds={conclusionTime - (stopRequestTime || createTime)}/>
                </Time>
            </strong>
        );
    }

    return (
        <FormattedMessage
            {...messages.conclusionMessage}
            values={values}
        />
    );
}

StopLine.propTypes = {
    githubHost: PropTypes.string.isRequired,
    stopUser: PropTypes.string,
    createTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]).isRequired,
    conclusionTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    stopRequestTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
};

StopLine.defaultProps = {
    stopUser: null,
    conclusionTime: null,
    stopRequestTime: null,
};

export default StopLine;
