/**
 * PhasesTable
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import TimeDuration from 'components/TimeDuration';
import PhaseStatus from '../PhaseStatus';

function PhasesTable({ phases }) {
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
                {phases.map((phase) => {
                    return (
                        <React.Fragment key={phase.phaseType}>
                            <tr>
                                <th>{phase.phaseType}</th>
                                <td><PhaseStatus status={phase.phaseType === 'COMPLETED' ? 'SUCCEEDED' : phase.phaseStatus}/></td>
                                <td>{typeof phase.durationInSeconds === 'number' && <TimeDuration seconds={phase.durationInSeconds}/>}</td>
                            </tr>
                            {phase.contexts && phase.contexts.length > 0 && (
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
    phases: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PhasesTable;
