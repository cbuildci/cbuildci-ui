import { fromJS } from 'immutable';

import { selectLanguage } from '../selectors';

describe('selectLanguage', () => {
    it('should select the app state', () => {
        const appState = fromJS({});
        const mockedState = fromJS({
            language: appState,
        });
        expect(selectLanguage(mockedState)).toEqual(appState);
    });
});
