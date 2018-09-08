/*
 * App reducer
 */

import { fromJS } from 'immutable';
import createInjector from 'utils/injectReducer';

import {
    STATE_RESTORE,
    STATE_REQUEST,
    STATE_SUCCESS,
    STATE_FAILURE,
} from './constants';

const userInitial = {
    userName: null,
    userLogin: null,
};

// The initial state of the App
const initialState = fromJS({
    hasRestoredState: false,
    hasFetchedState: false,
    isFetchingState: false,
    stateError: null,
    githubUrl: null,
    githubHost: null,
    endpoints: null,
    ...userInitial,
});

function appReducer(state = initialState, action) {
    switch (action.type) {
        case STATE_RESTORE:
            return state
                .set('hasRestoredState', true)
                .set('githubUrl', action.state.githubUrl)
                .set('githubHost', action.state.githubHost)
                .set('endpoints', action.state.endpoints)
                .set('userName', action.state.userName)
                .set('userLogin', action.state.userLogin);

        case STATE_REQUEST:
            state = state
                .set('isFetchingState', true)
                .set('stateError', null);

            return action.resetUser
                ? state.merge(userInitial)
                : state;

        case STATE_SUCCESS:
            return state
                .set('hasFetchedState', true)
                .set('isFetchingState', false)
                .set('stateError', null)
                .set('githubUrl', action.githubUrl)
                .set('githubHost', action.githubHost)
                .set('endpoints', action.endpoints)
                .set('userName', action.userName)
                .set('userLogin', action.userLogin);

        case STATE_FAILURE:
            return state
                .set('isFetchingState', false)
                .set('stateError', action.error);

        default:
            return state;
    }
}

export const injectReducer = createInjector(module);
export default appReducer;
