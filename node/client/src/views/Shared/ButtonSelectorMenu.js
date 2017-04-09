import React from 'react';
import PropTypes from 'prop-types';
import Selector from './Selector';
import { Grid, Row, Col } from 'react-flexbox-grid';
import _ from 'lodash';

/*
 buttonConfig: {
 housingButton: {
 label: <h3>Housing</h3>
 },
 weatherButton: {
 label: <h3>Weather</h3>
 }
 }
 function onSelectCallback(buttons) {
 buttons => [
 "housingButton",
 "weatherButton"
 ] if both selected
 buttons => [
 "housingButton"
 ] if housing button only selected
 }

 */

const ButtonSelector = React.createClass({
    propTypes() {
        return {
            id: PropTypes.string.isRequired,
            selectorElement: PropTypes.element.isRequired,
            isSelected: PropTypes.bool.isRequired,
            onSelectorClicked: PropTypes.func.isRequired
        };
    },
    render() {
        const {selectorElement, isSelected, onSelectorClicked, id} = this.props;
        return (
            <Col xs={3} md={3}>
                <Selector
                    selectorElement={selectorElement}
                    selectorField={id}
                    isSelected={isSelected}
                    onSelectorClicked={onSelectorClicked}
                />
            </Col>

        );

    }
});

const ButtonSelectorMenu = React.createClass({
    propTypes: {
        buttonConfig: PropTypes.object.isRequired,
        onSelectCallback: PropTypes.func.isRequired
    },
    getInitialState() {
        return {
            buttonConfig: this.props.buttonConfig
        };
    },
    selectorClicked(id) {
        return function onSelectorClicked(event) {
            event.preventDefault();
        };
    },
    render() {
        const {onSelectCallback} = this.props;
        const {buttonConfig} = this.state;
        const buttonMenuJsx = _.keys(buttonConfig)
            .map(function (buttonId) {
                return (
                    <Col xs={3} md={3}>
                        <ButtonSelector id={buttonId}
                                        selectorElement={buttonConfig[buttonId].label}
                                        onSelectorClicked={this.selectorClicked(buttonId)}
                                        isSelected={buttonConfig[buttonId].isSelected}/>
                    </Col>
                );
            });
        return (
            <div>
                {_.chunk(buttonMenuJsx, 4).map(function (arraySet, index) {
                    return <Row>{arraySet}</Row>;
                })}
            </div>
        );
    }
});

export default ButtonSelectorMenu;
