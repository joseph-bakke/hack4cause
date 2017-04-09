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
        return (
            <button onClick={this.onClick}>{this.props.selectorText}</button>
        );
    }
});

export default Selector;