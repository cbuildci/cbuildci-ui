import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import createInjector from 'utils/injectSaga';
import { raceCancel } from '../../utils/saga-util';
import { requestJson } from 'utils/request';

import {
    PAGE_OPENED,
    PAGE_CLOSED,
    FETCH_EXECUTIONS_REQUEST,
} from './constants';

import {
    LOGIN_SUCCESS,
} from 'containers/App/constants';

import {
    loginRequest,
} from 'containers/App/actions';

import {
    selectLoggingIn,
} from 'containers/App/selectors';

import selectDomain from './selectors';

import {
    fetchExecutions,
    fetchExecutionsSuccess,
    fetchExecutionsFailure,
} from './actions';

export function* fetchingExecution() {
    // Check if a login is in process.
    const isLoggingIn = yield select(selectLoggingIn);
    if (isLoggingIn) {
        yield take(LOGIN_SUCCESS);
    }

    try {
        const {
            owner,
            repo,
            commit,
        } = yield select(selectDomain);

        if (!owner) {
            return;
        }

        const {
            executions,
            lastEvaluatedKey,
        } = yield call(
            requestJson,
            `/api/v1/repo/${owner}/${repo}/commit/${commit}`,
        );

        yield put(fetchExecutionsSuccess(
            executions,
            lastEvaluatedKey,
        ));
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
                    yield call(fetchExecutions());
                }
            }
            else {
                yield put(fetchExecutionsFailure(
                    err.body,
                ));
            }
        }
        else {
            yield put(fetchExecutionsFailure(
                {
                    message: err.message,
                },
            ));
        }
    }
}

export const injectSaga = createInjector(module);

// Individual exports for testing
export default function* defaultSaga() {
    yield takeLatest(
        PAGE_OPENED,
        function* onOpened() {
            yield put(fetchExecutions());
        },
    );

    yield takeLatest(
        FETCH_EXECUTIONS_REQUEST,
        raceCancel(fetchingExecution, [
            PAGE_CLOSED,
            FETCH_EXECUTIONS_REQUEST,
        ]),
    );
}
