import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Graph from './Components/Graph';
import Weather from './Components/Weather';

const eugeneOverviewEndpoint = 'http://localhost:3001/eugeneData';
const ignoreFields = ['index', 'rentMed', 'year'];

export default React.createClass({
    getInitialState() {
        return {
            data: {},
            errors: []
        }
    },

    componentWillMount() {
        axios.get(eugeneOverviewEndpoint)
            .then((res) => {
                this.parseData(res.data);
            })
            .catch((err) => {
                const errors = this.state.errors.concat([err]);
                this.setState({errors});
            });
    },

    parseData(returnedData) {
        const dataSets = Object.keys(_.first(returnedData)).filter(key => !_.includes(ignoreFields, key));
        const organizedData = {};

        dataSets.forEach((dataSet) => {
            organizedData[dataSet] = {};
            returnedData.forEach((yearlyData) => {
                organizedData[dataSet][yearlyData.year] = yearlyData[dataSet];
            });
        });

        this.setState({
            data: organizedData
        });
    },

    render() {
        if (!_.isEmpty(this.state.errors)) {
            return (
                <div>
                    {this.state.errors}
                </div>
            );
        }

        return (
            <Grid fluid>
                <Row>
                    <Col xs={9} md={9}>
                        <Weather></Weather>
                    </Col>
                    <Col xs={9} md={9}>
                        <Graph {...this.state}></Graph>
                    </Col>
                </Row>
            </Grid>
        )
    }
});