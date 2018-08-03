/**
 * IdentifierLine
 */

import React from 'react';
import PropTypes from 'prop-types';

function IdentifierLine({
    githubHost,
    owner,
    repo,
    commit,
    executionNum,
}) {
    const urlPrefix = githubHost
        ? `https://${githubHost}/`
        : '/app/repo/';

    return (
        <span className="d-inline-flex flex-wrap">
            <span className="mr-2">
                <i className="fab fa-github fa-fw text-muted mr-1"/>
                <a href={`${urlPrefix}${owner}/${repo}`}>{owner}/{repo}</a>
            </span>

            <span className="mr-2">
                <i className="fas fa-code-branch fa-fw text-muted mr-1"/>
                <a href={`${urlPrefix}${owner}/${repo}/commit/${commit}`}>{commit.substr(0, 10)}</a>
            </span>

            <span className="mr-2">
                <i className="fas fa-shipping-fast fa-fw text-muted mr-1"/>
                #{executionNum}
            </span>
        </span>
    );
}

IdentifierLine.propTypes = {
    githubHost: PropTypes.string,
    owner: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    commit: PropTypes.string.isRequired,
    executionNum: PropTypes.number.isRequired,
};

IdentifierLine.defaultProps = {
    githubHost: null,
};

export default IdentifierLine;
