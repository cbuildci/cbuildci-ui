/*
 * LoadPageError
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import FormattedTitle from 'components/FormattedTitle';
import Panel, { PanelHeader } from 'components/Panel';
import messages from './messages';

export class LoadPageError extends React.PureComponent {
    render() {
        const {
            debugMessage,
        } = this.props;

        // TODO: Use flag to show debug message.

        return (
            <React.Fragment>
                <Helmet>
                    <FormattedTitle {...messages.title}/>
                </Helmet>

                <Panel>
                    <PanelHeader>
                        <FormattedMessage {...messages.header}/>
                    </PanelHeader>

                    <div>
                        <FormattedMessage {...messages.bodyMessage}/>
                    </div>
                </Panel>

                <Panel bandColor="red">
                    {debugMessage != null && (
                        <pre>
                            {debugMessage}
                        </pre>
                    )}
                </Panel>
            </React.Fragment>
        );
    }
}

LoadPageError.propTypes = {
    debugMessage: PropTypes.string,
};

LoadPageError.defaultProps = {
    debugMessage: null,
};

export const pageErrorMessage = (error, info) => {
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
        <LoadPageError
            debugMessage={debugMessages.length ? debugMessages.join('\n\n') : null}
        />
    );
};

export default LoadPageError;
