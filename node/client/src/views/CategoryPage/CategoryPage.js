import React from 'react';

const CategoryPage = React.createClass({
    render() {
        const categoryId = this.props.routeParams.categoryid;
        console.log(categoryId);
        return (
            <div>Ayy lmao</div>
        );
    }
});

export default CategoryPage;
