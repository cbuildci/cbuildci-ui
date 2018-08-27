import React from 'react';
import { snapshots } from '../../../../internals/testing/snapshot-util';
import ExecutionStartMessage from '../index';

describe('<ExecutionStartMessage/>', () => {
    it('should render expected JSX with just the create time', () => {
        snapshots(
            <ExecutionStartMessage
                githubHost="git.com"
                owner="foo"
                repo="bar"
                createTime={1500000000000}
            />,
        );
    });

    it('should render expected JSX for unknown event', () => {
        snapshots(
            <ExecutionStartMessage
                githubHost="git.com"
                owner="foo"
                repo="bar"
                createTime={1500000000000}
                event={{
                    type: 'foobar',
                }}
            />,
        );
    });

    it('should render expected JSX for "opened" pull request event', () => {
        snapshots(
            <ExecutionStartMessage
                githubHost="git.com"
                owner="foo"
                repo="bar"
                createTime={1500000000000}
                event={{
                    type: 'pull_request',
                    action: 'opened',
                    pull_request: {
                        number: 5,
                    },
                    sender: {
                        login: 'bsmith',
                        type: 'User',
                        id: 13106037,
                    },
                }}
            />,
        );
    });

    it('should render expected JSX for "synchronize" pull request event', () => {
        snapshots(
            <ExecutionStartMessage
                githubHost="git.com"
                owner="foo"
                repo="bar"
                createTime={1500000000000}
                event={{
                    type: 'pull_request',
                    action: 'synchronize',
                    pull_request: {
                        number: 5,
                    },
                    sender: {
                        login: 'bsmith',
                        type: 'User',
                        id: 13106037,
                    },
                }}
            />,
        );
    });

    it('should render expected JSX for "rerun" user event', () => {
        snapshots(
            <ExecutionStartMessage
                githubHost="git.com"
                owner="foo"
                repo="bar"
                createTime={1500000000000}
                event={{
                    type: 'check_run',
                    action: 'requested_action',
                    requested_action: {
                        identifier: 'rerun',
                    },
                    sender: {
                        login: 'bsmith',
                        type: 'User',
                        id: 13106037,
                    },
                }}
            />,
        );
    });

    it('should render expected JSX for unknown user event', () => {
        snapshots(
            <ExecutionStartMessage
                githubHost="git.com"
                owner="foo"
                repo="bar"
                createTime={1500000000000}
                event={{
                    type: 'check_run',
                    action: 'requested_action',
                    requested_action: {
                        identifier: 'foobar',
                    },
                    sender: {
                        login: 'bsmith',
                        type: 'User',
                        id: 13106037,
                    },
                }}
            />,
        );
    });
});
