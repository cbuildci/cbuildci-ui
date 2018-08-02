import React from 'react';
import { shallow, render } from 'enzyme';
import StopLine from '../StopLine';
import { IntlProvider } from 'react-intl';

describe('<StopLine/>', () => {
    it('should render expected JSX when has concluded', () => {
        const jsx = (
            <StopLine
                githubHost="git.com"
                createTime={1500000000000}
                conclusionTime={1500000200000}
            />
        );

        expect(shallow(jsx)).toMatchSnapshot();
        expect(render(
            <IntlProvider locale="en" initialNow={1500000100000}>{jsx}</IntlProvider>
        )).toMatchSnapshot();
    });

    it('should render expected JSX when user requests stop', () => {
        const jsx = (
            <StopLine
                githubHost="git.com"
                createTime={1500000000000}
                stopUser="foo"
                stopRequestTime={1500000100000}
            />
        );

        expect(shallow(jsx)).toMatchSnapshot();
        expect(render(
            <IntlProvider locale="en" initialNow={1500000100000}>{jsx}</IntlProvider>
        )).toMatchSnapshot();
    });

    it('should render expected JSX when user requests stop and has concluded', () => {
        const jsx = (
            <StopLine
                githubHost="git.com"
                createTime={1500000000000}
                stopUser="foo"
                stopRequestTime={1500000100000}
                conclusionTime={1500000200000}
            />
        );

        expect(shallow(jsx)).toMatchSnapshot();
        expect(render(
            <IntlProvider locale="en" initialNow={1500000100000}>{jsx}</IntlProvider>
        )).toMatchSnapshot();
    });
});
