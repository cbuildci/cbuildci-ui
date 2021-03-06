/**
 * Asynchronously loads the component for NotFoundPage
 */

import Loadable from 'react-loadable';
import LoadingIndicator from 'components/LoadingIndicator';

export default Loadable({
    loader: () => import(/* webpackChunkName: "NotFoundPage" */ './index'),
    loading: LoadingIndicator.ForImport,
    timeout: 3000,
});
