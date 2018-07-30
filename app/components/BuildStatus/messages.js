/*
 * BuildStatus Messages
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
    buildStatus: {
        id: 'app.components.BuildStatus.buildStatus',
        defaultMessage: `{status, select,
            IN_PROGRESS {In Progress}
            WAITING_FOR_DEPENDENCY {Waiting for Dependency}
            BUILD_NOTFOUND {Build Not Found}
            SUCCEEDED {Succeeded}
            DEPENDENCY_FAILED {Dependency Failed}
            START_CODEBUILD_FAILED {Failed to Start CodeBuild}
            STARTING {Starting CodeBuild}
            FAILED {Failed}
            FAULT {Fault}
            STOPPED {Stopped}
            TIMED_OUT {Timed Out}
            SKIPPED {Skipped}
            other {{status}}
        }`,
    },
});
