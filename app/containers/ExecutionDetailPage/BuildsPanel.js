/**
 * BuildsPanel
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { Panel, PanelHeaderMini } from 'components/Panel';
import ErrorBoundary from 'components/ErrorBoundary';
import BuildCard from 'components/BuildCard';
import messages from './messages';

const Cards = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: -8px;
`;

function BuildsPanel({
    execution,
}) {
    return (
        <Panel>
            <PanelHeaderMini>
                <FormattedMessage {...messages.headerBuilds}/>
            </PanelHeaderMini>
            <ErrorBoundary errorMessage={() => <div>Error</div>}>
                <Cards>
                    {Object.values(execution.state.builds)
                        .map((buildState) => (
                            <BuildCard
                                key={buildState.buildKey}
                                owner={execution.owner}
                                repo={execution.repo}
                                commit={execution.commit}
                                executionNum={execution.executionNum}
                                executionCreateTime={execution.createTime}
                                executionUpdateTime={execution.updateTime}
                                buildKey={buildState.buildKey}
                                status={buildState.status}
                                waitingForDeps={buildState.waitingForDeps}
                                startTime={buildState.codeBuild && buildState.codeBuild.startTime}
                                endTime={buildState.codeBuild && buildState.codeBuild.endTime}
                                currentPhase={buildState.codeBuild && buildState.codeBuild.currentPhase}
                                phases={buildState.codeBuild && buildState.codeBuild.phases}
                            />
                        ))}
                </Cards>
            </ErrorBoundary>
        </Panel>
    );
}

BuildsPanel.propTypes = {
    execution: PropTypes.object.isRequired,
};

export default BuildsPanel;
