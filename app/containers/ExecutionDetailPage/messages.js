/*
 * ExecutionDetailPage Messages
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
    header: {
        id: 'app.containers.ExecutionDetailPage.header',
        defaultMessage: 'Execution Detail',
    },
    headerExecution: {
        id: 'app.containers.ExecutionDetailPage.headerExecution',
        defaultMessage: 'EXECUTION',
    },
    headerBuilds: {
        id: 'app.containers.ExecutionDetailPage.headerBuilds',
        defaultMessage: 'BUILDS',
    },
    buildHeader: {
        id: 'app.containers.ExecutionDetailPage.buildHeader',
        defaultMessage: 'Build',
    },
    viewDetailButton: {
        id: 'app.containers.ExecutionDetailPage.viewDetailButton',
        defaultMessage: 'View Detail',
    },
    actionButton: {
        id: 'app.containers.ExecutionDetailPage.actionButton',
        defaultMessage: `{action, select,
            stop {Stop}
            rerun {Re-Run}
            other {{action}}
        }`,
    },
    actionButtonTooltip: {
        id: 'app.containers.ExecutionDetailPage.actionButtonTooltip',
        defaultMessage: `{action, select,
            stop {Stop the execution.}
            rerun {Re-run the execution.}
            other {Run action "{action}" for the execution.}
        }`,
    },
});
