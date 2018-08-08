import React from 'react';
import { snapshots } from '../../../../internals/testing/snapshot-util';
import PageHeader from '../index';

describe('<PageHeader />', () => {
    it('should render expected JSX', () => {
        snapshots(
            <PageHeader>
                Foobar
            </PageHeader>,
        );
    });
});
