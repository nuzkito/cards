import React from 'react';
import Column from './column';

const ColumnList = React.createClass({
    render: function () {
        return (
            <div className="Cards-columns">
                {this.props.columns.map(column => <Column key={column.id} id={column.id} groups={column.groups} />)}
            </div>
        );
    },
});

export default ColumnList;
