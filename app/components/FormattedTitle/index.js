/*
 * FormattedTitle
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

function FormattedTitle({ id, defaultMessage, intl }) {
    return (
        <title>
            {intl.formatMessage({ id, defaultMessage })}
        </title>
    );
}

FormattedTitle.propTypes = {
    intl: intlShape.isRequired,
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
};

export default injectIntl(FormattedTitle);
