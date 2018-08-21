/*
 * PageHeader
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const H1 = styled.h1`
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: normal;
    line-height: 1.2;
    color: #555;
`;

//  className="mt-3 pb-2" style={{ paddingBottom: '8px' }}

function PageHeader({ children }) {
    return (
        <H1>
            {children}
        </H1>
    );
}

PageHeader.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PageHeader;
