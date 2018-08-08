import React from 'react';
import { snapshots } from '../../../../internals/testing/snapshot-util';
import IdentifierLine from '../IdentifierLine';

describe('<IdentifierLine/>', () => {
    it('should render expected JSX', () => {
        snapshots(
            <IdentifierLine
                githubHost="git.com"
                owner="foo"
                repo="bar"
                commit="edd98b1508f303eabaa12464f1dbb8ec5aace9de"
                executionNum={5}
            />
        );
    });
});
