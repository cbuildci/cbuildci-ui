/**
 * ErrorBoundary
 */

import React from 'react';
import PropTypes from 'prop-types';

const ErrorContext = React.createContext();

export const ErrorContextProvider = ErrorContext.Provider;
export const ErrorContextConsumer = ErrorContext.Consumer;

export class ErrorBoundary extends React.Component {

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]).isRequired,
        errorMessage: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.func,
        ]),
        onError: PropTypes.func,
    };

    static defaultProps = {
        errorMessage: null,
        onError: null,
    };

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });

        const { onError } = this.props;

        if (onError) {
            // Rethrow error so it appears in console.
            setTimeout(() => {
                onError(error, info);
            }, 1);
        }
    }

    render() {
        const {
            children,
            errorMessage,
        } = this.props;

        if (this.state.hasError) {
            return (
                typeof errorMessage === 'function'
                    ? errorMessage()
                    : errorMessage || null
            );
        }

        return children;
    }
}

export default function ErrorBoundaryWithContext({ errorMessage, children }) {
    return (
        <ErrorContext.Consumer>
            {(onError) => (
                <ErrorBoundary errorMessage={errorMessage} onError={onError}>
                    {children}
                </ErrorBoundary>
            )}
        </ErrorContext.Consumer>
    );
}

ErrorBoundaryWithContext.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    errorMessage: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func,
    ]),
};
