/*
 * App Messages
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
    loginModalTitle: {
        id: 'app.containers.App.loginModalTitle',
        defaultMessage: 'Authorization Required',
    },
    loginModalBody: {
        id: 'app.containers.App.loginModalBody',
        defaultMessage: 'You must log in via {githubHost} so {appHost} can verify your identity.',
    },
    loginModalButton: {
        id: 'app.containers.App.loginModalButton',
        defaultMessage: 'Continue to {githubHost}',
    },
});
