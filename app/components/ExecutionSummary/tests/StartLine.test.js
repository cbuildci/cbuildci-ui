import React from 'react';
import { shallow, render } from 'enzyme';
import { IntlProvider } from 'react-intl';
import StartLine from '../StartLine';

const snapshots = (jsx) => {
    expect(shallow(jsx)).toMatchSnapshot();
    expect(render(
        <IntlProvider locale="en" initialNow={1500000100000}>{jsx}</IntlProvider>
    )).toMatchSnapshot();
};

describe('<StartLine/>', () => {
    it('should render expected JSX with just the create time', () => {
        snapshots(
            <StartLine
                githubHost="git.com"
                owner="foo"
                repo="bar"
                createTime={1500000000000}
            />,
        );
    });

    it('should render expected JSX for "opened" pull request event', () => {
        snapshots(
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
            />,
        );
    });

    it('should render expected JSX for "synchronize" pull request event', () => {
        snapshots(
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
            />,
        );
    });
});
