import React from 'react';
import { snapshots } from '../../../../internals/testing/snapshot-util';
import RenderErrorPanel from '../index';

describe('<RenderErrorPanel />', () => {
    it.skip('should render expected JSX', () => {
        snapshots(
            <RenderErrorPanel/>,
        );
    });
});
