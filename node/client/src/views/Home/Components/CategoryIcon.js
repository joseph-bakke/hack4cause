import React, { PropTypes } from 'react';
import { Row } from 'react-flexbox-grid';

const CategoryIcon = React.createClass({
    render() {
        return (
            <div>
                <Row center="md">
                    <div className="icon-container">
                        <img src={this.props.icon} alt="Income" className="icon-img" />
                        <div className="icon-desc">{this.props.name}</div>
                    </div>
                </Row>
            </div>
        )
    }
});

export default CategoryIcon;
