/**
 * Time
 */

import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

const DATE_FORMAT_OPTIONS = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
};

export class Time extends React.Component {

    constructor(props) {
        super(props);

        this.timeRef = React.createRef();
        this.state = {
            showTooltip: false,
        };

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    handleMouseOver() {
        this._tooltipTimeout = setTimeout(() => {
            this.setState({
                showTooltip: true,
            });
        }, 400);
    }

    handleMouseOut() {
        clearTimeout(this._tooltipTimeout);
        this.setState({
            showTooltip: false,
        });
    }

    componentWillUnmount() {
        clearTimeout(this._tooltipTimeout);
    }

    render() {
        const {
            date,
            intl, // eslint-disable-line react/prop-types
            children,
        } = this.props;

        const { showTooltip } = this.state;

        const dateText = intl.formatDate(date, DATE_FORMAT_OPTIONS);

        return (
            <time
                className="position-relative"
                dateTime={new Date(date).toISOString()}
                ref={this.timeRef}
                id="foobar"
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                onFocus={this.handleMouseOver}
                onBlur={this.handleMouseOut}
                tabIndex="0"
            >
                {children}

                {showTooltip && <div
                    className="tooltip fade bs-tooltip-bottom show"
                    role="tooltip"
                    style={{
                        top: 'calc(100% + 3px)',
                        left: '50%',
                        whiteSpace: 'nowrap',
                        transform: 'translateX(-50%)',
                    }}
                >
                    <div className="arrow" style={{ left: 'calc(50% - 6px)' }}/>
                    <div className="tooltip-inner" style={{ maxWidth: 'none' }}>{dateText}</div>
                </div>}
            </time>
        );
    }
}

Time.propTypes = {
    children: PropTypes.node.isRequired,
    date: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]).isRequired,
};

export default injectIntl(Time);
