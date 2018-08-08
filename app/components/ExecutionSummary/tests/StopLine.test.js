import React from 'react';
import { snapshots } from '../../../../internals/testing/snapshot-util';
import StopLine from '../StopLine';

describe('<StopLine/>', () => {
    it('should render expected JSX when has concluded', () => {
        snapshots(
            <StopLine
                githubHost="git.com"
                createTime={1500000000000}
                conclusionTime={1500000200000}
            />
        );
    });

    it('should render expected JSX when user requests stop', () => {
        snapshots(
            <StopLine
                githubHost="git.com"
                createTime={1500000000000}
                stopUser="foo"
                stopRequestTime={1500000100000}
            />
        );
    });

    it('should render expected JSX when user requests stop and has concluded', () => {
        snapshots(
            <StopLine
                githubHost="git.com"
                createTime={1500000000000}
                stopUser="foo"
                stopRequestTime={1500000100000}
                conclusionTime={1500000200000}
            />
        );
    });
});
