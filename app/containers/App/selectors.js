/**
 * The app state selectors
 */

import { createSelector } from 'reselect';

const selectApp = (state) => state.get('app');
const selectRoute = (state) => state.get('route');

const selectLoggingIn = createSelector(
    selectApp,
    (appState) => appState.get('loggingIn'),
);

const selectLoginUrl = createSelector(
    selectApp,
    (appState) => appState.get('loginUrl'),
);

const selectLoginError = createSelector(
    selectApp,
    (appState) => appState.get('loginError'),
);

const selectIsLoggedIn = createSelector(
    selectApp,
    (appState) => appState.get('isLoggedIn'),
);

const selectGithubHost = createSelector(
    selectApp,
    (routeState) => routeState.get('githubHost')
);

const selectLocation = createSelector(
    selectRoute,
    (routeState) => routeState.get('location').toJS()
);

export {
    selectApp,
    selectLoggingIn,
    selectLoginUrl,
    selectLoginError,
    selectIsLoggedIn,
    selectGithubHost,
    selectLocation,
};
