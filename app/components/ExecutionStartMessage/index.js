/*
 * ExecutionStartMessage
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import Time from 'components/Time';
import messages from './messages';

function ExecutionStartMessage({
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
        values.eventType = event.type;

        if (event.type === 'pull_request') {
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
        else if (event.type === 'check_run'
            && event.action === 'requested_action'
            && typeof event.requested_action.identifier === 'string') {

            message = messages.startedByUserAction;

            values.username = event.sender.login;
            values.usernameHtml = (
                <a href={`https://${githubHost}/${event.sender.login}`}>{event.sender.login}</a>
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

ExecutionStartMessage.propTypes = {
    githubHost: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    createTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]).isRequired,
    event: PropTypes.object,
};

ExecutionStartMessage.defaultProps = {
    event: null,
};

export default ExecutionStartMessage;
