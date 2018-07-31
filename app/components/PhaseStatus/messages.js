/*
 * PhaseStatus Messages
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
    phaseStatus: {
        id: 'app.components.PhaseStatus.phaseStatus',
        defaultMessage: `{status, select,
            other {{status}}
        }`,
    },
});
