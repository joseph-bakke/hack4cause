import React, { PropTypes, Component } from 'react';
import axios from 'axios';
import { Map, TileLayer } from 'react-leaflet';

const stamenTonerTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const stamenTonerAttr = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [44.05207, -123.086];
const zoomLevel = 12;

const MapComponent = React.createClass({
    render() {
        return (
            <div className="map" id="map">
                <Map
                    center={mapCenter}
                    zoom={zoomLevel}
                >
                    <TileLayer
                        url={stamenTonerTiles}
                        attribute={stamenTonerAttr}
                    />
                </Map>
            </div>

        );
    }
});

const MapPage = React.createClass({
    componentWillMount() {

    },
    render() {
        return (
            <div>
                <MapComponent />
            </div>
        );
    }
});

export default MapPage;
