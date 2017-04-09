import React, { PropTypes, Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Map, TileLayer, Circle } from 'react-leaflet';

const stamenTonerTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const stamenTonerAttr = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const eugeneBPData = 'http://localhost:3001/housing';
const mapCenter = [44.05207, -123.0009];
// const zoomLevel = 12;

// const circleRadius = 500;
const circleOpacity = 0.1;

const MapComponent = React.createClass({
    getInitialState() {
        return {
            circles: {},
            circleRadius: 500,
            zoomLevel: 12,
            errors: []
        }
    },
    componentDidMount() {
        axios.get(eugeneBPData)
            .then((res) => {
                this.parseData(res.data);
            })
            .catch((err) => {
                const errors = this.state.errors.concat([err]);
                this.setState({errors});
            });

    },
    handleZoom(arg) {
        console.log(arg.target._zoom);
        console.log('component updated');
        console.log(this.state);
        let zoomBy = (arg.target._zoom*25);
        console.log(zoomBy);
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
        if (!_.isEmpty(this.state.errors)) {
            return (
                <div>
                    {this.state.errors}
                </div>
            );

        }

        let circleList = this.createCircles(this.state.circles);
        let zoomLevel = this.state.zoomLevel;

        return (
            <div className="map" id="map">
                <Map
                    center={mapCenter}
                    zoom={zoomLevel}
                    onZoom={this.handleZoom}
                >
                    <TileLayer
                        url={stamenTonerTiles}
                        attribute={stamenTonerAttr}
                    />
                    {circleList}
                </Map>
            </div>

        );
    }
});

const MapPage = React.createClass({
    render() {
        return (
            <div>
                <MapComponent />
            </div>
        );
    }
});

export default MapPage;
