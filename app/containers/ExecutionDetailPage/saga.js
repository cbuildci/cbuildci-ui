import { take, call, put, select, race, takeLatest } from 'redux-saga/effects';
import createInjector from 'utils/injectSaga';
import { delay, raceCancel } from '../../utils/saga-util';
import { requestJson } from 'utils/request';

import {
    CONTAINER_CLOSED,
    FETCH_EXECUTION_REQUEST,
} from './constants';

import {
    LOGIN_SUCCESS,
} from '../App/constants';

import {
    loginRequest,
} from '../App/actions';

import {
    selectLoggingIn,
} from '../App/selectors';

import {
    fetchExecution,
    fetchExecutionSuccess,
    fetchExecutionFailure,
} from './actions';

export function* fetchingExecution({
    owner,
    repo,
    commit,
    executionNum,
    accessKey = null,
}) {
    // Check if a login is in process.
    const isLoggingIn = yield select(selectLoggingIn);
    if (isLoggingIn) {
        yield take(LOGIN_SUCCESS);
    }

    try {
        const headers = {};

        if (accessKey) {
            headers['x-execution-access-key'] = accessKey;
        }

        const response = yield call(
            requestJson,
            `/api/v1/repo/${owner}/${repo}/commit/${commit}/exec/${executionNum}`,
            { headers }
        );

        yield put(fetchExecutionSuccess(
            owner,
            repo,
            commit,
            executionNum,
            response,
        ));

        try {
            if (response && response.status !== 'COMPLETED') {
                // Queue an update.
                const [timeout] = yield race([
                    delay(5000), // TODO: Use metadata to determine time.
                    take(FETCH_EXECUTION_REQUEST),
                ]);

                if (timeout) {
                    yield put(fetchExecution(
                        owner,
                        repo,
                        commit,
                        executionNum,
                        response.executionAccessKey,
                    ));
                }
            }
        }
        catch (err) {
            // TODO
            // eslint-disable-next-line no-console
            console.error('Failed update queue', err);
        }
    }
    catch (err) {
        if (err.isJson && err.body) {
            if (err.statusCode === 403 && err.body.authRedirectUrl) {
                // Start a login request.
                yield put(loginRequest(err.body.authRedirectUrl));

                // Wait for the login to succeed or the
                const loginSuccessResult = yield take(LOGIN_SUCCESS);

                if (loginSuccessResult) {
                    // Try the fetch again...
                    yield call(fetchExecution({
                        owner,
                        repo,
                        commit,
                        executionNum,
                        accessKey,
                    }));
                }
            }
            else {
                yield put(fetchExecutionFailure(
                    owner,
                    repo,
                    commit,
                    executionNum,
                    err.body,
                ));
            }
        }
        else {
            yield put(fetchExecutionFailure(
                owner,
                repo,
                commit,
                executionNum,
                {
                    message: err.message,
                },
            ));
        }
    }
}

export const injectSaga = createInjector(module);

export default function* defaultSaga() {
    yield takeLatest(
        FETCH_EXECUTION_REQUEST,
        raceCancel(fetchingExecution, [CONTAINER_CLOSED]),
    );
}
