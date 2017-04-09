import React, { PropTypes } from 'react';
import { Row } from 'react-flexbox-grid';

const CurrentWind = React.createClass({
    renderWindspeed(){
        var windSpeed = this.props.weather.currently.windSpeed;
        if (windSpeed != ""){
            windSpeed = windSpeed + " mph";
        }
        return windSpeed;
    },
    render() {
        var style = {
            marginTop: "10px",
            marginLeft: "11px",
            fontSize: "40px",
            fontWeight: "bold",
            display: "block",
        }
        return (
            <div>
                <span style={style}>{this.renderWindspeed()}</span>
            </div>
        )
    }
});

export default CurrentWind;
