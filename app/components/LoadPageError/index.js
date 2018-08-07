/*
 * LoadPageError
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import FormattedTitle from 'components/FormattedTitle';
import PageHeader from 'components/PageHeader';
import messages from './messages';

export class LoadPageError extends React.PureComponent {
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <FormattedTitle {...messages.title}/>
                </Helmet>

                <PageHeader>
                    <FormattedMessage {...messages.header}/>
                </PageHeader>

                <p>
                    <FormattedMessage {...messages.bodyMessage}/>
                </p>
            </React.Fragment>
        );
    }
}

export const pageErrorMessage = () => <LoadPageError/>;

export default LoadPageError;
