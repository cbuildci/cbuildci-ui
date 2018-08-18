import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import createInjector from 'utils/injectSaga';
import { delay, raceCancel } from '../../utils/saga-util';
import { requestJson } from 'utils/request';

import {
    EXECUTION_OPENED,
    EXECUTION_CLOSED,
    BUILD_OPENED,
    BUILD_CLOSED,
    FETCH_EXECUTION_REQUEST,
    FETCH_BUILD_LOGS_REQUEST,
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

import selectDomain, {
    selectExecution,
    selectBuildKey,
} from './selectors';

import {
    fetchExecution,
    fetchExecutionSuccess,
    fetchExecutionFailure,
    fetchBuildLogs,
    fetchBuildLogsSuccess,
    fetchBuildLogsFailure,
} from './actions';

export function* fetchingExecution({
    accessKey = null,
}) {
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
            executionNum,
        } = yield select(selectDomain);

        if (!owner) {
            return;
        }

        const headers = {};

        if (accessKey) {
            headers['x-execution-access-key'] = accessKey;
        }

        const execution = yield call(
            requestJson,
            `/api/v1/repo/${owner}/${repo}/commit/${commit}/exec/${executionNum}`,
            { headers }
        );

        yield put(fetchExecutionSuccess(
            execution,
        ));

        try {
            // Queue another update if the execution has not completed.
            if (execution && execution.status !== 'COMPLETED') {
                yield delay(5000); // TODO: Use metadata to determine time.
                yield put(fetchExecution(
                    execution.accessKey,
                ));
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
                        accessKey,
                    }));
                }
            }
            else {
                yield put(fetchExecutionFailure(
                    err.body,
                ));
            }
        }
        else {
            yield put(fetchExecutionFailure(
                {
                    message: err.message,
                },
            ));
        }
    }
}

export function* fetchingBuildLogs({
    accessKey = null,
}) {
    // Check if a login is in process.
    const isLoggingIn = yield select(selectLoggingIn);
    if (isLoggingIn) {
        yield take(LOGIN_SUCCESS);
    }

    try {
        const execution = yield select(selectExecution);
        if (!execution) {
            return;
        }

        const { owner, repo, commit, executionNum } = execution;
        const buildKey = yield select(selectBuildKey);

        const buildState = execution.state.builds[buildKey];
        if (!buildState) {
            return;
        }

        let accessKey;
        if (buildState.codeBuild) {
            const headers = {};

            if (accessKey) {
                headers['x-execution-logs-access-key'] = accessKey;
            }

            const response = yield call(
                requestJson,
                `/api/v1/repo/${owner}/${repo}/commit/${commit}/exec/${executionNum}/build/${buildKey}/logs`,
                { headers }
            );

            if (response.accessKey) {
                accessKey = response.accessKey;
            }

            yield put(fetchBuildLogsSuccess(
                response.events,
            ));
        }

        try {
            // Queue another update if the execution has not completed.
            if (execution.status !== 'COMPLETED') {
                yield delay(2000);
                yield put(fetchBuildLogs(
                    accessKey,
                ));
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
                    yield call(fetchBuildLogs({
                        accessKey,
                    }));
                }
            }
            else {
                yield put(fetchBuildLogsFailure(
                    err.body,
                ));
            }
        }
        else {
            yield put(fetchBuildLogsFailure(
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
        EXECUTION_OPENED,
        function* onOpened() {
            yield put(fetchExecution());
        },
    );

    yield takeLatest(
        FETCH_EXECUTION_REQUEST,
        raceCancel(fetchingExecution, [
            EXECUTION_CLOSED,
            FETCH_EXECUTION_REQUEST,
        ]),
    );

    yield takeLatest(
        BUILD_OPENED,
        function* onOpened() {
            yield put(fetchBuildLogs());
        },
    );

    yield takeLatest(
        FETCH_BUILD_LOGS_REQUEST,
        raceCancel(fetchingBuildLogs, [
            EXECUTION_OPENED,
            EXECUTION_CLOSED,
            BUILD_CLOSED,
            FETCH_BUILD_LOGS_REQUEST,
        ]),
    );
}
