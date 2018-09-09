import { fromJS } from 'immutable';

import * as selectors from '../selectors';

describe('App container selectors', () => {
    it('should have the expected exports', () => {
        expect(Object.keys(selectors).sort())
            .toEqual([
                'selectApp',
                'selectHasRestoredState',
                'selectHasFetchedState',
                'selectIsFetchingState',
                'selectStateError',
                'selectGithubUrl',
                'selectGithubHost',
                'selectUserName',
                'selectUserLogin',
                'selectEndpoints',
                'selectIsUserLoggedIn',
                'selectIsLoginRequired',
                'selectRestoreState',
                'selectRoute',
                'selectLocation',
            ].sort());
    });
});

const {
    selectApp,
    selectHasRestoredState,
    selectHasFetchedState,
    selectIsFetchingState,
    selectStateError,
    selectGithubUrl,
    selectGithubHost,
    selectUserName,
    selectUserLogin,
    selectEndpoints,
    selectIsUserLoggedIn,
    selectIsLoginRequired,
    selectRestoreState,
    selectRoute,
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

describe('selectHasRestoredState', () => {
    it('should select if state has been restored from the sessionStore', () => {
        const mockedStateA = fromJS({
            app: {
                hasRestoredState: true,
            },
        });
        expect(selectHasRestoredState(mockedStateA)).toEqual(true);

        const mockedStateB = fromJS({
            app: {
                hasRestoredState: false,
            },
        });
        expect(selectHasRestoredState(mockedStateB)).toEqual(false);
    });
});

describe('selectHasFetchedState', () => {
    it('should select if state has been fetched successfully', () => {
        const mockedStateA = fromJS({
            app: {
                hasFetchedState: true,
            },
        });
        expect(selectHasFetchedState(mockedStateA)).toEqual(true);

        const mockedStateB = fromJS({
            app: {
                hasFetchedState: false,
            },
        });
        expect(selectHasFetchedState(mockedStateB)).toEqual(false);
    });
});

describe('selectIsFetchingState', () => {
    it('should select if state has been fetched successfully', () => {
        const mockedStateA = fromJS({
            app: {
                isFetchingState: true,
            },
        });
        expect(selectIsFetchingState(mockedStateA)).toEqual(true);
    });
});

describe('selectStateError', () => {
    it('should select state fetch error', () => {
        const err = new Error();
        const mockedState = fromJS({
            app: {
                stateError: err,
            },
        });
        expect(selectStateError(mockedState)).toEqual(err);
    });
});

describe('selectGithubUrl', () => {
    it('should select Github URL', () => {
        const mockedState = fromJS({
            app: {
                githubUrl: 'http://foobar.github.com',
            },
        });
        expect(selectGithubUrl(mockedState)).toEqual('http://foobar.github.com');
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

describe('selectUserName', () => {
    it('should select user name', () => {
        const mockedStateA = fromJS({
            app: {
                userName: null,
            },
        });
        expect(selectUserName(mockedStateA)).toEqual(null);

        const mockedStateB = fromJS({
            app: {
                userName: 'foobar',
            },
        });
        expect(selectUserName(mockedStateB)).toEqual('foobar');
    });
});

describe('selectUserLogin', () => {
    it('should select user login', () => {
        const mockedStateA = fromJS({
            app: {
                userLogin: null,
            },
        });
        expect(selectUserLogin(mockedStateA)).toEqual(null);

        const mockedStateB = fromJS({
            app: {
                userLogin: 'foobar',
            },
        });
        expect(selectUserLogin(mockedStateB)).toEqual('foobar');
    });
});

describe('selectEndpoints', () => {
    it('should select endpoints', () => {
        const mockedStateA = fromJS({
            app: {},
        });
        expect(selectEndpoints(mockedStateA)).toEqual({});

        const mockedStateB = fromJS({
            app: {},
        })
            .setIn(['app', 'endpoints'], { foo: true });
        expect(selectEndpoints(mockedStateB)).toEqual({ foo: true });
    });
});

describe('selectIsUserLoggedIn', () => {
    it('should select if user is logged in', () => {
        const mockedStateA = fromJS({
            app: {
                userLogin: null,
            },
        });
        expect(selectIsUserLoggedIn(mockedStateA)).toEqual(false);

        const mockedStateB = fromJS({
            app: {
                userLogin: 'foobar',
            },
        });
        expect(selectIsUserLoggedIn(mockedStateB)).toEqual(true);
    });
});

describe('selectIsLoginRequired', () => {
    it('should select if user is logged in', () => {
        const mockedStateA = fromJS({
            app: {
                hasFetchedState: false,
                userLogin: null,
            },
        });
        expect(selectIsLoginRequired(mockedStateA)).toEqual(false);

        const mockedStateB = fromJS({
            app: {
                hasFetchedState: false,
                userLogin: 'foobar',
            },
        });
        expect(selectIsLoginRequired(mockedStateB)).toEqual(false);

        const mockedStateC = fromJS({
            app: {
                hasFetchedState: true,
                userLogin: null,
            },
        });
        expect(selectIsLoginRequired(mockedStateC)).toEqual(true);

        const mockedStateD = fromJS({
            app: {
                hasFetchedState: true,
                userLogin: 'foobar',
            },
        });
        expect(selectIsLoginRequired(mockedStateD)).toEqual(false);
    });
});

describe('selectRestoreState', () => {
    it('should select state to be saved to sessionStorage', () => {
        const mockedStateA = fromJS({
            app: {
                githubUrl: 'gurl',
                githubHost: 'ghost',
                userName: 'uname',
                userLogin: 'ulogin',
            },
        })
            .setIn(['app', 'endpoints'], { foo: 'bar' });

        expect(selectRestoreState(mockedStateA)).toEqual({
            githubUrl: 'gurl',
            githubHost: 'ghost',
            endpoints: { foo: 'bar' },
            userName: 'uname',
            userLogin: 'ulogin',
        });
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
