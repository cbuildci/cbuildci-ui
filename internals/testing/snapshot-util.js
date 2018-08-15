import React from 'react';
import { render, shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

export const NOW = 1500000000000;
export const AGO_1_MINUTE = 1500000000000 - 60 * 1000;
export const AGO_10_MINUTE = 1500000000000 - 10 * 60 * 1000;
export const AGO_1_HOUR = 1500000000000 - 60 * 60 * 1000;
export const AGO_1_DAY = 1500000000000 - 24 * 60 * 60 * 1000;

export function shallowSnapshot(jsx) {
    expect(shallow(jsx)).toMatchSnapshot();
}

export function renderSnapshot(jsx, {
    intlProvider = true,
    memoryRouter = false,
    initialNow = NOW,
} = {}) {
    if (intlProvider) {
        jsx = (
            <IntlProvider locale="en" initialNow={initialNow}>
                {jsx}
            </IntlProvider>
        );
    }

    if (memoryRouter) {
        jsx = (
            <MemoryRouter>
                {jsx}
            </MemoryRouter>
        );
    }

    expect(render(jsx)).toMatchSnapshot();
}

export function snapshots(jsx, options) {
    shallowSnapshot(jsx);
    renderSnapshot(jsx, options);
}
