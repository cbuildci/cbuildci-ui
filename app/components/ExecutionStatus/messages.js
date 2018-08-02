/*
 * ExecutionStatus Messages
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
    executionStatus: {
        id: 'app.components.ExecutionStatus.executionStatus',
        defaultMessage: `{status, select,
            QUEUED {Queued}
            IN_PROGRESS {In Progress}
            SUCCEEDED {Succeeded}
            ERROR {Internal System Error}
            FAILED {Failed}
            STOPPED {Stopped by User}
            TIMED_OUT {Timed Out}
            NEUTRAL {Neutral}
            other {{status}}
        }`,
    },
});
