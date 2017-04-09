import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Grid, Row, Col } from 'react-flexbox-grid';
import IncomeChange from './Components/IncomeChange'
import Selector from './Components/Selector';

const eugeneOverviewEndpoint = 'http://localhost:3001/eugeneData';
const ignoreFields = ['index', 'rentMed', 'year'];

const labelMappings = {
    unemployment: 'Regional Unemployment',
    totalWages: 'Total Wages',
    avgWage: 'Average Wage',
    natHHMedIncome: 'National Average Wage',
    housingMed: 'Median Housing Price',
    zhvi: 'Zillow Median Housing Price',
    natUnemployment: 'National Unemployment'
};

export default React.createClass({
    getInitialState() {
        return {
            data: {},
            selected: {},
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
        const selectedData = {};

        dataSets.forEach((dataSet) => {
            organizedData[dataSet] = {};
            selectedData[dataSet] = false;
            returnedData.forEach((yearlyData) => {
                organizedData[dataSet][yearlyData.year] = yearlyData[dataSet];
            });
        });

        this.setState({
            data: organizedData,
            selected: selectedData
        });
    },

    onSelectorClick(key) {
        if (this.state.selected.hasOwnProperty(key)) {
            const selected = Object.assign({}, this.state.selected);
            selected[key] = !selected[key];
            this.setState({selected});
        }
    },

    renderSelectors() {
        const dataSets = Object.keys(this.state.selected);
        const selectorRows = [];
        let cols = [];

        // Nothing to see here, just a bunch of trash
        dataSets.forEach((set, index) => {
            const text = labelMappings[set];
            const isSelected = this.state.selected[set];
            cols.push(
                <Col xs={3} md={3}>
                    <Selector
                        selectorText={text}
                        selectorField={set}
                        isSelected={isSelected}
                        onSelectorClicked={this.onSelectorClick}
                    />
                </Col>
            );

            if (index % 4 === 3 || index === dataSets.length - 1) {
                selectorRows.push(
                    <Row>
                        {[].concat(cols)}
                    </Row>
                );
                cols = [];
            }
        });

        return selectorRows;
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
                <Row center="md">
                    <h1 className="title">Welcome to Eugene</h1>
                </Row>
                <Row center="md">
                    <Col xs={9} md={9}>
                        <IncomeChange data={this.state.data} selected={this.state.selected} />
                    </Col>
                </Row>
                {this.renderSelectors()}
            </Grid>
        );
    }
});/**
 * Created by jbakke on 4/8/17.
 */
