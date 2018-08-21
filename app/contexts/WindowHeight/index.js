import React from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = React.createContext();

export const WindowHeightConsumer = Consumer;

export class WindowHeightProvider extends React.Component {

    constructor(props) {
        super(props);
        this.handleResize = this.handleResize.bind(this);
    }

    state = {
        height: this.getWindowHeight(),
    };

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
        const height = this.getWindowHeight();
        if (this.state.height !== height) {
            this.setState({
                height: this.getWindowHeight(),
            });
        }
    }

    getWindowHeight() {
        return Math.max(
            document.documentElement.clientHeight || 0,
            window.innerHeight || 0,
            0,
        );
    }

    render() {
        return (
            <Provider value={this.state.height}>
                {this.props.children}
            </Provider>
        );
    }
}

WindowHeightProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
