/*
 * RenderErrorPanel
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from '../Panel';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

class RenderErrorPanel extends React.Component {

    constructor(props) {
        super(props);

        this.handleToggleDetail = this.handleToggleDetail.bind(this);
    }

    state = {
        showDetail: false,
    };

    handleToggleDetail() {
        this.setState({
            showDetail: !this.state.showDetail,
        });
    }

    render() {
        const { debugMessage } = this.props;
        const { showDetail } = this.state;

        return (
            <Panel bandColor="red">
                <div>
                    <FormattedMessage {...messages.bodyMessage}/>
                </div>

                {debugMessage != null && (
                    <React.Fragment>

                        <div className="mt-3">
                            <button className="btn btn-outline-danger btn-sm" onClick={this.handleToggleDetail}>
                                <FormattedMessage {...messages.detailButton}/>
                            </button>
                        </div>

                        {showDetail && (
                            <pre className="mt-3">
                                {debugMessage}
                            </pre>
                        )}

                    </React.Fragment>
                )}
            </Panel>
        );
    }
}

RenderErrorPanel.propTypes = {
    debugMessage: PropTypes.string,
};

RenderErrorPanel.defaultProps = {
    debugMessage: null,
};

export const panelErrorMessage = (error, info) => {
    let debugMessages = [];

    try {
        if (error) {
            debugMessages.push(`Error Stack\n-------------------------\n${error.stack || error.message || error}`);
        }
    }
    catch (err) {
        // Ignore
    }

    try {
        if (info.componentStack) {
            debugMessages.push(`Component Stack\n-------------------------${info.componentStack}`);
        }
    }
    catch (err) {
        // Ignore
    }

    return (
        <RenderErrorPanel
            debugMessage={debugMessages.length ? debugMessages.join('\n\n') : null}
        />
    );
};

export default RenderErrorPanel;
