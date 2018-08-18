/*
 * ExecutionDetailPage actions
 */

import {
    EXECUTION_OPENED,
    EXECUTION_CLOSED,
    BUILD_OPENED,
    BUILD_CLOSED,
    FETCH_EXECUTION_FAILURE,
    FETCH_EXECUTION_REQUEST,
    FETCH_EXECUTION_SUCCESS,
    FETCH_BUILD_LOGS_FAILURE,
    FETCH_BUILD_LOGS_REQUEST,
    FETCH_BUILD_LOGS_SUCCESS,
} from './constants';

export function executionOpened(
    owner,
    repo,
    commit,
    executionNum,
) {
    return {
        type: EXECUTION_OPENED,
        owner,
        repo,
        commit,
        executionNum,
    };
}

export function executionClosed() {
    return {
        type: EXECUTION_CLOSED,
    };
}

export function buildOpened(
    buildKey,
) {
    return {
        type: BUILD_OPENED,
        buildKey,
    };
}

export function buildClosed() {
    return {
        type: BUILD_CLOSED,
    };
}

export function fetchExecution(
    accessKey = null,
) {
    return {
        type: FETCH_EXECUTION_REQUEST,
        accessKey,
    };
}

export function fetchExecutionSuccess(
    execution,
) {
    return {
        type: FETCH_EXECUTION_SUCCESS,
        execution,
    };
}

export function fetchExecutionFailure(
    error,
) {
    return {
        type: FETCH_EXECUTION_FAILURE,
        error,
    };
}

export function fetchBuildLogs(
    accessKey = null,
) {
    return {
        type: FETCH_BUILD_LOGS_REQUEST,
        accessKey,
    };
}

export function fetchBuildLogsSuccess(
    events,
) {
    return {
        type: FETCH_BUILD_LOGS_SUCCESS,
        events,
    };
}

export function fetchBuildLogsFailure(
    error,
) {
    return {
        type: FETCH_BUILD_LOGS_FAILURE,
        error,
    };
}
