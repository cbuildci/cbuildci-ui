/**
 * TopNav
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import messages from './messages';

import {
    selectGithubUrl,
    selectUserName,
    selectUserLogin,
} from 'containers/App/selectors';

const DropdownBG = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
`;

export class TopNav extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleToggleNavi = this.handleToggleNavi.bind(this);
        this.handleToggleUserDropdown = this.handleToggleUserDropdown.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    state = {
        showNavi: false,
        showUserDropdown: false,
    };

    handleToggleNavi() {
        this.setState({
            showNavi: !this.state.showNavi,
        });
    }

    handleToggleUserDropdown(evt) {
        evt.preventDefault();

        this.setState({
            showUserDropdown: !this.state.showUserDropdown,
        });
    }

    handleLogOut(evt) {
        evt.preventDefault();
        window.location = `/api/v1/auth/logout?redirect=${encodeURIComponent(`${window.location.origin}/app`)}`;
    }

    render() {
        const {
            githubUrl,
            userName,
            userLogin,
        } = this.props;

        const {
            showNavi,
            showUserDropdown,
        } = this.state;

        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                    <Link className="navbar-brand flex-shrink-0" to="/">
                        <FormattedMessage {...messages.brand}/>
                    </Link>

                    <button
                        className="navbar-toggler"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={this.handleToggleNavi}
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className={`collapse navbar-collapse flex-grow-1 ${showNavi ? 'show' : ''}`} id="navbarSupportedContent">
                        <div className="navbar-nav flex-grow-1">
                            <div className="nav-item">
                                <Link className="nav-link" to="/">
                                    <FormattedMessage {...messages.linkHome}/>
                                </Link>
                            </div>

                            <div className="nav-item">
                                <Link className="nav-link" to="/repos">
                                    <FormattedMessage {...messages.linkRepos}/>
                                </Link>
                            </div>

                            <div className="nav-item mr-auto">
                                <Link className="nav-link active" to="/executions">
                                    <FormattedMessage {...messages.linkExecutions}/>
                                    <span className="sr-only">(current)</span></Link>
                            </div>

                            <div className="mr-md-auto"/>

                            {userName && (
                                <div className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        onClick={this.handleToggleUserDropdown}
                                        style={{ paddingTop: '5px', paddingBottom: '5px' }}
                                    >
                                        <img src={`${githubUrl}/${userLogin}.png?size=90`} width="30" height="30" style={{ borderRadius: '4px' }}/>
                                    </a>

                                    {showUserDropdown && (
                                        <div className="dropdown-menu dropdown-menu-right mt-0 show" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href={`${githubUrl}/${userLogin}`}>
                                                <span className="text-muted"><FormattedMessage {...messages.loggedInAs}/></span><br/>
                                                <strong>{userName}</strong><br/>
                                                <span>{userLogin}</span>
                                            </a>
                                            <div className="dropdown-divider"/>
                                            <a className="dropdown-item" href="#" onClick={this.handleLogOut}>Log Out</a>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
                {showUserDropdown && (
                    <DropdownBG onClick={this.handleToggleUserDropdown}/>
                )}
            </React.Fragment>
        );
    }
}

TopNav.propTypes = {
    githubUrl: PropTypes.string,
    userName: PropTypes.string,
    userLogin: PropTypes.string,
};

TopNav.defaultProps = {
    githubUrl: null,
    userName: null,
    userLogin: null,
};

function mapStateToProps(state) {
    return {
        githubUrl: selectGithubUrl(state),
        userName: selectUserName(state),
        userLogin: selectUserLogin(state),
    };
}

export default connect(mapStateToProps)(TopNav);
