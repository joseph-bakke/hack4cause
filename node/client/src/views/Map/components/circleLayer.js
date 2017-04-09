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

    parseData(returnedData) {
        console.log('Data returned from endpoint');
        const dataSets = Object.keys(_.first(returnedData));
        let circles = [];
        _.forEach(returnedData, function (obj) {
            if (!(obj.lat == null || obj.lng == null)) {
                circles.push([parseFloat(obj.lat), parseFloat(obj.lng)]);
            }
        })

        console.log(circles);
        this.setState({
            circles: circles
        });
    },

    createCircles(circles) {
        let comp = [];
        console.log(this.state.circleRadius);
        let circleRadius = this.state.circleRadius;
        let i = 0;
        _.forEach(circles, function (loc) {
            comp = comp.concat(
                <Circle
                    key={i}
                    center={loc}
                    radius={circleRadius}
                    fillOpacity={circleOpacity}
                    stroke={false}
                />
            );
            i++;
        });
        return comp;
    },

    render() {
        return (
            <div></div>
        );
    }
});

export default CircleLayer;
