import { createSelector } from 'reselect';
import { initialState } from './reducer';

// Direct selector to the repoExecutionsPage state domain.
const selectDomain =
    (globalState) => globalState.get('repoExecutionsPage', initialState);

// Default selector used by RepoExecutionsPage
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
