import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the languageToggle state domain.
 *
 * @param {object} state
 * @returns {object}
 */
export const selectLanguage = (state) => state.get('language', initialState);

/**
 * Select the language locale.
 *
 * @returns {string}
 */
export const selectLocale = createSelector(
    selectLanguage,
    (languageState) => languageState.get('locale')
);
