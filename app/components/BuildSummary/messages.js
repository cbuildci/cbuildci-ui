/*
 * BuildSummary Messages
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
    timingMessage: {
        id: 'app.components.BuildSummary.timingMessage',
        defaultMessage: `Started after {startDurationHtml} {hasEnded, select,
            yes {and completed after {endDurationHtml}}
            no {and has been running for {endDurationHtml}}
        }`,
    },
    started: {
        id: 'app.components.BuildSummary.startedForPullRequest',
        defaultMessage: 'Started {relativeTime}',
    },
    completed: {
        id: 'app.components.BuildSummary.completedForPullRequest',
        defaultMessage: 'Completed {relativeTime} after {durationHtml}',
    },
    completed_duration: {
        id: 'app.components.BuildSummary.completedForPullRequest_duration',
        defaultMessage: `{value, number} {unit, select,
            seconds {{value, plural, one {second} other {seconds} }}
            minutes {{value, plural, one {minute} other {minutes} }}
            hours {{value, plural, one {hour} other {hourd} }}
            days {{value, plural, one {day} other {days} }}
            weeks {{value, plural, one {week} other {weeks} }}
            months {{value, plural, one {month} other {months} }}
            years {{value, plural, one {month} other {months} }}
        }`,
    },
});
