import { fromJS } from 'immutable';

import * as selectors from '../selectors';

describe('exports', () => {
    it('should have the expected exports', () => {
        expect(Object.keys(selectors).sort())
            .toEqual([
                'selectApp',
                'selectRoute',
                'selectLoggingIn',
                'selectLoginUrl',
                'selectLoginError',
                'selectIsLoggedIn',
                'selectGithubHost',
                'selectLocation',
            ].sort());
    });
});

const {
    selectApp,
    selectRoute,
    selectLoggingIn,
    selectLoginUrl,
    selectLoginError,
    selectIsLoggedIn,
    selectGithubHost,
    selectLocation,
} = selectors;

describe('selectApp', () => {
    it('should select the app state', () => {
        const appState = fromJS({});
        const mockedState = fromJS({
            app: appState,
        });
        expect(selectApp(mockedState)).toEqual(appState);
    });
});

describe('selectLoggingIn', () => {
    it('should select if user is logging in', () => {
        const mockedStateA = fromJS({
            app: {
                loggingIn: true,
            },
        });
        expect(selectLoggingIn(mockedStateA)).toEqual(true);

        const mockedStateB = fromJS({
            app: {
                loggingIn: false,
            },
        });
        expect(selectLoggingIn(mockedStateB)).toEqual(false);
    });
});

describe('selectLoginUrl', () => {
    it('should select login URL', () => {
        const mockedState = fromJS({
            app: {
                loginUrl: 'http://foobar/',
            },
        });
        expect(selectLoginUrl(mockedState)).toEqual('http://foobar/');
    });
});

describe('selectLoginError', () => {
    it('should select login error', () => {
        const err = new Error();
        const mockedState = fromJS({
            app: {
                loginError: err,
            },
        });
        expect(selectLoginError(mockedState)).toEqual(err);
    });
});

describe('selectIsLoggedIn', () => {
    it('should select if user is logged in', () => {
        const mockedStateA = fromJS({
            app: {
                isLoggedIn: true,
            },
        });
        expect(selectIsLoggedIn(mockedStateA)).toEqual(true);

        const mockedStateB = fromJS({
            app: {
                isLoggedIn: false,
            },
        });
        expect(selectIsLoggedIn(mockedStateB)).toEqual(false);
    });
});

describe('selectGithubHost', () => {
    it('should select Github host', () => {
        const mockedState = fromJS({
            app: {
                githubHost: 'foobar.github.com',
            },
        });
        expect(selectGithubHost(mockedState)).toEqual('foobar.github.com');
    });
});

describe('selectRoute', () => {
    it('should select the route state', () => {
        const routeState = fromJS({});
        const mockedState = fromJS({
            route: routeState,
        });
        expect(selectRoute(mockedState)).toEqual(routeState);
    });
});

describe('selectLocation', () => {
    it('should select route location', () => {
        const mockedState = fromJS({
            route: {
                location: {
                    path: '/foo/bar',
                },
            },
        });

        expect(selectLocation(mockedState)).toEqual({
            path: '/foo/bar',
        });
    });
});
