import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import Skycons from 'react-skycons';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default React.createClass({
    render(){
        return(
            <div className="card">
                <div className="container">
                    <h3>Weather</h3>
                    <Grid fluid>
                        <Row>
                            <Col xs={2} md={2}>
                                <Skycons color='black' icon='PARTLY_CLOUDY_DAY' autoplay={true}/>
                            </Col>
                            <Col xs={2} md={2}>
                                <Skycons color='black' icon='PARTLY_CLOUDY_DAY' autoplay={true}/>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        )
    }
});