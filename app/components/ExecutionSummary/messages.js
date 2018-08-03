/*
 * ExecutionSummary Messages
 */

import { defineMessages } from 'react-intl';

const baseStarted = 'Started {relativeCreateTimeHtml}';

export default defineMessages({
    startedWithoutEvent: {
        id: 'app.components.ExecutionSummary.startedWithoutEvent',
        defaultMessage: baseStarted,
    },
    startedWithUnknownEvent: {
        id: 'app.components.ExecutionSummary.startedWithUnknownEvent',
        defaultMessage: `${baseStarted} after event "{event}"`,
    },
    startedForPullRequest: {
        id: 'app.components.ExecutionSummary.startedForPullRequest',
        defaultMessage: `${baseStarted} after {action, select,
            opened {{actionHtml}}
            synchronize {{actionHtml} to}
            other {{actionHtml}}
        }
        {pullRequestLinkHtml}`,
    },
    startedForPullRequest_action: {
        id: 'app.components.ExecutionSummary.startedForPullRequest_action',
        defaultMessage: `{action, select,
            opened {opening}
            synchronize {push}
            other {action}
        }`,
    },
    startedForPullRequest_link: {
        id: 'app.components.ExecutionSummary.startedForPullRequest_link',
        defaultMessage: 'pull request #{pullRequestNumber}',
    },
    startedByUserAction: {
        id: 'app.components.ExecutionSummary.startedByUserAction',
        defaultMessage: `${baseStarted} {identifier, select,
            rerun {as {identifierHtml}}
            other {for action {identifierHtml}}
        } initiated by {usernameHtml}`,
    },
    startedByUserAction_identifier: {
        id: 'app.components.ExecutionSummary.startedByUserAction_identifier',
        defaultMessage: `{identifier, select,
            rerun {re-run}
            other {{identifier}}
        }`,
    },
    userStop: {
        id: 'app.components.ExecutionSummary.userStop',
        defaultMessage: 'Stop requested after {durationHtml} by {userHtml}',
    },
    conclusionMessage: {
        id: 'app.components.ExecutionSummary.conclusionMessage',
        defaultMessage: `{hasStop, select, 
            yes {Stop requested after {stopDurationHtml} by {stopUserHtml} {hasConcluded, select,
                yes {and took {conclusionDurationHtml} to stop}
                no {}
            }}
            no {Concluded after {conclusionDurationHtml}}
        }`,
    },
});
