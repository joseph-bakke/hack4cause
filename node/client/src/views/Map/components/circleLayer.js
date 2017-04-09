import React, { PropTypes } from 'react';
import { Circle } from 'react-leaflet';
import _ from 'lodash';

const circleOpacity = 0.1;

const CircleLayer = React.createClass({
    propTypes: {
        zoomBy: PropTypes.number,
        dataSet: PropTypes.array
    },

    componentWillReceiveProps(nextProps) {
        this.handleZoom(nextProps.zoomBy);
    },

    handleZoom(zoomBy) {
        this.setState({
            circleRadius: 500-zoomBy
        });
    },

    parseData() {
        let circles = [];
        _.forEach(this.props.dataSet, function (obj) {
            if (!(obj.lat === null || obj.lng === null)) {
                circles.push([parseFloat(obj.lat), parseFloat(obj.lng)]);
            }
        });

        this.setState({
            circles: circles
        });
    },

    createCircles() {
        let comp = [];
        let circleRadius = this.state.circleRadius;
        _.forEach(this.props.circles, function (loc, index) {
            comp = comp.concat(
                <Circle
                    key={index}
                    center={loc}
                    radius={circleRadius}
                    fillOpacity={circleOpacity}
                    stroke={false}
                />
            );
        });
        return comp;
    },

    render() {
        return (
            <div>
                {this.createCircles()}
            </div>
        );
    }
});

export default CircleLayer;
