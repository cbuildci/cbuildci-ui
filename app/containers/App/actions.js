/*
 * App Actions
 */

import {
    STATE_RESTORE,
    STATE_REQUEST,
    STATE_SUCCESS,
    STATE_FAILURE,
} from './constants';

export function stateRestore(state) {
    return {
        type: STATE_RESTORE,
        state,
    };
}

export function stateRequest(resetUser = false) {
    return {
        type: STATE_REQUEST,
        resetUser,
    };
}

export function stateSuccess(
    githubUrl,
    githubHost,
    userLogin,
    userName,
    endpoints,
) {
    return {
        type: STATE_SUCCESS,
        githubUrl,
        githubHost,
        userLogin,
        userName,
        endpoints,
    };
}

export function stateFailure(error) {
    return {
        type: STATE_FAILURE,
        error,
    };
}
