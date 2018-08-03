/**
 * StartLine
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import messages from './messages';
import Time from 'components/Time';

function StartLine({
    githubHost,
    owner,
    repo,
    createTime,
    event,
}) {
    let message = messages.startedWithoutEvent;

    const values = {
        relativeCreateTimeHtml: (
            <strong>
                <Time date={createTime}>
                    <FormattedRelative
                        value={createTime}
                        updateInterval={5000}
                    />
                </Time>
            </strong>
        ),
    };

    if (event) {
        message = messages.startedWithUnknownEvent;
        values.event = event.event;

        if (event.event === 'pull_request') {
            message = messages.startedForPullRequest;

            values.action = event.action;
            values.actionHtml = (
                <strong>
                    <FormattedMessage
                        {...messages.startedForPullRequest_action}
                        values={{ action: event.action }}
                    />
                </strong>
            );

            values.pullRequestLinkHtml = (
                <a href={`https://${githubHost}/${owner}/${repo}/pull/${event.pull_request.number}`}>
                    <FormattedMessage
                        {...messages.startedForPullRequest_link}
                        values={{ pullRequestNumber: event.pull_request.number }}
                    />
                </a>
            );
        }
        else if (event.event === 'check_run'
            && event.action === 'requested_action'
            && event.requested_action.identifier === 'rerun') {

            message = messages.startedByUserAction;

            values.username = event.sender.login;
            values.usernameHtml = (
                <a href={`https://${githubHost}/${event.sender.login}`}>@{event.sender.login}</a>
            );

            values.identifier = event.requested_action.identifier;
            values.identifierHtml = (
                <strong>
                    <FormattedMessage
                        {...messages.startedByUserAction_identifier}
                        values={{ identifier: event.requested_action.identifier }}
                    />
                </strong>
            );
        }
    }

    return (
        <FormattedMessage
            {...message}
            values={values}
        />
    );
}

StartLine.propTypes = {
    githubHost: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    createTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]).isRequired,
    conclusionTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    event: PropTypes.object,
};

StartLine.defaultProps = {
    conclusionTime: null,
    event: null,
};

export default StartLine;
