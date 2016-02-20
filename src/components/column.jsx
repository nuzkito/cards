import React from 'react';
import Group from './group';
import CardsActions from '../actions/cards-actions';

const Column = React.createClass({

    render() {
        return (
            <div className="Cards-column" key={this.props.id}>
                <div>
                    {this.props.groups.map(group => <Group key={group.id} id={group.id} title={group.title} cards={group.cards} />)}
                </div>
                <button className="Cards-addGroupButton" onClick={this.createGroup}></button>
            </div>
        );
    },

    createGroup() {
        CardsActions.createGroup(this.props.id, 'Nuevo grupo');
    },

});

export default Column;
