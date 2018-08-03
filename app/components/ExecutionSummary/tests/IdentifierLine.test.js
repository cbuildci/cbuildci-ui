import React from 'react';
import { shallow, render } from 'enzyme';
import { IntlProvider } from 'react-intl';
import IdentifierLine from '../IdentifierLine';

const snapshots = (jsx) => {
    expect(shallow(jsx)).toMatchSnapshot();
    expect(render(
        <IntlProvider locale="en" initialNow={1500000100000}>{jsx}</IntlProvider>
    )).toMatchSnapshot();
};

describe('<IdentifierLine/>', () => {
    it('should render expected JSX', () => {
        snapshots(
            <IdentifierLine
                githubHost="git.com"
                owner="foo"
                repo="bar"
                commit="edd98b1508f303eabaa12464f1dbb8ec5aace9de"
                executionNum={5}
            />
        );
    });
});
