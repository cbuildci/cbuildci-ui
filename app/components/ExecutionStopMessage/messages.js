/*
 * ExecutionStopMessage Messages
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
    userStop: {
        id: 'app.components.ExecutionStopMessage.userStop',
        defaultMessage: 'Stop requested after {durationHtml} by {userHtml}',
    },
    conclusionMessage: {
        id: 'app.components.ExecutionStopMessage.conclusionMessage',
        defaultMessage: `{hasStop, select, 
            yes {Stop requested after {stopDurationHtml} by {stopUserHtml} {hasConcluded, select,
                yes {and took {conclusionDurationHtml} to stop}
                no {}
            }}
            no {Concluded after {conclusionDurationHtml}}
        }`,
    },
});
