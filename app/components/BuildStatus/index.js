/**
 * BuildStatus
 */

import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

export const statusDisplay = {
    IN_PROGRESS: { icon: 'fas fa-hourglass-start', color: '#17a2b8' },
    WAITING_FOR_DEPENDENCY: { icon: 'far fa-clock', color: '#6c757d' },
    BUILD_NOTFOUND: { icon: 'fas fa-times', color: '#dc3545' },
    SUCCEEDED: { icon: 'fas fa-check', color: '#28a745' },
    DEPENDENCY_FAILED: { icon: 'fas fa-times', color: '#dc3545' },
    START_CODEBUILD_FAILED: { icon: 'fas fa-times', color: '#dc3545' },
    STARTING: { icon: 'fas fa-hourglass-start', color: '#17a2b8' },
    FAILED: { icon: 'fas fa-times', color: '#dc3545' },
    FAULT: { icon: 'fas fa-times', color: '#dc3545' },
    STOPPED: { icon: 'fas fa-stop-circle', color: '#dc3545' },
    TIMED_OUT: { icon: 'far fa-clock', color: '#dc3545' },
    SKIPPED: { icon: 'fas fa-share', color: '#6c757d' },
    '': { icon: 'fas fa-question-circle', color: '#333333' },
};

export function getStatusColor(status) {
    return (statusDisplay[status] || statusDisplay['']).color || null;
}

function BuildStatus({ status }) {
    const { color, icon } = statusDisplay[status] || statusDisplay[''];

    return (
        <span style={{ color: color }}>
            {icon && <i className={`${icon} fa-fw mr-1`}/>}
            {status ? <FormattedMessage
                {...messages.buildStatus}
                values={{ status: status }}
            /> : '-'}
        </span>
    );
}

BuildStatus.propTypes = {
    status: PropTypes.string,
};

BuildStatus.defaultProps = {
    status: null,
};

export default BuildStatus;
