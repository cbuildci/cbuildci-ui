/*
 * Panel
 */

import React from 'react';
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

export class TabButtonComponent extends React.PureComponent {

    state = {
        clickFocused: false,
    };

    constructor(props) {
        super(props);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleMouseDown() {
        this.setState({
            clickFocused: true,
        });
    }

    handleBlur() {
        if (this.state.clickFocused) {
            this.setState({
                clickFocused: false,
            });
        }
    }

    render() {
        const {
            children,
            active, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        const { clickFocused } = this.state;

        return (
            <button
                {...props}
                onMouseDown={this.handleMouseDown}
                onTouchStart={this.handleMouseDown}
                onBlur={this.handleBlur}
                style={clickFocused ? { outline: 'none' } : {}}
            >
                {children}
            </button>
        );
    }
}

export const TabButton = styled(TabButtonComponent)`
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

export const TabLabel = styled.label`
    ${Tab} {
        pointer-events: none;
    }
`;

export default Panel;
