import { createSelector } from 'reselect';
import { initialState } from './reducer';

// Direct selector to the commitExecutionsPage state domain.
const selectDomain =
    (globalState) => globalState.get('commitExecutionsPage', initialState);

// Default selector used by CommitExecutionsPage
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

export const selectExecutions = createSelector(
    selectDomain,
    (domainState) => domainState.get('executions'),
);

export const selectLastEvaluatedKey = createSelector(
    selectDomain,
    (domainState) => domainState.get('lastEvaluatedKey'),
);
