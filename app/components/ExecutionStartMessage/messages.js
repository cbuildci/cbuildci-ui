/*
 * ExecutionStartMessage Messages
 */

import { defineMessages } from 'react-intl';

const baseStarted = 'Started {relativeCreateTimeHtml}';

export default defineMessages({
    startedWithoutEvent: {
        id: 'app.components.ExecutionStartMessage.startedWithoutEvent',
        defaultMessage: baseStarted,
    },
    startedWithUnknownEvent: {
        id: 'app.components.ExecutionStartMessage.startedWithUnknownEvent',
        defaultMessage: `${baseStarted} after event "{eventType}"`,
    },
    startedForPullRequest: {
        id: 'app.components.ExecutionStartMessage.startedForPullRequest',
        defaultMessage: `${baseStarted} after {action, select,
            opened {{actionHtml}}
            synchronize {{actionHtml} to}
            other {{actionHtml}}
        }
        {pullRequestLinkHtml}`,
    },
    startedForPullRequest_action: {
        id: 'app.components.ExecutionStartMessage.startedForPullRequest_action',
        defaultMessage: `{action, select,
            opened {opening}
            synchronize {push}
            other {action}
        }`,
    },
    startedForPullRequest_link: {
        id: 'app.components.ExecutionStartMessage.startedForPullRequest_link',
        defaultMessage: 'pull request #{pullRequestNumber}',
    },
    startedByUserAction: {
        id: 'app.components.ExecutionStartMessage.startedByUserAction',
        defaultMessage: `${baseStarted} {identifier, select,
            rerun {as {identifierHtml}}
            other {for action {identifierHtml}}
        } initiated by {usernameHtml}`,
    },
    startedByUserAction_identifier: {
        id: 'app.components.ExecutionStartMessage.startedByUserAction_identifier',
        defaultMessage: `{identifier, select,
            rerun {re-run}
            other {{identifier}}
        }`,
    },
});
