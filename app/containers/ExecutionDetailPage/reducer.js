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
    ACTION_REQUEST,
    ACTION_SUCCESS,
    ACTION_FAILURE,
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

    actionRequested: null,
    actionError: null,

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

        case FETCH_EXECUTION_REQUEST:
            return state
                .set('isLoading', true)
                .set('loadError', null);

        case FETCH_EXECUTION_SUCCESS: {
            state = state
                .set('isLoading', false);

            const execution = state.get('execution');

            // Set the execution data if it is newer than what we have.
            if (!execution || execution.updates < action.execution.updates) {
                state = state.set('execution', action.execution);
            }

            return state;
        }

        case FETCH_EXECUTION_FAILURE:
            return state
                .set('isLoading', false)
                .set('loadError', action.error);

        case ACTION_REQUEST:
            return state
                .set('actionRequested', action.actionRequested)
                .set('actionError', null);

        case ACTION_SUCCESS:
            state = state
                .set('actionRequested', null)
                .set('actionError', null);

            if (action.execution) {
                const execution = state.get('execution');

                // Set the execution data if it is newer than what we have.
                if (execution && execution.updates < action.execution.updates) {
                    state = state.set('execution', action.execution);
                }
            }

            return state;

        case ACTION_FAILURE:
            return state
                .set('actionRequested', null)
                .set('actionError', action.error);

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
