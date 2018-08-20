/*
 * Asynchronously loads the component for ExecutionDetailPage
 */

import React from 'react';
import Loadable from 'react-loadable';
import ErrorBoundary from 'components/ErrorBoundary';
import LoadingIndicator from 'components/LoadingIndicator';
import { pageErrorMessage } from 'components/LoadPageError';

export default Loadable({
    loader: () => import(/* webpackChunkName: "ExecutionDetailPage" */ './index'),
    loading: LoadingIndicator.ForImport,
    render(loaded, props) {
        return (
            <ErrorBoundary errorMessage={pageErrorMessage}>
                <loaded.default {...props}/>
            </ErrorBoundary>
        );
    },
});
