import React from 'react';
import { snapshots } from '../../../../internals/testing/snapshot-util';
import LoadPageError from '../index';

describe('<LoadPageError />', () => {
    it('should render expected JSX', () => {
        snapshots(
            <LoadPageError/>
        );
    });

    it('should render expected JSX with debug error message', () => {
        snapshots(
            <LoadPageError
                debugMessage="foo\nbar"
            />
        );
    });
});
