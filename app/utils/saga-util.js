import { call, race, take } from 'redux-saga/effects';

export function delay(ms, value = true) {
    return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/**
 * Wrap a saga so any action that matches the specified patterns will cancel the saga.
 *
 * @param {function} saga - Must be valid as the first argument of call() effect.
 * @param {string[]} cancelPatterns - Patterns (passed to take() effect) that will cancel the saga if emitted.
 * @returns {function}
 */
export function raceCancel(saga, cancelPatterns) {
    return function *raceFirst(...args) {
        const raceObj = {
            first: call(saga, ...args),
        };
        for (let i = 0; i < cancelPatterns.length; i++) {
            raceObj[i] = take(cancelPatterns[i]);
        }

        // eslint-disable-next-line redux-saga/no-yield-in-race
        yield race(raceObj);
    };
}
