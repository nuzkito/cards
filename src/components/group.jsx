import React from 'react';
import CardList from './card-list';
import CardsActions from '../actions/cards-actions';

const Group = React.createClass({

    getInitialState() {
        return {
            editMode: false,
        };
    },

    render() {
        let content;
        if (this.state.editMode) {
            content = <input type="text" ref="title" className="Cards-titleInput" onFocus={this.setCursorPositionToEndOfInput}
                defaultValue={this.props.title} onBlur={this.endEditMode} onKeyDown={this.editGroup} autoFocus />;
        } else {
            content = <h2 className="Cards-title">{this.props.title}</h2>;
        }

        return (
            <div className="Cards-group">
                <div className="Cards-header" onDoubleClick={this.startEditMode}>
                    {content}
                </div>
                <CardList cards={this.props.cards} />
                <button className="Cards-addCardButton" onClick={this.createCard}></button>
            </div>
        );
    },

    createCard() {
        CardsActions.createCard(this.props.id, 'Nueva tarjeta');
    },

    editGroup(event) {
        if (event.which === 13) {
            CardsActions.editGroup(this.props.id, this.refs.title.value);
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

export default Group;
