/*
 * CommitExecutionsPage reducer
 */

import { fromJS } from 'immutable';
import createInjector from 'utils/injectReducer';

import {
    PAGE_OPENED,
    PAGE_CLOSED,
    FETCH_EXECUTIONS_REQUEST,
    FETCH_EXECUTIONS_SUCCESS,
    FETCH_EXECUTIONS_FAILURE,
} from './constants';

export const initialState = fromJS({
    owner: null,
    repo: null,
    commit: null,

    isLoading: false,
    loadError: null,
    executions: null,
    lastEvaluatedKey: null,
});

function commitExecutionsPageReducer(state = initialState, action) {
    switch (action.type) {
        case PAGE_CLOSED:
            return initialState;

        case PAGE_OPENED:
            return initialState
                .set('owner', action.owner)
                .set('repo', action.repo)
                .set('commit', action.commit);

        case FETCH_EXECUTIONS_REQUEST: {
            return state
                .set('isLoading', true)
                .set('loadError', null);
        }

        case FETCH_EXECUTIONS_SUCCESS:
            return state
                .set('isLoading', false)
                .set('executions', action.executions)
                .set('lastEvaluatedKey', action.lastEvaluatedKey || null);

        case FETCH_EXECUTIONS_FAILURE:
            return state
                .set('isLoading', false)
                .set('loadError', action.error);

        default:
            return state;
    }
}

export const injectReducer = createInjector(module);
export default commitExecutionsPageReducer;
