import React, { PropTypes }  from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Map, TileLayer } from 'react-leaflet';

const eugeneBPData = 'http://localhost:3001/development/residential';

const stamenTonerTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const stamenTonerAttr = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [44.05207, -123.0009]; // Eugene

const MapComponent = React.createClass({
    propTypes: {
        additionalLayers: PropTypes.array
    },
    getInitialState() {
        return {
            zoomBy: 0,
            zoomLevel: 12,
            errors: []
        }
    },
    handleZoom(arg) {
        let zoomBy = (arg.target._zoom*25);
        this.setState({ zoomBy });
    },

    renderExtraLayers() {

    },

    render() {
        if (!_.isEmpty(this.state.errors)) {
            return (
                <div>
                    {this.state.errors}
                </div>
            );

        }

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
                    {this.renderExtraLayers()}
                </Map>
            </div>

        );
    }
});

const MapPage = React.createClass({
    componentWillMount() {
        axios.get(eugeneBPData)
            .then((res) => {
                this.parseData(res.data);
            })
            .catch((err) => {
                console.log(err);
                const errors = this.state.errors.concat([err]);
                this.setState({errors});
            });

    },
    parseData(data) {
        console.log(data);
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
