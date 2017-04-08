import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';


export default React.createClass({
    render(){
        return(
            <Grid fluid>
        <Row>
          <Col xs={6} md={3}>
            <div className="card">
                <div className="container">
                    <h4><b>Card</b></h4> 
                    <p>Details</p> 
                </div>
            </div>
          </Col>
        </Row>
      </Grid>
        )
    }
});