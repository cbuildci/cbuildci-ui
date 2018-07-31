import React from 'react';
import { shallow } from 'enzyme';
import PhaseStatus, { statusDisplay } from '../index';

describe('<PhaseStatus />', () => {
    it('should have expected statuses for statusDisplay', () => {
        expect(Object.keys(statusDisplay).sort())
            .toEqual([
                'SUCCEEDED',
                'FAILED',
                'FAULT',
                'TIMED_OUT',
                'IN_PROGRESS',
                'STOPPED',
            ].sort());
    });

    it('should render expected JSX for statuses', () => {
        for (const status of Object.keys(statusDisplay)) {
            expect(shallow(
                <PhaseStatus status={status}/>,
            )).toMatchSnapshot();
        }
    });

    it('should render expected JSX for unknown status', () => {
        expect(shallow(
            <PhaseStatus status="foobar"/>,
        )).toMatchSnapshot();

        expect(shallow(
            <PhaseStatus/>,
        )).toMatchSnapshot();
    });

});
