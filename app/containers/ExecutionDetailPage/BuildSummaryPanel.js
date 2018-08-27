/**
 * BuildSummaryPanel
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { PHASE_TYPES } from 'utils/constants';
import { Panel, PanelHeaderMini } from 'components/Panel';
import ErrorBoundary from 'components/ErrorBoundary';
import BuildSummary from 'components/BuildSummary';
import { getStatusIcon, getStatusColor } from 'components/PhaseStatus';

const lineRenderError = <span><em>(Render Error)</em></span>;

const BuildTitle = styled.div`
    font-size: 1.5rem;
    margin-bottom: 6px;
`;

const CardProgress = styled.div`
    display: flex;
`;

const CardProgressBar = styled.div`
    position: relative;
    border-left: 1px solid white;
    text-align: center;
    background-color: ${(props) => props.color};
    padding: 2px 0;
    color: white;
    overflow: hidden;
    flex-grow: 1;
    
    ${({ active }) => active && css`
        padding-left: 8px;
        padding-right: 8px;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex-shrink: 0;
    `}
    
    :first-child {
        border-left-width: 0;
    }

    i {
        color: rgba(255, 255, 255, 0.75);
        font-size: .8rem;
        width: 20px;
    }
    
    span {
        margin-left: 8px;
    }
`;

function BuildSummaryPanel({
    executionCreateTime,
    executionUpdateTime,
    buildState,
}) {
    const phaseStatusesMap = {};
    const currentPhase = buildState.codeBuild && buildState.codeBuild.currentPhase;

    if (buildState.codeBuild && buildState.codeBuild.phases) {
        for (const phase of buildState.codeBuild.phases) {
            phaseStatusesMap[phase.phaseType] =
                phase.phaseType === 'COMPLETED'
                    ? 'SUCCEEDED'
                    : phase.phaseStatus
                        ? phase.phaseStatus
                        : phase.phaseType === currentPhase ? 'IN_PROGRESS' : phase.phaseStatus;
        }
    }

    return (
        <Panel>
            <PanelHeaderMini>
                BUILD DETAIL
            </PanelHeaderMini>

            <BuildTitle>{buildState.buildKey}</BuildTitle>

            <ErrorBoundary errorMessage={lineRenderError}>
                <BuildSummary
                    executionCreateTime={executionCreateTime}
                    executionUpdateTime={executionUpdateTime}
                    buildState={buildState}
                />
            </ErrorBoundary>

            <ErrorBoundary errorMessage={lineRenderError}>
                <div className="mt-2">
                    <CardProgress>
                        {PHASE_TYPES.map((phaseType) => {
                            return (
                                <CardProgressBar
                                    key={phaseType}
                                    color={phaseStatusesMap[phaseType] ? getStatusColor(phaseStatusesMap[phaseType]) : '#EEE'}
                                    active={phaseType === currentPhase}
                                >
                                    <i className={phaseStatusesMap[phaseType] ? getStatusIcon(phaseStatusesMap[phaseType]) : 'fas fa-none'}/>
                                    {phaseType === currentPhase && <span>{phaseType}</span>}
                                </CardProgressBar>
                            );
                        })}
                    </CardProgress>
                </div>
            </ErrorBoundary>
        </Panel>
    );
}

BuildSummaryPanel.propTypes = {
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
    buildState: PropTypes.object.isRequired,
};

export default BuildSummaryPanel;
