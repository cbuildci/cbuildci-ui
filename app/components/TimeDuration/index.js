/**
 * TimeDuration
 */

import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function TimeDuration({
    seconds,
}) {
    let unit = 'seconds';
    let value = seconds;

    if (value >= 31536000) {
        unit = 'years';
        value = Math.round(value / 3153600) / 10;
    }
    else if (value >= 3942000) {
        unit = 'months';
        value = Math.round(value / 394200) / 10;
    }
    else if (value >= 604800) {
        unit = 'weeks';
        value = Math.round(value / 60480) / 10;
    }
    else if (value >= 86400) {
        unit = 'days';
        value = Math.round(value / 8640) / 10;
    }
    else if (value >= 3600) {
        unit = 'hours';
        value = Math.round(value / 360) / 10;
    }
    else if (value >= 60) {
        unit = 'minutes';
        value = Math.round(value / 6) / 10;
    }

    return (
        <FormattedMessage
            {...messages.duration}
            values={{ value, unit }}
        />
    );
}

TimeDuration.propTypes = {
    seconds: PropTypes.number.isRequired,
};

export default TimeDuration;
