import React from 'react';
import { snapshots } from '../../../../internals/testing/snapshot-util';
import ExecutionSummary from '../index';

describe('<ExecutionSummary />', () => {
    it('Should render expected JSX for initial props (before the step function starts)', () => {
        snapshots(
            <ExecutionSummary
                githubHost="git.com"
                owner="foo"
                repo="bar"
                commit="edd98b1508f303eabaa12464f1dbb8ec5aace9de"
                executionNum={5}
                status="QUEUED"
                createTime="2018-07-27T16:52:18.099Z"
                OFFconclusion=""
                OFFconclusionTime=""
                OFFinitiator=""
                OFFstopUser=""
                OFFstopRequestTime=""
            />
        );
    });

    it('Should render expected JSX for minimal in-progress props (after the step function starts)', () => {
        snapshots(
            <ExecutionSummary
                githubHost="git.com"
                owner="foo"
                repo="bar"
                commit="edd98b1508f303eabaa12464f1dbb8ec5aace9de"
                executionNum={5}
                status="IN_PROGRESS"
                createTime="2018-07-27T16:52:18.099Z"
                initiator={{
                    event: 'pull_request',
                    action: 'opened',
                    pull_request: {
                        head: {
                            sha: '10145a195894f17110b6d9edb9ff76697cc8d327',
                            ref: 'foobar-branch-b',
                        },
                        number: 3,
                        id: 204485519,
                        base: {
                            sha: '33bf84a4563dcd16e027c0c6cf2a08984740d3f5',
                            ref: 'foobar-branch-a',
                        },
                    },
                }}
            />
        );
    });

    it('Should render expected JSX for succeeded execution', () => {
        snapshots(
            <ExecutionSummary
                githubHost="git.com"
                owner="foo"
                repo="bar"
                commit="edd98b1508f303eabaa12464f1dbb8ec5aace9de"
                executionNum={5}
                status="COMPLETED"
                createTime="2018-07-27T16:52:18.099Z"
                initiator={{
                    event: 'pull_request',
                    action: 'opened',
                    pull_request: {
                        head: {
                            sha: '10145a195894f17110b6d9edb9ff76697cc8d327',
                            ref: 'foobar-branch-b',
                        },
                        number: 3,
                        id: 204485519,
                        base: {
                            sha: '33bf84a4563dcd16e027c0c6cf2a08984740d3f5',
                            ref: 'foobar-branch-a',
                        },
                    },
                }}
                conclusion="SUCCEEDED"
                conclusionTime="2018-07-27T17:00:00.000Z"
            />
        );
    });
});
