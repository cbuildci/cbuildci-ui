import { createSelector } from 'reselect';
import { initialState } from './reducer';

// Direct selector to the executionDetailPage state domain.
const selectDomain =
    (globalState) => globalState.get('executionDetailPage', initialState);

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

export const selectBuildKey = createSelector(
    selectDomain,
    (domainState) => domainState.get('buildKey'),
);

export const selectIsLoadingLogs = createSelector(
    selectDomain,
    (domainState) => domainState.get('isLoadingLogs'),
);

export const selectLoadLogsError = createSelector(
    selectDomain,
    (domainState) => domainState.get('loadLogsError'),
);

export const selectExecutionLogs = createSelector(
    selectDomain,
    (domainState) => domainState.get('executionLogs'),
);
