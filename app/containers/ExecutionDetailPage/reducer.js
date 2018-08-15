/*
 *
 * ExecutionDetailPage reducer
 *
 */

import { fromJS } from 'immutable';
import createInjector from 'utils/injectReducer';

import {
    CONTAINER_CLOSED,
    FETCH_EXECUTION_REQUEST,
    FETCH_EXECUTION_SUCCESS,
    FETCH_EXECUTION_FAILURE,
} from './constants';

export const initialState = fromJS({
    isLoading: false,
    loadError: null,
    execution: null,
});

function executionDetailReducer(state = initialState, action) {
    switch (action.type) {
        case CONTAINER_CLOSED:
            return initialState;

        case FETCH_EXECUTION_REQUEST: {
            const execution = state.get('execution');
            const newState = state
                .set('isLoading', true)
                .set('loadError', null);

            const isRefresh = execution
                && execution.owner === action.owner
                && execution.repo === action.repo
                && execution.commit === action.commit
                && execution.executionNum === action.executionNum;

            return isRefresh
                ? newState
                : newState.set('execution', null);
        }

        case FETCH_EXECUTION_SUCCESS:
            return state
                .set('isLoading', false)
                .set('loadError', null)
                .set('execution', action.execution);

        case FETCH_EXECUTION_FAILURE:
            return state
                .set('isLoading', false)
                .set('loadError', action.error)
                .set('execution', null);

        default:
            return state;
    }
}

export const injectReducer = createInjector(module);
export default executionDetailReducer;
