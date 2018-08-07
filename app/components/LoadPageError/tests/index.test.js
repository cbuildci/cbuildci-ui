import React from 'react';
import LoadPageError from '../index';
import { snapshots } from '../../../../internals/testing/snapshot-util';

describe('<LoadPageError />', () => {
    it('should render expected JSX', () => {
        snapshots(
            <LoadPageError/>
        );
    });
});
