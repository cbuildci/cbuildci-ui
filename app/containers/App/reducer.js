import { fromJS } from 'immutable';

import {
    LOGIN_REQUEST,
} from './constants';

// The initial state of the App
const initialState = fromJS({
    loggingIn: false,
    loginUrl: null,
    loginError: null,
    isLoggedIn: false,
    userData: null,
    githubHost: 'github.com',
});

function appReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return state
                .set('loggingIn', true)
                .set('loginUrl', action.loginUrl)
                .set('loginError', null)
                .set('isLoggedIn', null)
                .set('userData', null);
        default:
            return state;
    }
}

export default appReducer;
