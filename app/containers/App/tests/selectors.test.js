import { fromJS } from 'immutable';

import {
    selectApp,
    makeSelectCurrentUser,
    makeSelectLoading,
    makeSelectError,
    makeSelectRepos,
    makeSelectLocation,
} from '../selectors';

describe('selectApp', () => {
    it('should select the app state', () => {
        const appState = fromJS({});
        const mockedState = fromJS({
            app: appState,
        });
        expect(selectApp(mockedState)).toEqual(appState);
    });
});

describe('makeSelectCurrentUser', () => {
    const currentUserSelector = makeSelectCurrentUser();
    it('should select the current user', () => {
        const username = 'mxstbr';
        const mockedState = fromJS({
            app: {
                currentUser: username,
            },
        });
        expect(currentUserSelector(mockedState)).toEqual(username);
    });
});

describe('makeSelectLoading', () => {
    const loadingSelector = makeSelectLoading();
    it('should select the loading', () => {
        const loading = false;
        const mockedState = fromJS({
            app: {
                loading,
            },
        });
        expect(loadingSelector(mockedState)).toEqual(loading);
    });
});

describe('makeSelectError', () => {
    const errorSelector = makeSelectError();
    it('should select the error', () => {
        const error = 404;
        const mockedState = fromJS({
            app: {
                error,
            },
        });
        expect(errorSelector(mockedState)).toEqual(error);
    });
});

describe('makeSelectRepos', () => {
    const reposSelector = makeSelectRepos();
    it('should select the repos', () => {
        const repositories = fromJS([]);
        const mockedState = fromJS({
            app: {
                userData: {
                    repositories,
                },
            },
        });
        expect(reposSelector(mockedState)).toEqual(repositories);
    });
});

describe('makeSelectLocation', () => {
    const locationStateSelector = makeSelectLocation();
    it('should select the location', () => {
        const route = fromJS({
            location: { pathname: '/foo' },
        });
        const mockedState = fromJS({
            route,
        });
        expect(locationStateSelector(mockedState)).toEqual(
            route.get('location').toJS(),
        );
    });
});
