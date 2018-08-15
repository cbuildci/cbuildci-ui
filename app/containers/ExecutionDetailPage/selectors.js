import { createSelector } from 'reselect';
import { initialState } from './reducer';

// Direct selector to the executionDetail state domain.
const selectDomain =
    (globalState) => globalState.get('executionDetail', initialState);

// Default selector used by ExecutionDetailPage
export default createSelector(
    selectDomain,
    (domainState) => domainState.toJS(),
);

/*
 * Other specific selectors
 */

export const selectIsLoading = createSelector(
    selectDomain,
    (domainState) => domainState.get('isLoading'),
);

export const selectLoadError = createSelector(
    selectDomain,
    (domainState) => domainState.get('loadError'),
);

export const selectExecution = createSelector(
    selectDomain,
    (domainState) => domainState.get('execution'),
);
