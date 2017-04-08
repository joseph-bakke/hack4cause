import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Line } from 'react-chartjs';

export default React.createClass({
    render(){
        const chartData = {
            labels: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015],
            datasets: [
                {
                    label: "Eugene",
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
                    fillColor: "rgba(75, 192, 192, 0.2)",
                    strokeColor: "rgba(75, 192, 192, 1)",
                    pointColor: "rgba(75, 192, 192, 1)",
                    pointBackgroundColor: "rgba(75, 192, 192, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(75, 192, 192, 1)",
                    data: [1.000, 1.015, 1.046, 1.081, 1.115, 1.147, 1.184, 1.220, 1.224, 1.238, 1.269, 1.298, 1.323, 1.359, 1.409],
                    spanGaps: false
                },
                {
                    label: "USA",
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
                    fillColor: "rgba(54, 162, 235, 0.2)",
                    strokeColor: "rgba(54, 162, 235, 1)",
                    pointColor: "rgba(54, 162, 235, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [1.000, 0.988, 0.987, 0.984, 0.995, 1.002, 1.016, 0.980, 0.973, 0.948, 0.933, 0.932, 0.965, 0.950, 1.000],
                    spanGaps: false
                }
            ]
        };
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