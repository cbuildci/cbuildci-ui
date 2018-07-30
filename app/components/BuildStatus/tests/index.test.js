import React from 'react';
import { shallow } from 'enzyme';
import BuildStatus, { statusDisplay } from '../index';

describe('<BuildStatus />', () => {

    it('should have expected statuses for statusDisplay', () => {
        expect(Object.keys(statusDisplay).sort())
            .toEqual([
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

    it('should render expected JSX for statuses', () => {
        for (const status of Object.keys(statusDisplay)) {
            expect(shallow(
                <BuildStatus status={status}/>,
            )).toMatchSnapshot();
        }
    });

    it('should render expected JSX for unknown status', () => {
        expect(shallow(
            <BuildStatus status="foobar"/>,
        )).toMatchSnapshot();

        expect(shallow(
            <BuildStatus/>,
        )).toMatchSnapshot();
    });

});
