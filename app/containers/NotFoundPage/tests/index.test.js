import React from 'react';
import { snapshots } from '../../../../internals/testing/snapshot-util';
import NotFound from '../index';

describe('<NotFound />', () => {
    it('should render the expected JSX', () => {
        snapshots(
            <NotFound/>
        );
    });
});
