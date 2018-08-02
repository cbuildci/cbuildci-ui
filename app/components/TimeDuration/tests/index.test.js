import React from 'react';
import { shallow, render } from 'enzyme';
import { IntlProvider } from 'react-intl';
import TimeDuration from '../index';

const snapshots = (jsx) => {
    expect(shallow(jsx)).toMatchSnapshot();
    expect(render(
        <IntlProvider locale="en" initialNow={1500000100000}>{jsx}</IntlProvider>
    )).toMatchSnapshot();
};

describe('<TimeDuration />', () => {
    it('Should render expected JSX', () => {
        snapshots(
            <TimeDuration seconds={0}/>
        );

        snapshots(
            <TimeDuration seconds={59}/>
        );

        // 1 Minute
        snapshots(
            <TimeDuration seconds={60}/>
        );

        snapshots(
            <TimeDuration seconds={3599}/>
        );

        // 1 Hour
        snapshots(
            <TimeDuration seconds={3600}/>
        );

        snapshots(
            <TimeDuration seconds={86399}/>
        );

        // 1 Day
        snapshots(
            <TimeDuration seconds={86400}/>
        );

        snapshots(
            <TimeDuration seconds={604799}/>
        );

        // 1 Week
        snapshots(
            <TimeDuration seconds={604800}/>
        );

        snapshots(
            <TimeDuration seconds={3941999}/>
        );

        // ~1.5 Months (365 / 12 * 1.5)
        snapshots(
            <TimeDuration seconds={3942000}/>
        );

        // ~5 Months
        snapshots(
            <TimeDuration seconds={19710000}/>
        );

        snapshots(
            <TimeDuration seconds={31535999}/>
        );

        // 1 Year
        snapshots(
            <TimeDuration seconds={31536000}/>
        );

        // 10 Years
        snapshots(
            <TimeDuration seconds={315360000}/>
        );
    });
});
