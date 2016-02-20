import React from 'react';
import CardsActions from '../actions/cards-actions';

const Card = React.createClass({

    getInitialState() {
        return {
            editMode: false,
        };
    },

    render: function () {
        let content;
        if (this.state.editMode) {
            content = <input type="text" ref="text" className="Cards-cardTextInput" onFocus={this.setCursorPositionToEndOfInput}
                defaultValue={this.props.text} onBlur={this.endEditMode} onKeyDown={this.editCard} autoFocus />;
        } else {
            content = <p className="Cards-cardText">{this.props.text}</p>;
        }

        return (
            <div className="Cards-card" onDoubleClick={this.startEditMode}>
                {content}
                <button className="Cards-deleteCardButton" onClick={this.deleteCard}></button>
            </div>
        );
    },

    deleteCard() {
        CardsActions.deleteCard(this.props.id);
    },

    editCard(event) {
        if (event.which === 13) {
            CardsActions.editCard(this.props.id, this.refs.text.value);
            event.target.blur();
        } else if (event.which === 27) {
            event.target.blur();
        }
    },

    startEditMode() {
        this.setState({
            editMode: true,
        });
    },

    endEditMode() {
        this.setState({
            editMode: false,
        });
    },

    setCursorPositionToEndOfInput(event) {
        let position = event.target.value.length;
        event.target.setSelectionRange(position, position);
    },

});

export default Card;
