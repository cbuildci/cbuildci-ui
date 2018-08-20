/*
 * CommitExecutionsPage actions
 */

import {
    PAGE_OPENED,
    PAGE_CLOSED,
    FETCH_EXECUTIONS_REQUEST,
    FETCH_EXECUTIONS_SUCCESS,
    FETCH_EXECUTIONS_FAILURE,
} from './constants';

export function pageOpened(
    owner,
    repo,
    commit,
) {
    return {
        type: PAGE_OPENED,
        owner,
        repo,
        commit,
    };
}

export function pageClosed() {
    return {
        type: PAGE_CLOSED,
    };
}

export function fetchExecutions() {
    return {
        type: FETCH_EXECUTIONS_REQUEST,
    };
}

export function fetchExecutionsSuccess(
    executions,
    lastEvaluatedKey,
) {
    return {
        type: FETCH_EXECUTIONS_SUCCESS,
        executions,
        lastEvaluatedKey,
    };
}

export function fetchExecutionsFailure(
    error,
) {
    return {
        type: FETCH_EXECUTIONS_FAILURE,
        error,
    };
}
