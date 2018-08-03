import React from 'react';
import { shallow, render } from 'enzyme';
import { IntlProvider } from 'react-intl';
import StopLine from '../StopLine';

const snapshots = (jsx) => {
    expect(shallow(jsx)).toMatchSnapshot();
    expect(render(
        <IntlProvider locale="en" initialNow={1500000100000}>{jsx}</IntlProvider>
    )).toMatchSnapshot();
};

describe('<StopLine/>', () => {
    it('should render expected JSX when has concluded', () => {
        snapshots(
            <StopLine
                githubHost="git.com"
                createTime={1500000000000}
                conclusionTime={1500000200000}
            />
        );
    });

    it('should render expected JSX when user requests stop', () => {
        snapshots(
            <StopLine
                githubHost="git.com"
                createTime={1500000000000}
                stopUser="foo"
                stopRequestTime={1500000100000}
            />
        );
    });

    it('should render expected JSX when user requests stop and has concluded', () => {
        snapshots(
            <StopLine
                githubHost="git.com"
                createTime={1500000000000}
                stopUser="foo"
                stopRequestTime={1500000100000}
                conclusionTime={1500000200000}
            />
        );
    });
});
