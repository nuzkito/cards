import React from 'react';
import ColumnList from './column-list';
import CardsStore from '../stores/cards-store';
import CardsActions from '../actions/cards-actions';

function getCardsState() {
    return CardsStore.getAll();
}

const CardsApp = React.createClass({

    getInitialState() {
        return getCardsState();
    },

    componentDidMount() {
        CardsStore.addChangeListener(this.onChange);
    },

    componentWillUnmount() {
        CardsStore.removeChangeListener(this.onChange);
    },

    render() {
        let columnList;
        if (this.state.columns) {
            columnList = <ColumnList columns={this.state.columns} />;
        }

        return (
            <div className="Cards">
                {columnList}
                <div className="Cards-column">
                    <button className="Cards-addColumnButton" onClick={this.createColumn}></button>
                    <div className="Cards-help">
                        <p><strong>Ayuda:</strong></p>
                        <p>Doble click para editar.</p>
                    </div>
                </div>
            </div>
        );
    },

    onChange() {
        this.setState(getCardsState());
    },

    createColumn() {
        CardsActions.createColumn();
    }

});

export default CardsApp;
