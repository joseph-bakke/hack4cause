import React, { PropTypes, Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';

const stamenTonerTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const stamenTonerAttr = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [44.05207, -123.086];
const zoomLevel = 12;

class MapDisplay extends Component {
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
}

export default MapDisplay