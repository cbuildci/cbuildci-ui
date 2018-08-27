/*
 * CommitMeta
 */

import React from 'react';
import PropTypes from 'prop-types';

function CommitMeta({
    githubHost,
    message,
    author,
}) {
    return (
        <div>
            {author.login && (
                <span className="mr-1" style={{ lineHeight: '22px' }}>
                    <img
                        src={`https://github.com/${author.login}.png`}
                        width="20"
                        height="20"
                        style={{ marginTop: '-2px', borderRadius: '4px' }}
                    />
                </span>
            )}
            <span className="mr-2 flex-shrink-0">
                {author.login ? (
                    <a href={`https://${githubHost}/${author.login}`}>
                        {author.login}
                    </a>
                ) : (
                    <span>
                        {author.name}
                    </span>
                )}
            </span>

            <span className="mr-2 text-nowrap text-muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                – {message.substr(0, 100)}{message.length > 100 ? '…' : ''}
            </span>
        </div>
    );
}

CommitMeta.propTypes = {
    githubHost: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    author: PropTypes.object.isRequired,
};

export default CommitMeta;
