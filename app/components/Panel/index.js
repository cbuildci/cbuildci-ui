/*
 * Panel
 */

import styled, { css } from 'styled-components';

export const Panel = styled.div`
    background-color: #FFF;
    margin: 16px 0;
    padding: 12px 14px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, .1);

    ${(props) => props.bandColor && css`
        border-left: 10px solid ${props.bandColor}
    `}
`;

export const PanelHeader = styled.div`
    font-size: 1.3rem;
    color: #666;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 8px;
    margin-bottom: 16px;
`;

export const PanelHeaderMini = styled.div`
    font-size: .9rem;
    color: #999;
    margin-bottom: 8px;
`;

export const PanelTabs = styled.div`
    display: flex;
    background-color: #e4e4e4;
    margin: -12px -14px 12px -14px;
`;

export const Tab = styled.button`
    padding: 10px 20px;
    cursor: pointer;
    color: #666;
    background-color: transparent;
    border-width: 0;

    &:hover {
        background-color: rgba(255, 255, 255, 0.5);
    }
    
    ${({ active }) => active && css`
        color: #333;
        background-color: white;
        cursor: text;
        
        &:hover {
            background-color: white;
        }
    `}
`;

export default Panel;
