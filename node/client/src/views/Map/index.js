import React, { PropTypes }  from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Map, TileLayer } from 'react-leaflet';
import CircleLayer from './components/circleLayer';

const circleOpacity = 0.1;
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
        console.log(this.props.additionalLayers);
        return this.props.additionalLayers.map(layer => layer);
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
    getInitialState() {
        return {
            circles: []
        };
    },
    componentWillMount() {
        axios.get(eugeneBPData)
            .then((res) => {
                this.setState({
                    circles: res.data
                });
            })
            .catch((err) => {
                const errors = this.state.errors.concat([err]);
                this.setState({errors});
            });

    },
    render() {
        const circleLayer = <CircleLayer dataSet={this.state.circles} />;
        return (
            <div>
                <MapComponent additionalLayers={[circleLayer]} />
            </div>
        );
    }
});

export default MapPage;