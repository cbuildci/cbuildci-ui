import { call, put, select, takeLatest } from 'redux-saga/effects';
import createInjector from 'utils/injectSaga';
import { raceCancel } from '../../utils/saga-util';

import {
    endpointRequest,
} from 'containers/App/saga';

import {
    PAGE_OPENED,
    PAGE_CLOSED,
    FETCH_EXECUTIONS_REQUEST,
} from './constants';

import selectDomain from './selectors';

import {
    fetchExecutions,
    fetchExecutionsSuccess,
    fetchExecutionsFailure,
} from './actions';

export function* fetchingExecution() {
    try {
        const {
            owner,
            repo,
        } = yield select(selectDomain);

        if (!owner) {
            return;
        }

        const {
            executions,
            lastEvaluatedKey,
        } = yield call(
            endpointRequest,
            'searchByRepoUrl',
            { owner, repo },
        );

        yield put(fetchExecutionsSuccess(
            executions,
            lastEvaluatedKey,
        ));
    }
    catch (err) {
        if (err.isJson && err.body) {
            yield put(fetchExecutionsFailure(
                err.body,
            ));
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
        ]),
    );
}
