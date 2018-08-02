import React from 'react';
import { shallow, render } from 'enzyme';
import { IntlProvider } from 'react-intl';
import PhaseStatus, { statusDisplay } from '../index';

const snapshots = (jsx) => {
    expect(shallow(jsx)).toMatchSnapshot();
    expect(render(
        <IntlProvider locale="en" initialNow={1500000100000}>{jsx}</IntlProvider>
    )).toMatchSnapshot();
};

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
