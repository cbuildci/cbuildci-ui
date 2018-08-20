/*
 *
 * ExecutionDetailPage reducer
 *
 */

import { fromJS } from 'immutable';
import createInjector from 'utils/injectReducer';

import {
    EXECUTION_OPENED,
    EXECUTION_CLOSED,
    BUILD_OPENED,
    BUILD_CLOSED,
    FETCH_EXECUTION_REQUEST,
    FETCH_EXECUTION_SUCCESS,
    FETCH_EXECUTION_FAILURE,
    FETCH_BUILD_LOGS_REQUEST,
    FETCH_BUILD_LOGS_SUCCESS,
    FETCH_BUILD_LOGS_FAILURE,
} from './constants';

const initialBuild = {
    buildKey: null,

    isLoadingLogs: false,
    loadLogsError: null,
    executionLogs: null,
};

const initial = {
    owner: null,
    repo: null,
    commit: null,
    executionNum: null,

    isLoading: false,
    loadError: null,
    execution: null,

    ...initialBuild,
};

export const initialState = fromJS(initial);

function executionDetailPageReducer(state = initialState, action) {
    switch (action.type) {
        case EXECUTION_CLOSED:
            return initialState;

        case EXECUTION_OPENED:
            return initialState
                .set('owner', action.owner)
                .set('repo', action.repo)
                .set('commit', action.commit)
                .set('executionNum', action.executionNum);

        case FETCH_EXECUTION_REQUEST: {
            return state
                .set('isLoading', true)
                .set('loadError', null);
        }

        case FETCH_EXECUTION_SUCCESS:
            return state
                .set('isLoading', false)
                .set('execution', action.execution);

        case FETCH_EXECUTION_FAILURE:
            return state
                .set('isLoading', false)
                .set('loadError', action.error);

        case BUILD_CLOSED:
            return state
                .merge(initialBuild);

        case BUILD_OPENED:
            return state
                .merge(initialBuild)
                .set('buildKey', action.buildKey);

        case FETCH_BUILD_LOGS_REQUEST:
            return state
                .set('isLoadingLogs', true)
                .set('loadLogsError', null);

        case FETCH_BUILD_LOGS_SUCCESS:
            return state
                .set('isLoadingLogs', false)
                .set('executionLogs', action.events);

        case FETCH_BUILD_LOGS_FAILURE:
            return state
                .set('isLoadingLogs', false)
                .set('loadLogsError', action.error);

        default:
            return state;
    }
}

export const injectReducer = createInjector(module);
export default executionDetailPageReducer;
