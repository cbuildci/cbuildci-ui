/**
 * LoginModal
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import {
    selectLoggingIn,
    selectLoginUrl,
} from './selectors';

export class LoginModal extends React.Component {

    static propTypes = {
        loginUrl: PropTypes.string.isRequired,
        githubHost: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            show: false,
        };

        this.buttonRef = React.createRef();
    }

    state = {
        show: false,
    };

    componentDidMount() {
        this.buttonRef.current.focus();

        this._showTimeoutId = setTimeout(() => {
            this.setState({
                show: true,
            });
        }, 10);
    }

    componentWillUnmount() {
        clearTimeout(this._showTimeoutId);
    }

    render() {
        const { loginUrl, githubHost } = this.props;
        const { show } = this.state;

        return (
            <React.Fragment>
                <div
                    className={`modal fade ${show ? 'show' : ''}`}
                    id="loginModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="loginModalLabel"
                    aria-hidden="true"
                    style={{ display: 'block' }}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="loginModalLabel">
                                    <FormattedMessage {...messages.loginModalTitle}/>
                                </h5>
                            </div>
                            <div className="modal-body">
                                <FormattedMessage
                                    {...messages.loginModalBody}
                                    values={{
                                        githubHost: <strong>{githubHost}</strong>,
                                        appHost: <strong>{window.location.hostname}</strong>,
                                    }}
                                />
                            </div>
                            <div className="modal-footer">
                                <a href={`${loginUrl}?returnTo=${encodeURIComponent(window.location.href)}`} className="btn btn-success" ref={this.buttonRef}>
                                    <FormattedMessage
                                        {...messages.loginModalButton}
                                        values={{
                                            githubHost,
                                        }}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`modal-backdrop fade ${show ? 'show' : ''}`}/>
            </React.Fragment>
        );
    }
}

function LoginModalContaner({ loggingIn, ...props }) {
    return loggingIn
        ? <LoginModal {...props} githubHost="github.com" />
        : null;
}

LoginModalContaner.propTypes = {
    loggingIn: PropTypes.bool,
};

LoginModalContaner.defaultProps = {
    loggingIn: false,
};

const mapStateToProps = createStructuredSelector({
    loggingIn: selectLoggingIn,
    loginUrl: selectLoginUrl,
});

export default connect(
    mapStateToProps,
)(LoginModalContaner);
