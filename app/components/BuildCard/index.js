/**
 * BuildCard
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { getDateTime } from 'utils/date';
import { PHASE_TYPES } from 'utils/constants';
import TimeDuration from 'components/TimeDuration';
import BuildStatus from 'components/BuildStatus';
import { getStatusIcon, getStatusColor } from 'components/PhaseStatus';
import messages from './messages';

const Card = styled(Link)`
    display: block;
    width: 250px;
    margin: 8px;
    padding: 3px;
    background-color: #fff;
    background-clip: border-box;
    border: 3px solid #CCC;
    cursor: pointer;
    text-decoration: none !important;
`;

const CardTitle = styled.div`
    display: block;
    text-align: center;
    padding: .5rem;
    overflow: hidden;
    font-size: 1.1rem;
    text-overflow: ellipsis;
    background-color: #EEE;
    
    ${Card}:hover & {
        text-decoration: underline;    
    }
`;

const CardStatus = styled.div`
    text-align: center;
    margin: .5rem;
`;

const CardBody = styled.div`
    text-align: center;
    margin: .5rem;
    color: #6c757d;
    font-size: .85rem;
`;

const CardProgress = styled.div`
    display: flex;
    opacity: 0.6;
    
    ${Card}:hover & {
        opacity: 1;    
    }
`;

const CardProgressBar = styled.div`
    position: relative;
    width: 10%;
    border-left: 1px solid white;
    text-align: center;
    background-color: ${(props) => props.color};
    
    :first-child {
        border-left-width: 0;
    }

    i {
        color: rgba(255, 255, 255, 0.75);
        font-size: .8rem;
    }
`;

function BuildCard({
    owner,
    repo,
    commit,
    executionNum,
    executionCreateTime,
    executionUpdateTime,
    buildKey,
    status,
    waitingForDeps,
    startTime,
    endTime,
    currentPhase,
    phases,
}) {
    const phaseStatusesMap = {};

    // Normalize datetime values.
    executionCreateTime = getDateTime(executionCreateTime);
    executionUpdateTime = getDateTime(executionUpdateTime);
    startTime = getDateTime(startTime);
    endTime = getDateTime(endTime);

    if (phases) {
        for (const phase of phases) {
            phaseStatusesMap[phase.phaseType] =
                phase.phaseType === 'COMPLETED'
                    ? 'SUCCEEDED'
                    : phase.phaseStatus
                        ? phase.phaseStatus
                        : currentPhase && phase.phaseType === currentPhase ? 'IN_PROGRESS' : phase.phaseStatus;
        }
    }

    let bodyLine1Html = <span>&nbsp;</span>;
    let bodyLine2Html = <span>&nbsp;</span>;

    if (startTime != null) {
        bodyLine1Html = (
            <FormattedMessage
                {...messages.started}
                values={{
                    durationHtml: (
                        <strong>
                            <TimeDuration
                                seconds={Math.round((startTime - executionCreateTime) / 1000)}
                            />
                        </strong>
                    ),
                }}
            />
        );

        bodyLine2Html = (
            <FormattedMessage
                {...(endTime ? messages.ended : messages.running)}
                values={{
                    durationHtml: (
                        <strong>
                            <TimeDuration
                                seconds={Math.round(((endTime || executionUpdateTime) - startTime) / 1000)}
                            />
                        </strong>
                    ),
                }}
            />
        );
    }
    else if (status === 'WAITING_FOR_DEPENDENCY' && waitingForDeps) {
        if (waitingForDeps.length) {
            bodyLine1Html = waitingForDeps[0];
        }

        if (waitingForDeps.length === 2) {
            bodyLine2Html = waitingForDeps[1];
        }
        else if (waitingForDeps.length > 2) {
            bodyLine2Html = (
                <em>
                    <FormattedMessage
                        {...messages.extraDeps}
                        values={{ count: waitingForDeps.length - 1 }}
                    />
                </em>
            );
        }
    }

    return (
        <Card to={`/repo/${owner}/${repo}/commit/${commit}/exec/${executionNum}/build/${buildKey}`}>
            <CardTitle>{buildKey}</CardTitle>
            <CardStatus><BuildStatus status={status}/></CardStatus>
            <CardBody>
                <div>{bodyLine1Html}</div>
                <div>{bodyLine2Html}</div>
            </CardBody>
            <CardProgress>
                {PHASE_TYPES.map((phaseType) => {
                    return (
                        <CardProgressBar
                            key={phaseType}
                            color={phaseStatusesMap[phaseType] ? getStatusColor(phaseStatusesMap[phaseType]) : '#EEE'}
                        >
                            <i className={phaseStatusesMap[phaseType] ? getStatusIcon(phaseStatusesMap[phaseType]) : 'fas fa-none'}/>
                        </CardProgressBar>
                    );
                })}
            </CardProgress>
        </Card>
    );
}

BuildCard.propTypes = {
    owner: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    commit: PropTypes.string.isRequired,
    executionNum: PropTypes.number.isRequired,
    executionCreateTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]).isRequired,
    executionUpdateTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]).isRequired,
    buildKey: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    waitingForDeps: PropTypes.arrayOf(PropTypes.string),
    startTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    endTime: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    currentPhase: PropTypes.string,
    phases: PropTypes.arrayOf(PropTypes.object),
};

BuildCard.defaultProps = {
    startTime: null,
    endTime: null,
    phases: null,
};

export default BuildCard;
