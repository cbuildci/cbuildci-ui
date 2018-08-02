import React from 'react';
import { shallow, render } from 'enzyme';
import { IntlProvider } from 'react-intl';
import StartLine from '../StartLine';

describe('<StartLine/>', () => {
    it('should render expected JSX with just the create time', () => {
        const jsx = (
            <StartLine
                githubHost="git.com"
                owner="foo"
                repo="bar"
                createTime={1500000000000}
            />
        );

        expect(shallow(jsx)).toMatchSnapshot();
        expect(render(
            <IntlProvider locale="en" initialNow={1500000100000}>{jsx}</IntlProvider>
        )).toMatchSnapshot();
    });

    it('should render expected JSX for "opened" pull request event', () => {
        const jsx = (
            <StartLine
                githubHost="git.com"
                owner="foo"
                repo="bar"
                createTime={1500000000000}
                event={{
                    event: 'pull_request',
                    action: 'opened',
                    pull_request: {
                        number: 5,
                    },
                }}
            />
        );

        expect(shallow(jsx)).toMatchSnapshot();
        expect(render(
            <IntlProvider locale="en" initialNow={1500000100000}>{jsx}</IntlProvider>
        )).toMatchSnapshot();
    });

    it('should render expected JSX for "synchronize" pull request event', () => {
        const jsx = (
            <StartLine
                githubHost="git.com"
                owner="foo"
                repo="bar"
                createTime={1500000000000}
                event={{
                    event: 'pull_request',
                    action: 'synchronize',
                    pull_request: {
                        number: 5,
                    },
                }}
            />
        );

        expect(shallow(jsx)).toMatchSnapshot();
        expect(render(
            <IntlProvider locale="en" initialNow={1500000100000}>{jsx}</IntlProvider>
        )).toMatchSnapshot();
    });
});
