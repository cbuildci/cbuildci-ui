import React from 'react';
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ErrorBoundaryWithConsumer, { ErrorContextProvider, ErrorBoundary } from '../index';

describe('ErrorBoundary (inner)', () => {
    it('should render children if no error', () => {
        const renderedComponent = renderer
            .create((
                <ErrorBoundary>
                    <h1>Test</h1>
                </ErrorBoundary>
            ))
            .toJSON();

        expect(renderedComponent).toMatchSnapshot();
    });

    it('should catch errors and show nothing by default', async () => {
        const mockCallback = jest.fn();
        const err = new Error('foobar');

        function FailingComponent() {
            throw err;
        }

        await new Promise((resolve) => {
            function onError(...args) {
                mockCallback(...args);
                resolve();
            }

            const renderedComponent = renderer
                .create((
                    <ErrorBoundary onError={onError}>
                        <FailingComponent/>
                    </ErrorBoundary>
                ))
                .toJSON();

            expect(renderedComponent).toMatchSnapshot();
        });

        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls[0].length).toBe(2);
        expect(mockCallback.mock.calls[0][0]).toBe(err);
        expect(mockCallback.mock.calls[0][1]).toEqual({
            componentStack: '\n    in FailingComponent\n    in ErrorBoundary',
        });
    });

    it('should catch errors and show the error message (as component)', () => {
        function FailingComponent() {
            throw new Error('foobar');
        }

        const renderedComponent = renderer
            .create((
                <ErrorBoundary errorMessage={<div>Error</div>}>
                    <FailingComponent/>
                </ErrorBoundary>
            ))
            .toJSON();

        expect(renderedComponent).toMatchSnapshot();
    });

    it('should catch errors and show the error message (as function)', () => {
        const err = new Error('foobar');

        function FailingComponent() {
            throw err;
        }

        const mockErrorMessage = jest.fn(() => <div>Error</div>);

        const renderedComponent = renderer
            .create((
                <ErrorBoundary errorMessage={mockErrorMessage}>
                    <FailingComponent/>
                </ErrorBoundary>
            ))
            .toJSON();

        expect(renderedComponent).toMatchSnapshot();
        expect(mockErrorMessage.mock.calls.length).toBe(1);
        expect(mockErrorMessage.mock.calls[0].length).toBe(2);
        expect(mockErrorMessage.mock.calls[0][1]).toEqual(
            expect.objectContaining({
                componentStack: expect.any(String),
            }),
        );
    });
});

describe('ErrorContextProvider (default export) with ErrorContextProvider', () => {
    it('should call error callback provided to context provider', async () => {
        const mockCallback = jest.fn();
        const err = new Error('foobar');

        function FailingComponent() {
            throw err;
        }

        await new Promise((resolve) => {
            function onError(...args) {
                mockCallback(...args);
                resolve();
            }

            const renderedComponent = renderer
                .create((
                    <ErrorContextProvider value={onError}>
                        <ErrorBoundaryWithConsumer>
                            <FailingComponent/>
                        </ErrorBoundaryWithConsumer>
                    </ErrorContextProvider>
                ))
                .toJSON();

            expect(renderedComponent).toMatchSnapshot();
        });

        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls[0].length).toBe(2);
        expect(mockCallback.mock.calls[0][0]).toBe(err);
        expect(mockCallback.mock.calls[0][1]).toEqual({
            componentStack: '\n    in FailingComponent\n    in ErrorBoundary\n    in ErrorBoundaryWithContext',
        });
    });
});
