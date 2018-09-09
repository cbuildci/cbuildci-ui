import { call, put, select, take, takeLatest, race, throttle } from 'redux-saga/effects';
import createInjector from 'utils/injectSaga';
import { requestJson, buildApiUrl } from 'utils/request';
import { delay } from '../../utils/saga-util';

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

export function getStoredSessionState() {
    return JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY) || '{}');
}

export function setStoredSessionState(state) {
    sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify(state),
    );
}

export function* init() {
    // Skip init if already restored state.
    if (yield select(selectHasRestoredState)) {
        return;
    }

    try {
        yield put(stateRestore(
            yield call(getStoredSessionState),
        ));
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.warn(`Failed to restore state: ${err.stack}`);
    }

    // Request the state on app init.
    yield put(stateRequest());
}

export function* fetchState() {
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

export function* saveStateToSession() {
    // Persist the state on success.
    yield call(
        setStoredSessionState,
        yield select(selectRestoreState),
    );
}

export function* checkForLoginSuccess() {
    const isFetchingState = yield select(selectIsFetchingState);
    if (isFetchingState) {
        return;
    }

    const isLoginRequired = yield select(selectIsLoginRequired);
    if (!isLoginRequired) {
        return;
    }

    yield put(stateRequest());
}

export function* waitForLogin() {
    while (!(yield select(selectIsUserLoggedIn))) {
        yield race({
            restore: take(STATE_RESTORE),
            success: take(STATE_SUCCESS),
        });
    }
}

/**
 * Fetch the state if needed.
 */
export function* requestStateIfNeeded() {
    // Skip if already logged in.
    if (yield select(selectIsUserLoggedIn)) {
        return;
    }

    // Skip if already fetching state.
    if (yield select(selectIsFetchingState)) {
        return;
    }

    // Skip if showing the login modal.
    if (yield select(selectIsLoginRequired)) {
        return;
    }

    // Skip if showing a state fetch error.
    if (yield select(selectStateError)) {
        return;
    }

    yield put(stateRequest());
}

export function* endpointRequest(endpoint, params, ...args) {
    let attempt = 0;
    while (true) {
        attempt++;

        yield call(requestStateIfNeeded);
        yield call(waitForLogin);

        const endpoints = yield select(selectEndpoints);
        const url = buildApiUrl(endpoints[endpoint], params);

        try {
            return yield call(requestJson, url, ...args);
        }
        catch (err) {
            // Allow up to 10 attempts if the response indicates the user needs to login.
            if (attempt <= 10 && err.isJson && err.status === 403 && err.body && err.body.authRedirectUrl) {

                // Add a small delay
                yield delay(100 * attempt);

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

    yield call(init);
}
