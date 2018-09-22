import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import createInjector from 'utils/injectSaga';
import { push as pushLocation } from 'connected-react-router/immutable';
import { delay, raceCancel } from '../../utils/saga-util';

import {
    endpointRequest,
} from 'containers/App/saga';

import {
    EXECUTION_OPENED,
    EXECUTION_CLOSED,
    ACTION_REQUEST,
    BUILD_OPENED,
    BUILD_CLOSED,
    FETCH_EXECUTION_REQUEST,
    FETCH_BUILD_LOGS_REQUEST,
} from './constants';

import selectDomain, {
    selectExecution,
    selectBuildKey,
} from './selectors';

import {
    fetchExecution,
    fetchExecutionSuccess,
    fetchExecutionFailure,
    actionSuccess,
    actionFailure,
    fetchBuildLogs,
    fetchBuildLogsSuccess,
    fetchBuildLogsFailure,
} from './actions';

export function* fetchingExecution({
    accessKey = null,
}) {
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
            endpointRequest,
            'getExecutionUrl',
            { owner, repo, commit, executionNum },
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
            yield put(fetchExecutionFailure(
                err.body,
            ));
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

export function* sendActionRequested({
    actionRequested,
}) {
    try {
        const execution = yield select(selectExecution);
        if (!execution) {
            return;
        }

        const { owner, repo, commit, executionNum } = execution;

        const response = yield call(
            endpointRequest,
            'executionActionUrl',
            { owner, repo, commit, executionNum, actionRequested },
            {
                method: 'POST',
            }
        );

        yield put(actionSuccess(
            actionRequested,
            response.execution || null,
        ));

        // Redirect to the new execution, if re-run action.
        if (actionRequested === 'rerun') {
            const { owner, repo, commit, executionNum } = response;
            yield put(pushLocation(`/repo/${owner}/${repo}/commit/${commit}/exec/${executionNum}`));
        }

        // Otherwise, fetch the execution to get the new list of actions,
        // if the response did not include new execution data.
        else if (!response.execution) {
            yield put(fetchExecution());
        }
    }
    catch (err) {
        if (err.isJson && err.body) {
            yield put(actionFailure(
                actionRequested,
                err.body,
            ));
        }
        else {
            yield put(actionFailure(
                actionRequested,
                {
                    message: err.message,
                    stack: err.stack,
                },
            ));
        }
    }
}

export function* fetchingBuildLogs({
    accessKey = null,
}) {
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

        if (buildState.codeBuild) {
            const headers = {};

            if (accessKey) {
                headers['x-execution-logs-access-key'] = accessKey;
            }

            const response = yield call(
                endpointRequest,
                'getExecutionBuildLogsUrl',
                { owner, repo, commit, executionNum, buildKey }, // limit, nextToken
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
            yield put(fetchBuildLogsFailure(
                err.body,
            ));
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

    yield takeEvery(
        ACTION_REQUEST,
        raceCancel(sendActionRequested, [
            EXECUTION_OPENED,
            EXECUTION_CLOSED,
        ]),
    );
}
