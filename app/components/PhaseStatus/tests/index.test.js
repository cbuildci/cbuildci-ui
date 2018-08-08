import React from 'react';
import { snapshots } from '../../../../internals/testing/snapshot-util';
import PhaseStatus, { statusDisplay } from '../index';

describe('<PhaseStatus />', () => {
    it('should have expected statuses for statusDisplay', () => {
        expect(Object.keys(statusDisplay).sort())
            .toEqual([
                '',
                'SUCCEEDED',
                'FAILED',
                'FAULT',
                'TIMED_OUT',
                'IN_PROGRESS',
                'STOPPED',
            ].sort());
    });

    for (const status of Object.keys(statusDisplay)) {
        it(`should render expected JSX for status ${JSON.stringify(status)}`, () => {
            snapshots(
                <PhaseStatus status={status}/>,
            );
        });
    }

    it('should render expected JSX for unknown status', () => {
        snapshots(
            <PhaseStatus status="foobar"/>,
        );

        snapshots(
            <PhaseStatus/>,
        );
    });

});
