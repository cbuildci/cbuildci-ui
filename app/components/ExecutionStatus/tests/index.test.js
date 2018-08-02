import React from 'react';
import { shallow, render } from 'enzyme';
import { IntlProvider } from 'react-intl';
import ExecutionStatus, { statusDisplay } from '../index';

const snapshots = (jsx) => {
    expect(shallow(jsx)).toMatchSnapshot();
    expect(render(
        <IntlProvider locale="en" initialNow={1500000100000}>{jsx}</IntlProvider>
    )).toMatchSnapshot();
};

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
