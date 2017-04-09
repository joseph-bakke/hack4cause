import React from 'react';
import axios from 'axios';
import Promise from 'bluebird';

const categoryInfoEndpoint = function (categoryId) {
    return `http://localhost:3001/data/for/category/${categoryId}`;
};

const getCategoryEndpoint = function (categoryId) {
    return {
        1:'http://localhost:3001/income',
        2:'http://localhost:3001/housing',
        3:'http://localhost:3001/eugeneData',
        4:'http://localhost:3001/parking',
        5:'http://localhost:3001/weather',
        6:'http://localhost:3001/development/resedential'
    }[categoryId];
};

const CategoryPage = React.createClass({
    componentWillMount() {
        Promise.all([
            axios.get(categoryInfoEndpoint(this.props.routeParams.categoryid)),
            axios.get(getCategoryEndpoint(this.props.routeParams.categoryid))
        ])
        .then((res) => {
            this.parseData(res);
        })
        .catch(function (err) {
            console.log(err);
        });

    },
    parseData(res) {
        const categoryInfo = res.shift().data;
        const categoryData = res.pop().data;

        console.log(categoryInfo);
        console.log(categoryData);
    },
    render() {
        const categoryId = this.props.routeParams.categoryid;
        console.log(categoryId);
        return (
            <div>Ayy lmao</div>
        );
    }
});

export default CategoryPage;
