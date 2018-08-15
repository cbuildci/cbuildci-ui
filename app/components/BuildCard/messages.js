/*
 * BuildCard Messages
 *
 * This contains all the text for the BuildCard component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
    started: {
        id: 'app.components.BuildCard.started',
        defaultMessage: 'Started after {durationHtml}',
    },
    running: {
        id: 'app.components.BuildCard.running',
        defaultMessage: 'Running for {durationHtml}',
    },
    ended: {
        id: 'app.components.BuildCard.completed',
        defaultMessage: 'Completed after {durationHtml}',
    },
    extraDeps: {
        id: 'app.components.BuildCard.extraDeps',
        defaultMessage: '(+{count} more)',
    },
});
