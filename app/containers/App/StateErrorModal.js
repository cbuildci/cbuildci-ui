/**
 * StateErrorModal
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import {
    selectIsUserLoggedIn,
    selectHasFetchedState,
    selectStateError,
} from './selectors';

import {
    stateRequest,
} from './actions';

const ErrorDetail = styled.div`
    margin-top: 1rem;
    background-color: #EEE;
    padding: 6px 12px;
    border-left: 3px solid #666;
    white-space: pre-wrap;
`;

export class StateErrorModal extends React.Component {

    static propTypes = {
        stateError: PropTypes.object.isRequired,
        onRetry: PropTypes.func.isRequired,
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
        const { stateError, onRetry } = this.props;
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
                                    <FormattedMessage {...messages.stateErrorModalTitle}/>
                                </h5>
                            </div>
                            <div className="modal-body">
                                <FormattedMessage
                                    {...messages.stateErrorModalBody}
                                    values={{}}
                                />

                                <ErrorDetail>{stateError.message}</ErrorDetail>
                            </div>
                            <div className="modal-footer">
                                <button onClick={onRetry} className="btn btn-success" ref={this.buttonRef}>
                                    <FormattedMessage {...messages.stateErrorModalButton}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`modal-backdrop fade ${show ? 'show' : ''}`}/>
            </React.Fragment>
        );
    }
}

function StateErrorModalContaner({
    isUserLoggedIn,
    hasFetchedState,
    stateError,
    ...props
}) {
    return !isUserLoggedIn && !hasFetchedState && stateError
        ? <StateErrorModal stateError={stateError} {...props} />
        : null;
}

StateErrorModalContaner.propTypes = {
    isUserLoggedIn: PropTypes.bool.isRequired,
    hasFetchedState: PropTypes.bool.isRequired,
    stateError: PropTypes.object,
};

StateErrorModalContaner.defaultProps = {
    stateError: null,
};

const mapStateToProps = createStructuredSelector({
    isUserLoggedIn: selectIsUserLoggedIn,
    hasFetchedState: selectHasFetchedState,
    stateError: selectStateError,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onRetry: stateRequest,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StateErrorModalContaner);
