import React from 'react';
import { snapshots } from '../../../../internals/testing/snapshot-util';
import StartLine from '../StartLine';

describe('<StartLine/>', () => {
    it('should render expected JSX with just the create time', () => {
        snapshots(
            <StartLine
                githubHost="git.com"
                owner="foo"
                repo="bar"
                createTime={1500000000000}
            />,
        );
    });

    it('should render expected JSX for "opened" pull request event', () => {
        snapshots(
            <StartLine
                githubHost="git.com"
                owner="foo"
                repo="bar"
                createTime={1500000000000}
                event={{
                    event: 'pull_request',
                    action: 'opened',
                    pull_request: {
                        number: 5,
                    },
                }}
            />,
        );
    });

    it('should render expected JSX for "synchronize" pull request event', () => {
        snapshots(
            <StartLine
                githubHost="git.com"
                owner="foo"
                repo="bar"
                createTime={1500000000000}
                event={{
                    event: 'pull_request',
                    action: 'synchronize',
                    pull_request: {
                        number: 5,
                    },
                }}
            />,
        );
    });
});
