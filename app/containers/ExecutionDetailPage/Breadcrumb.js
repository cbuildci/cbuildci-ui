/**
 * Breadcrumb
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Breadcrumb({
    owner,
    repo,
    commit,
    executionNum,
    buildKey,
}) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">
                    Executions
                </a></li>
                <li className="breadcrumb-item">
                    <Link to={`/repo/${owner}/${repo}`}>
                        <i className="fab fa-github fa-fw mr-1"/>
                        {owner}/{repo}
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/repo/${owner}/${repo}/commit/${commit}`}>
                        <i className="fas fa-code-branch fa-fw mr-1"/>
                        {commit.substr(0, 10)}
                    </Link>
                </li>
                {buildKey == null && (
                    <li className="breadcrumb-item active" aria-current="page">
                        <i className="fas fa-shipping-fast fa-fw mr-1"/>
                        #{executionNum}
                    </li>
                )}
                {buildKey != null && (
                    <React.Fragment>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/repo/${owner}/${repo}/commit/${commit}/exec/${executionNum}`}>
                                <i className="fas fa-shipping-fast fa-fw mr-1"/>
                                #{executionNum}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {buildKey}
                        </li>
                    </React.Fragment>
                )}
            </ol>
        </nav>
    );
}

Breadcrumb.propTypes = {
    owner: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    commit: PropTypes.string.isRequired,
    executionNum: PropTypes.number.isRequired,
    buildKey: PropTypes.string,
};

Breadcrumb.defaultProps = {
    buildKey: null,
};

export default Breadcrumb;
