import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the languageToggle state domain.
 *
 * @param {object} state
 * @returns {object}
 */
const selectLanguage = (state) => state.get('language', initialState);

/**
 * Select the language locale.
 *
 * @returns {string}
 */
const makeSelectLocale = () => createSelector(
    selectLanguage,
    (languageState) => languageState.get('locale')
);

export { selectLanguage, makeSelectLocale };
