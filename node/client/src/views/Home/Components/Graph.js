import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Line} from 'react-chartjs';


export default React.createClass({
    buildChartObj(){
        var selected = this.props.selected;
        for(var key in selected) { 
            if (selected.hasOwnProperty(key)) {
                var attr = selected[key];
                if(attr){
                    var item = this.addToChartData(key);
                }
            }
        };
        return {
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
                    data: item,
                    spanGaps: false
                }
    },
    buildChartData(){
        var chartData = {
            labels: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015],
            datasets: [
            ]
        };
        chartData.datasets.push(this.buildChartObj())
        return chartData;
    },
    addToChartData(selectedItem){
        var selectedData = this.props.data[selectedItem];
        var data = [];
        for(var key in selectedData) {
            if (selectedData.hasOwnProperty(key)) {
                var attr = selectedData[key];
                if(attr){
                    data.push(attr);
                }
            }
        }
        return data;
    },
    checkSelectedData(){
        var selected = this.props.selected;
        for(var key in selected) { 
            if (selected.hasOwnProperty(key)) {
                var attr = selected[key];
                if(attr){
                    return this.addToChartData(key);
                }
            }
        }
    },
    render(){
    var chartData = {
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
                }
            ]
        };
    console.log(this.props);
    var chartData = this.buildChartData();
    console.log(chartData);
        var chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            tooltipTemplate: "<%= value + '% change' %>",
        };
        return(
            <div className="card">
                <div className="container">
                    <h3>Income Change</h3>
                    <Line data={chartData} options={chartOptions} width="100%" height="100%"/>
                </div>
            </div>
        )
    }
});