import React from 'react';
import { shallow, render } from 'enzyme';
import { IntlProvider } from 'react-intl';
import BuildStatus, { statusDisplay } from '../index';

const snapshots = (jsx) => {
    expect(shallow(jsx)).toMatchSnapshot();
    expect(render(
        <IntlProvider locale="en" initialNow={1500000100000}>{jsx}</IntlProvider>
    )).toMatchSnapshot();
};

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
