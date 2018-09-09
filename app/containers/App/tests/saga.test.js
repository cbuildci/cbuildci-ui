import { call, put, select, take, race } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import * as saga from '../saga';

import {
    selectHasRestoredState, selectIsFetchingState, selectIsLoginRequired, selectIsUserLoggedIn, selectRestoreState, selectStateError,
} from '../selectors';

import { stateFailure, stateRequest, stateRestore, stateSuccess } from '../actions';
import { requestJson } from '../../../utils/request';
import { STATE_RESTORE, STATE_SUCCESS } from '../constants';

describe('App container saga', () => {
    describe('*init()', () => {
        it('should abort if has already restored state', () => {
            const gen = saga.init();

            // Checks if the state has been restored.
            expect(gen.next().value)
                .toEqual(select(selectHasRestoredState));

            // Done if already restored.
            expect(gen.next(true).done)
                .toEqual(true);
        });

        it('should restore state from sessionStorage', () => {
            const gen = saga.init();

            // Checks if the state has been restored.
            expect(gen.next().value)
                .toEqual(select(selectHasRestoredState));

            // Attempts to get state stored in sessionStorage.
            expect(gen.next(false).value)
                .toEqual(call(saga.getStoredSessionState));

            // Puts stateRestore action with retrieved state.
            const storedJSON = { foo: 'bar' };
            expect(gen.next(storedJSON).value)
                .toEqual(put(stateRestore(storedJSON)));

            // Puts stateRequest action.
            expect(gen.next().value)
                .toEqual(put(stateRequest()));

            expect(gen.next(true).done)
                .toEqual(true);
        });
    });

    describe('*fetchState()', () => {
        it('should request API JSON and put stateSuccess action', () => {
            const gen = cloneableGenerator(saga.fetchState)();

            // Call requestJson
            expect(gen.next().value)
                .toEqual(call(
                    requestJson,
                    '/api/v1',
                ));

            {
                const genNoUser = gen.clone();

                // Put STATE_SUCCESS action.
                expect(genNoUser.next({
                    app: {
                        githubUrl: 'gurl',
                        githubHost: 'ghost',
                    },
                    endpoints: {
                        foo: 'bar',
                    },
                    user: null,
                }).value)
                    .toEqual(put(stateSuccess(
                        'gurl',
                        'ghost',
                        null,
                        null,
                        {
                            foo: 'bar',
                        },
                    )));

                expect(genNoUser.next(true).done)
                    .toEqual(true);
            }

            {
                const genHasUser = gen.clone();

                // Put STATE_SUCCESS action.
                expect(genHasUser.next({
                    app: {
                        githubUrl: 'gurl',
                        githubHost: 'ghost',
                    },
                    endpoints: {
                        foo: 'bar',
                    },
                    user: {
                        login: 'ulogin',
                        name: 'uname',
                    },
                }).value)
                    .toEqual(put(stateSuccess(
                        'gurl',
                        'ghost',
                        'ulogin',
                        'uname',
                        {
                            foo: 'bar',
                        },
                    )));

                expect(genHasUser.next(true).done)
                    .toEqual(true);
            }
        });

        it('should request API JSON and put stateFailure action', () => {
            const gen = cloneableGenerator(saga.fetchState)();

            // Call requestJson
            expect(gen.next().value)
                .toEqual(call(
                    requestJson,
                    '/api/v1',
                ));

            {
                const genJsonResponse = gen.clone();

                const err = new Error('Foo');
                err.isJson = true;
                err.body = {
                    message: 'foobar',
                };

                // Put STATE_FAILURE action.
                expect(genJsonResponse.throw(err).value)
                    .toEqual(put(stateFailure({
                        message: 'foobar',
                    })));

                expect(genJsonResponse.next(true).done)
                    .toEqual(true);
            }

            {
                const genNonJsonResponse = gen.clone();

                const err = new Error('Foo');

                // Put STATE_FAILURE action.
                expect(genNonJsonResponse.throw(err).value)
                    .toEqual(put(stateFailure({
                        message: 'Foo',
                    })));

                expect(genNonJsonResponse.next(true).done)
                    .toEqual(true);
            }
        });
    });

    describe('*saveStateToSession()', () => {
        it('should save the state to sessionStorage', () => {
            const gen = saga.saveStateToSession();

            // Select state to store.
            expect(gen.next().value)
                .toEqual(select(selectRestoreState));

            const state = {
                foo: 'bar',
            };

            // Call helper to save state.
            expect(gen.next(state).value)
                .toEqual(call(
                    saga.setStoredSessionState,
                    state,
                ));

            expect(gen.next(true).done)
                .toEqual(true);
        });
    });

    describe('*checkForLoginSuccess()', () => {
        it('should abort if already fetching state', () => {
            const gen = saga.checkForLoginSuccess();

            // Select if is fetching state already.
            expect(gen.next().value)
                .toEqual(select(selectIsFetchingState));

            expect(gen.next(true).done)
                .toEqual(true);
        });

        it('should abort if login is not required', () => {
            const gen = saga.checkForLoginSuccess();

            // Select if is fetching state already.
            expect(gen.next().value)
                .toEqual(select(selectIsFetchingState));

            // Select if login is required.
            expect(gen.next(false).value)
                .toEqual(select(selectIsLoginRequired));

            expect(gen.next(false).done)
                .toEqual(true);
        });

        it('should put stateRequest action', () => {
            const gen = saga.checkForLoginSuccess();

            // Select if is fetching state already.
            expect(gen.next().value)
                .toEqual(select(selectIsFetchingState));

            // Select if login is required.
            expect(gen.next(false).value)
                .toEqual(select(selectIsLoginRequired));

            expect(gen.next(true).value)
                .toEqual(put(stateRequest()));

            expect(gen.next().done)
                .toEqual(true);
        });
    });

    describe('*requestStateIfNeeded()', () => {
        it('should not request if user is logged in', () => {
            const gen = saga.requestStateIfNeeded();

            expect(gen.next().value)
                .toEqual(select(selectIsUserLoggedIn));

            expect(gen.next(true).done)
                .toEqual(true);
        });

        it('should not request if already fetching state', () => {
            const gen = saga.requestStateIfNeeded();

            expect(gen.next().value)
                .toEqual(select(selectIsUserLoggedIn));

            expect(gen.next(false).value)
                .toEqual(select(selectIsFetchingState));

            expect(gen.next(true).done)
                .toEqual(true);
        });

        it('should not request if already showing login modal', () => {
            const gen = saga.requestStateIfNeeded();

            expect(gen.next().value)
                .toEqual(select(selectIsUserLoggedIn));

            expect(gen.next(false).value)
                .toEqual(select(selectIsFetchingState));

            expect(gen.next(false).value)
                .toEqual(select(selectIsLoginRequired));

            expect(gen.next(true).done)
                .toEqual(true);
        });

        it('should not request if there was a state fetch error', () => {
            const gen = saga.requestStateIfNeeded();

            expect(gen.next().value)
                .toEqual(select(selectIsUserLoggedIn));

            expect(gen.next(false).value)
                .toEqual(select(selectIsFetchingState));

            expect(gen.next(false).value)
                .toEqual(select(selectIsLoginRequired));

            expect(gen.next(false).value)
                .toEqual(select(selectStateError));

            expect(gen.next(new Error('foobar')).done)
                .toEqual(true);
        });

        it('should request state if needed', () => {
            const gen = saga.requestStateIfNeeded();

            expect(gen.next().value)
                .toEqual(select(selectIsUserLoggedIn));

            expect(gen.next(false).value)
                .toEqual(select(selectIsFetchingState));

            expect(gen.next(false).value)
                .toEqual(select(selectIsLoginRequired));

            expect(gen.next(false).value)
                .toEqual(select(selectStateError));

            expect(gen.next(null).value)
                .toEqual(put(stateRequest()));

            expect(gen.next().done)
                .toEqual(true);
        });
    });

    describe('*waitForLogin()', () => {
        it('should loop until user is logged in', () => {
            const gen = saga.waitForLogin();

            expect(gen.next().value)
                .toEqual(select(selectIsUserLoggedIn));

            expect(gen.next(
                false // Result of selectIsUserLoggedIn
            ).value)
                .toEqual(race({
                    restore: take(STATE_RESTORE),
                    success: take(STATE_SUCCESS),
                }));

            // Loop repeats.
            expect(gen.next().value)
                .toEqual(select(selectIsUserLoggedIn));

            expect(gen.next(
                false // Result of selectIsUserLoggedIn
            ).value)
                .toEqual(race({
                    restore: take(STATE_RESTORE),
                    success: take(STATE_SUCCESS),
                }));

            expect(gen.next().value)
                .toEqual(select(selectIsUserLoggedIn));

            // Exits if user is now logged in.
            expect(gen.next(
                true // Result of selectIsUserLoggedIn
            ).done)
                .toEqual(true);
        });

        it('should bail immediately if user is already logged in', () => {
            const gen = saga.waitForLogin();

            expect(gen.next().value)
                .toEqual(select(selectIsUserLoggedIn));

            expect(gen.next(true).done)
                .toEqual(true);
        });
    });

    describe('*endpointRequest()', () => {
        it.skip('TODO', () => {});
    });

    describe('*endpointRequest()', () => {
        it.skip('TODO', () => {});
    });

    describe('*defaultSaga()', () => {
        it.skip('TODO', () => {});
    });
});
