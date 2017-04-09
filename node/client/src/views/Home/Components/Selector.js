import React, { PropTypes } from 'react';

const Selector = React.createClass({
    propTypes: {
        selectorText: PropTypes.string,
        selectorField: PropTypes.string,
        isSelected: PropTypes.bool,
        onSelectorClicked: PropTypes.func
    },
    onClick() {
        this.props.onSelectorClicked(this.props.selectorField);
    },
    render() {
        const className = this.props.isSelected
            ? 'selector-button clicked'
            : 'selector-button';

        return (
            <div>
                <a className={className} onClick={this.onClick}>{this.props.selectorText}</a>
            </div>
        );
    }
});

export default Selector;