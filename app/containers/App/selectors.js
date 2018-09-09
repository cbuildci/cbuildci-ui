/**
 * The app state selectors
 */

import {
    createSelector,
    createStructuredSelector,
} from 'reselect';

export const selectApp = (state) => state.get('app');

export const selectHasRestoredState = createSelector(
    selectApp,
    (appState) => appState.get('hasRestoredState'),
);

export const selectHasFetchedState = createSelector(
    selectApp,
    (appState) => appState.get('hasFetchedState'),
);

export const selectIsFetchingState = createSelector(
    selectApp,
    (appState) => appState.get('isFetchingState'),
);

export const selectStateError = createSelector(
    selectApp,
    (appState) => appState.get('stateError'),
);

export const selectGithubUrl = createSelector(
    selectApp,
    (appState) => appState.get('githubUrl')
);

export const selectGithubHost = createSelector(
    selectApp,
    (appState) => appState.get('githubHost')
);

export const selectUserName = createSelector(
    selectApp,
    (appState) => appState.get('userName'),
);

export const selectUserLogin = createSelector(
    selectApp,
    (appState) => appState.get('userLogin'),
);

export const selectEndpoints = createSelector(
    selectApp,
    (appState) => appState.get('endpoints') || {},
);

export const selectIsUserLoggedIn = createSelector(
    selectUserLogin,
    (userLogin) => userLogin != null,
);

export const selectIsLoginRequired = createSelector(
    selectHasFetchedState,
    selectUserLogin,
    (hasFetchedState, userLogin) => hasFetchedState && userLogin == null,
);

export const selectRestoreState = createStructuredSelector({
    githubUrl: selectGithubUrl,
    githubHost: selectGithubHost,
    endpoints: selectEndpoints,
    userName: selectUserName,
    userLogin: selectUserLogin,
});

export const selectRoute = (state) => state.get('route');

export const selectLocation = createSelector(
    selectRoute,
    (routeState) => routeState.get('location').toJS()
);
