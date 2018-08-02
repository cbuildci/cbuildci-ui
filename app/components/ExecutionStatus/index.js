/**
 * ExecutionStatus
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export const statusDisplay = {
    SUCCEEDED: { icon: 'fas fa-check', color: '#28a745' },
    QUEUED: { icon: 'far fa-clock', color: '#6c757d' },
    IN_PROGRESS: { icon: 'fas fa-hourglass-start', color: '#17a2b8' },
    ERROR: { icon: 'fas fa-exclamation-triangle', color: '#dc3545' },
    FAILED: { icon: 'fas fa-times', color: '#dc3545' },
    TIMED_OUT: { icon: 'fas fa-stopwatch', color: '#dc3545' },
    STOPPED: { icon: 'fas fa-stop-circle', color: '#dc3545' },
    NEUTRAL: { icon: 'fas fa-share', color: '#6c757d' },
    '': { icon: 'fas fa-question-circle', color: '#333333' },
};

export function getStatusColor(status) {
    return (statusDisplay[status] || statusDisplay['']).color || null;
}

function ExecutionStatus({ status }) {
    const { icon, color } = statusDisplay[status] || statusDisplay[''];

    return (
        <span style={{ color }}>
            {icon && <i className={`${icon} fa-fw mr-1`}/>}
            {status ? <FormattedMessage
                {...messages.executionStatus}
                values={{ status: status }}
            /> : '-'}
        </span>
    );
}

ExecutionStatus.propTypes = {
    status: PropTypes.string,
};

ExecutionStatus.defaultProps = {
    status: null,
};

export default ExecutionStatus;
