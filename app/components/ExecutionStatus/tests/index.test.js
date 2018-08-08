import React from 'react';
import { snapshots } from '../../../../internals/testing/snapshot-util';
import ExecutionStatus, { statusDisplay } from '../index';

describe('<ExecutionStatus />', () => {

    it('should have expected statuses for statusDisplay', () => {
        expect(Object.keys(statusDisplay).sort())
            .toEqual([
                '',
                'SUCCEEDED',
                'QUEUED',
                'IN_PROGRESS',
                'ERROR',
                'FAILED',
                'TIMED_OUT',
                'STOPPED',
                'NEUTRAL',
            ].sort());
    });

    for (const status of Object.keys(statusDisplay)) {
        it(`should render expected JSX for status ${JSON.stringify(status)}`, () => {
            snapshots(
                <ExecutionStatus status={status}/>,
            );
        });
    }

    it('should render expected JSX for unknown status', () => {
        snapshots(
            <ExecutionStatus status="foobar"/>,
        );

        snapshots(
            <ExecutionStatus/>,
        );
    });

});
