import React from 'react';
import Card from './card';

const CardList = React.createClass({
    render: function () {
        if (!this.props.cards) {
            return <div></div>;
        }

        return (
            <div>
                {this.props.cards.map(card => <Card key={card.id} id={card.id} text={card.text} />)}
            </div>
        );
    },
});

export default CardList;
