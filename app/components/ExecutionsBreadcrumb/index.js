/*
 * ExecutionsBreadcrumb
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import messages from './messages';

function ExecutionsBreadcrumb({
    owner,
    repo,
    commit,
    executionNum,
    buildKey,
}) {
    let commitHtml = null;
    let executionNumHtml = null;
    let buildKeyHtml = null;

    if (commit != null) {
        if (executionNum == null) {
            commitHtml = (
                <li className="breadcrumb-item active">
                    <i className="fas fa-code-branch fa-fw mr-1"/>
                    {commit.substr(0, 10)}
                </li>
            );
        }
        else {
            commitHtml = (
                <li className="breadcrumb-item">
                    <Link to={`/repo/${owner}/${repo}/commit/${commit}`}>
                        <i className="fas fa-code-branch fa-fw mr-1"/>
                        {commit.substr(0, 10)}
                    </Link>
                </li>
            );
        }
    }

    if (executionNum != null) {
        if (buildKey == null) {
            executionNumHtml = (
                <li className="breadcrumb-item active" aria-current="page">
                    <i className="fas fa-shipping-fast fa-fw mr-1"/>
                    #{executionNum}
                </li>
            );
        }
        else {
            executionNumHtml = (
                <li className="breadcrumb-item" aria-current="page">
                    <Link to={`/repo/${owner}/${repo}/commit/${commit}/exec/${executionNum}`}>
                        <i className="fas fa-shipping-fast fa-fw mr-1"/>
                        #{executionNum}
                    </Link>
                </li>
            );
        }
    }

    if (buildKey != null) {
        buildKeyHtml = (
            <li className="breadcrumb-item active" aria-current="page">
                {buildKey}
            </li>
        );
    }

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">
                    <FormattedMessage {...messages.executionsLink}/>
                </a></li>
                <li className="breadcrumb-item">
                    <Link to={`/repo/${owner}/${repo}`}>
                        <i className="fab fa-github fa-fw mr-1"/>
                        {owner}/{repo}
                    </Link>
                </li>
                {commitHtml}
                {executionNumHtml}
                {buildKeyHtml}
            </ol>
        </nav>
    );
}

ExecutionsBreadcrumb.propTypes = {
    owner: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    commit: PropTypes.string,
    executionNum: PropTypes.number,
    buildKey: PropTypes.string,
};

ExecutionsBreadcrumb.defaultProps = {
    commit: null,
    executionNum: null,
    buildKey: null,
};

export default ExecutionsBreadcrumb;
