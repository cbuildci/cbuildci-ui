/*
 * PageHeader
 */

import React from 'react';
import PropTypes from 'prop-types';

function PageHeader({ children }) {
    return (
        <h1 className="mt-3 pb-2" style={{ paddingBottom: '8px', borderBottom: '1px solid #CCC' }}>
            {children}
        </h1>
    );
}

PageHeader.propTypes = {
    children: PropTypes.element.isRequired,
};

export default PageHeader;
