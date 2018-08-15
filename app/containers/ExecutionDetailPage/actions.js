/*
 * ExecutionDetailPage actions
 */

import {
    CONTAINER_CLOSED,
    FETCH_EXECUTION_FAILURE,
    FETCH_EXECUTION_REQUEST,
    FETCH_EXECUTION_SUCCESS,
} from './constants';

export function containerClosed() {
    return {
        type: CONTAINER_CLOSED,
    };
}

export function fetchExecution(owner, repo, commit, executionNum, accessKey = null) {
    return {
        type: FETCH_EXECUTION_REQUEST,
        owner,
        repo,
        commit,
        executionNum,
        accessKey,
    };
}

export function fetchExecutionSuccess(owner, repo, commit, executionNum, execution) {
    return {
        type: FETCH_EXECUTION_SUCCESS,
        owner,
        repo,
        commit,
        executionNum,
        execution,
    };
}

export function fetchExecutionFailure(owner, repo, commit, executionNum, error) {
    return {
        type: FETCH_EXECUTION_FAILURE,
        owner,
        repo,
        commit,
        executionNum,
        error,
    };
}
