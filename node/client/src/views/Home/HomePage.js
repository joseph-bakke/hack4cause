import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import IncomeChange from './Components/IncomeChange'

export default React.createClass({
    render(){
        return(
            <Grid fluid>
                <Row>
                    <Col xs={9} md={9}>
                        <IncomeChange></IncomeChange>
                    </Col>
                </Row>
            </Grid>
        )
    }
});