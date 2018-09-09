/*
 * App Messages
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
    stateErrorModalTitle: {
        id: 'app.containers.App.stateErrorModalTitle',
        defaultMessage: 'Failed to Load Application',
    },
    stateErrorModalBody: {
        id: 'app.containers.App.stateErrorModalBody',
        defaultMessage: 'There was a problem loading the application.', // TODO: Use a better message.
    },
    stateErrorModalButton: {
        id: 'app.containers.App.stateErrorModalButton',
        defaultMessage: 'Retry',
    },
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
