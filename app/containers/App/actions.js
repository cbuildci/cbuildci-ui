/*
 * App Actions
 */

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from './constants';

export function loginRequest(loginUrl) {
    return {
        type: LOGIN_REQUEST,
        loginUrl,
    };
}

export function fetchExecutionSuccess() {
    return {
        type: LOGIN_SUCCESS,
    };
}

export function fetchExecutionFailure(error) {
    return {
        type: LOGIN_FAILURE,
        error,
    };
}
