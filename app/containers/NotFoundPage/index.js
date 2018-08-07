/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import FormattedTitle from 'components/FormattedTitle';
import PageHeader from 'components/PageHeader';
import messages from './messages';

export default function NotFound() {
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
