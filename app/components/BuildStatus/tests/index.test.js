import React from 'react';
import { snapshots } from '../../../../internals/testing/snapshot-util';
import BuildStatus, { statusDisplay } from '../index';

describe('<BuildStatus />', () => {

    it('should have expected statuses for statusDisplay', () => {
        expect(Object.keys(statusDisplay).sort())
            .toEqual([
                '',
                'IN_PROGRESS',
                'WAITING_FOR_DEPENDENCY',
                'BUILD_NOTFOUND',
                'SUCCEEDED',
                'DEPENDENCY_FAILED',
                'START_CODEBUILD_FAILED',
                'STARTING',
                'FAILED',
                'FAULT',
                'STOPPED',
                'TIMED_OUT',
                'SKIPPED',
            ].sort());
    });

    for (const status of Object.keys(statusDisplay)) {
        it(`should render expected JSX for status ${JSON.stringify(status)}`, () => {
            snapshots(
                <BuildStatus status={status}/>,
            );
        });
    }

    it('should render expected JSX for unknown status', () => {
        snapshots(
            <BuildStatus status="foobar"/>,
        );

        snapshots(
            <BuildStatus/>,
        );
    });

});
