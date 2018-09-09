import { call, put, select, take, takeLatest, race, throttle } from 'redux-saga/effects';
import createInjector from 'utils/injectSaga';
import { requestJson, buildApiUrl } from 'utils/request';

import {
    WINDOW_VISIBLE,
    WINDOW_FOCUS,
    SESSION_STORAGE_KEY,
    STATE_REQUEST,
    STATE_RESTORE,
    STATE_SUCCESS,
} from './constants';

import {
    stateRestore,
    stateRequest,
    stateSuccess,
    stateFailure,
} from './actions';

import {
    selectEndpoints,
    selectHasRestoredState,
    selectRestoreState,
    selectIsFetchingState,
    selectIsUserLoggedIn,
    selectIsLoginRequired,
    selectStateError,
} from './selectors';

function* init() {
    // Skip init if already restored state.
    if (yield select(selectHasRestoredState)) {
        return;
    }

    try {
        yield put(stateRestore(
            JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY) || '{}'),
        ));
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.warn(`Failed to restore state: ${err.stack}`);
    }

    // Request the state on app init.
    yield put(stateRequest());
}

function* fetchState() {
    try {
        const { app, user, endpoints } = yield call(
            requestJson,
            '/api/v1',
        );

        yield put(stateSuccess(
            app.githubUrl,
            app.githubHost,
            user && user.login || null,
            user && user.name || null,
            endpoints,
        ));
    }
    catch (err) {
        if (err.isJson && err.body) {
            yield put(stateFailure(
                err.body,
            ));
        }
        else {
            yield put(stateFailure(
                {
                    message: err.message,
                },
            ));
        }
    }
}

function* saveStateToSession() {
    const state = yield select(selectRestoreState);

    // Persist the state on success.
    sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify(state),
    );
}

function* checkForLoginSuccess() {
    if (!(yield select(selectIsFetchingState)) && (yield select(selectIsLoginRequired))) {
        yield put(stateRequest());
    }
}

export function* waitForLogin() {
    while (!(yield select(selectIsUserLoggedIn))) {

        const isFetchingState = yield select(selectIsFetchingState);
        const isLoginRequired = yield select(selectIsLoginRequired);
        const stateError = yield select(selectStateError);

        // Request state if not already requesting it.
        if (!isFetchingState && !isLoginRequired && !stateError) {
            yield put(stateRequest());
        }

        yield race({
            restore: take(STATE_RESTORE),
            success: take(STATE_SUCCESS),
        });
    }
}

export function* endpointRequest(endpoint, params, ...args) {
    while (true) {
        yield call(waitForLogin);

        const endpoints = yield select(selectEndpoints);
        const url = buildApiUrl(endpoints[endpoint], params);

        try {
            return yield call(requestJson, url, ...args);
        }
        catch (err) {
            if (err.isJson && err.status === 403 && err.body && err.body.authRedirectUrl) {
                yield put(stateRequest(true));
            }
            else {
                throw err;
            }
        }
    }
}

export const injectSaga = createInjector(module);

export default function* defaultSaga() {
    yield takeLatest(
        STATE_REQUEST,
        fetchState,
    );

    yield takeLatest(
        [STATE_REQUEST, STATE_SUCCESS],
        saveStateToSession,
    );

    // Refetch state on focus and visibility just in case
    // the user logged in using another window.
    yield throttle(10000, [
        WINDOW_VISIBLE,
        WINDOW_FOCUS,
    ], checkForLoginSuccess);

    yield* init();
}
