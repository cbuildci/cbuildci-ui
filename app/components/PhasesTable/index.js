/**
 * PhasesTable
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import TimeDuration from 'components/TimeDuration';
import PhaseStatus from '../PhaseStatus';
import { PHASE_TYPES } from '../../utils/constants';

function PhasesTable({ phases }) {
    const phaseMap = {};

    if (phases) {
        for (const phase of phases) {
            phaseMap[phase.phaseType] = phase;
        }
    }

    return (
        <table className="table table-md w-auto">
            <thead className="thead-light">
                <tr>
                    <th><FormattedMessage {...messages.headerPhase}/></th>
                    <th><FormattedMessage {...messages.headerStatus}/></th>
                    <th><FormattedMessage {...messages.headerDuration}/></th>
                </tr>
            </thead>
            <tbody>
                {PHASE_TYPES.map((phaseType) => {
                    const phase = phaseMap[phaseType];
                    return (
                        <React.Fragment key={phaseType}>
                            <tr>
                                <th>{phaseType}</th>
                                <td>{phase ? <PhaseStatus status={phaseType === 'COMPLETED' ? 'SUCCEEDED' : phase.phaseStatus}/> : '-'}</td>
                                <td>{phase && typeof phase.durationInSeconds === 'number' ? <TimeDuration seconds={phase.durationInSeconds}/> : '-'}</td>
                            </tr>
                            {phase && phase.contexts && phase.contexts.length > 0 && (
                                <React.Fragment>
                                    {phase.contexts.map((context, i) => (
                                        <tr key={i}>
                                            <td colSpan="3">{context.message}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    );
                })}
            </tbody>
        </table>
    );
}

PhasesTable.propTypes = {
    phases: PropTypes.arrayOf(PropTypes.object),
};

PhasesTable.defaultProps = {
    phases: null,
};

export default PhasesTable;
