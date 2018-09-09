import {
    STATE_RESTORE,
    STATE_REQUEST,
    STATE_SUCCESS,
    STATE_FAILURE,
} from '../constants';

import {
    stateRestore,
    stateRequest,
    stateSuccess,
    stateFailure,
} from '../actions';

describe('App container actions', () => {
    describe('stateRestore', () => {
        it('should return the correct type and props', () => {
            expect(stateRestore({
                foobar: true,
            })).toEqual({
                type: STATE_RESTORE,
                state: {
                    foobar: true,
                },
            });
        });
    });

    describe('stateRequest', () => {
        it('should return the correct type and props', () => {
            expect(stateRequest()).toEqual({
                type: STATE_REQUEST,
                resetUser: false,
            });

            expect(stateRequest(true)).toEqual({
                type: STATE_REQUEST,
                resetUser: true,
            });
        });
    });

    describe('stateSuccess', () => {
        it('should return the correct type and props', () => {
            expect(stateSuccess(
                'gurl',
                'ghost',
                'ulogin',
                'uname',
                {
                    foo: 'bar',
                },
            )).toEqual({
                type: STATE_SUCCESS,
                githubUrl: 'gurl',
                githubHost: 'ghost',
                userLogin: 'ulogin',
                userName: 'uname',
                endpoints: {
                    foo: 'bar',
                },
            });
        });
    });

    describe('stateFailure', () => {
        it('should return the correct type and error', () => {
            const err = new Error();
            expect(stateFailure(err)).toEqual({
                type: STATE_FAILURE,
                error: err,
            });
        });
    });
});
