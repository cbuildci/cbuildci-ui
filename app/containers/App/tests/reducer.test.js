import { fromJS } from 'immutable';

import appReducer from '../reducer';

import {
    stateRestore,
    stateRequest,
    stateSuccess,
    stateFailure,
} from '../actions';

describe('App container reducer', () => {
    let state;

    beforeEach(() => {
        state = fromJS({
            hasRestoredState: false,
            hasFetchedState: false,
            isFetchingState: false,
            stateError: null,
            githubUrl: null,
            githubHost: null,
            endpoints: null,
            userName: null,
            userLogin: null,
        });
    });

    it('should return the initial state', () => {
        expect(appReducer(undefined, {})).toEqual(state);
    });

    it('should handle the stateRestore action correctly', () => {
        const expectedResult = state
            .set('hasRestoredState', true)
            .set('githubUrl', 'gurl')
            .set('githubHost', 'ghost')
            .set('endpoints', { foo: 'bar' })
            .set('userName', 'uname')
            .set('userLogin', 'ulogin');

        expect(appReducer(state, stateRestore({
            githubUrl: 'gurl',
            githubHost: 'ghost',
            endpoints: { foo: 'bar' },
            userName: 'uname',
            userLogin: 'ulogin',
        }))).toEqual(expectedResult);
    });

    it('should handle the stateRequest action correctly', () => {
        const expectedResultA = state
            .set('isFetchingState', true);

        expect(appReducer(state, stateRequest())).toEqual(expectedResultA);

        const startingStateB = state
            .set('userName', 'foo')
            .set('userLogin', 'bar');

        const expectedResultB = state
            .set('isFetchingState', true)
            .set('userName', 'foo')
            .set('userLogin', 'bar');

        expect(appReducer(startingStateB, stateRequest())).toEqual(expectedResultB);
    });

    it('should handle the stateRequest action correctly if there was already an error', () => {
        const startingState = state
            .set('stateError', new Error());

        const expectedResult = state
            .set('isFetchingState', true);

        expect(appReducer(startingState, stateRequest())).toEqual(expectedResult);
    });

    it('should handle the stateRequest action correctly if resetUser is true', () => {
        const startingState = state
            .set('userName', 'foo')
            .set('userLogin', 'bar');

        const expectedResult = state
            .set('isFetchingState', true);

        expect(appReducer(startingState, stateRequest(true))).toEqual(expectedResult);
    });

    it('should handle the stateSuccess action correctly', () => {
        const startingState = state
            .set('isFetchingState', true);

        const expectedResult = state
            .set('hasFetchedState', true)
            .set('isFetchingState', false)
            .set('githubUrl', 'gurl')
            .set('githubHost', 'ghost')
            .set('endpoints', { foo: 'bar' })
            .set('userName', 'uname')
            .set('userLogin', 'ulogin');

        expect(appReducer(startingState, stateSuccess(
            'gurl',
            'ghost',
            'ulogin',
            'uname',
            { foo: 'bar' },
        ))).toEqual(expectedResult);
    });

    it('should handle the stateFailure action correctly', () => {
        const err = new Error('foobar');

        const startingState = state
            .set('isFetchingState', true);

        const expectedResult = state
            .set('isFetchingState', false)
            .set('stateError', err);

        expect(appReducer(startingState, stateFailure(
            err,
        ))).toEqual(expectedResult);
    });
});
