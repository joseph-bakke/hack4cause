import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import path from 'path';
import { Grid, Row, Col } from 'react-flexbox-grid';
import CategoryIcon from './Components/CategoryIcon';

import Income from '../../images/profit.png';
import Tie from '../../images/tie.png';
import Tool from '../../images/tool.png';
import Transport from '../../images/transport.png';
import Home from '../../images/home.png';
import Cloud from '../../images/cloud.png';

const iconImageMapping = {
    'income': Income,
    'employment': Tie,
    'development': Tool,
    'parking': Transport,
    'housing': Home,
    'weather': Cloud
};

const categoriesEndpoint = 'http://localhost:3001/categories';

export default React.createClass({
    getInitialState() {
        return {
            categories: [],
            errors: []
        }
    },

    componentWillMount() {
        axios.get(categoriesEndpoint)
            .then((res) => {
                // this.setState({
                //     categories: res.data
                // });

                this.setState({
                    categories: [
                        {
                            type: 'graph',
                            icon: 'income',
                            name: 'Income'
                        }
                    ]
                })
            })
            .catch((err) => {
                const errors = this.state.errors.concat([err]);
                this.setState({errors});
            });
    },

    renderIcons() {
        const rows = [];
        let cols = [];

        console.log(this.state.categories);

        _.forEach(this.state.categories, (category, index) => {
            const icon = iconImageMapping[category.icon];
            const name = category.name;

            cols.push(<Col md={2} xs={2}><CategoryIcon icon={icon} name={name} /></Col>);

            if (index % 3 === 2 || index === this.state.categories.length - 1) {
                rows.push(
                    <Row around="md">
                        {[].concat(cols)}
                    </Row>
                );
            }
        });

        console.log(rows);

        return rows;
    },

    render() {
        return (
            <Grid fluid>
                <Row center="md">
                    <h1 className="title">Welcome to Eugene</h1>
                </Row>
                <Row center="md">
                    <h3 className="subtext">What would you like to learn about?</h3>
                </Row>
                {this.renderIcons()}
            </Grid>
        );
    }
});