/**
 * The app state selectors
 */

import { createSelector } from 'reselect';

const selectApp = (state) => state.get('app');
const selectRoute = (state) => state.get('route');

const selectLocation = createSelector(
    selectRoute,
    (routeState) => routeState.get('location').toJS()
);

export {
    selectApp,
    selectLocation,
};
