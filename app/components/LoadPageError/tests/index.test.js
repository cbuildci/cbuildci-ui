import React from 'react';
import { snapshots } from '../../../../internals/testing/snapshot-util';
import LoadPageError from '../index';

describe('<LoadPageError />', () => {
    it('should render expected JSX', () => {
        snapshots(
            <LoadPageError/>
        );
    });
});
