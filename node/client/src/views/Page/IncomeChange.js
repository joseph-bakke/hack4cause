import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Line } from 'react-chartjs';
import _ from 'lodash';

function colorGenerator() {
    let r = _.random(0, 255);
    let g = _.random(0, 255);
    let b = _.random(0, 255);
    return (opacity) => {
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };
}

function dataTemplate(label, dataset) {
    const color = colorGenerator();
    return {
        label: label,
        fill: false,
        lineTension: 0.1,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        redraw: true,
        fillColor: color('0.4'),
        strokeColor: color('1'),
        pointColor: color('1'),
        pointBackgroundColor: color('1'),
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: color('1'),
        data: dataset,
        spanGaps: false
    };
}

/*
 scale <- function(orig, matchTo) {
 # rescales an array orig to be on the same range of values as matchTo
 a <- min(orig)
 b <- max(orig)
 y <- min(matchTo)
 z <- max(matchTo)

 scaled <- (orig - a) * (z - y) / (b - a) + y
 return(scaled)
 }
 */

function scale(orig, matchTo) {
    let a = _.min(orig);
    let b = _.max(orig);
    let y = _.min(matchTo);
    let z = _.max(matchTo);
    return orig.map((x) => (x - a) * (z - y) / (b - a) + y);
}

export default React.createClass({
    propTypes: {
        datasets: PropTypes.object.isRequired,
        selected: PropTypes.array.isRequired
    },
    render(){
        const {datasets, selected} = this.props;
        // const dataset = {
        //     eugene: {
        //         label: "Eugene",
        //         data: [1.000, 1.015, 1.046, 1.081, 1.115, 1.147, 1.184, 1.220, 1.224, 1.238, 1.269, 1.298, 1.323, 1.359, 1.409]
        //     },
        //     usa: {
        //         label: "USA",
        //         data: [1.000, 0.988, 0.987, 0.984, 0.995, 1.002, 1.016, 0.980, 0.973, 0.948, 0.933, 0.932, 0.965, 0.950, 1.000]
        //     }
        // };
        // const selected = ['eugene', 'usa'];

        const greatestDatasetKey = _.first(_.keys(datasets)
            .sort(function (a, b) {
                let maxA = _.max(datasets[a].data);
                let maxB = _.max(datasets[b].data);
                if (maxA > maxB) {
                    return 1;
                }
                if (maxA < maxB) {
                    return -1;
                }
                return 0;
            }));

        const chartData = {
            labels: _.range(2001, 2016, 1),
            datasets: _.keys(datasets)
                .filter((key) => _.includes(selected, key))
                .map((key) => {
                    return dataTemplate(datasets[key].label, datasets[key].data);
                })
        };
        console.log(chartData);
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            tooltipTemplate: "<%= value + '% change' %>",
        };
        return (
            <div className="card">
                <div className="container">
                    <h3>Income Change</h3>
                    <Line data={chartData} options={chartOptions} width="100%" height="100%"/>
                </div>
            </div>
        )
    }
});