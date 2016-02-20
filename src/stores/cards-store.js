import { EventEmitter } from 'events';
import uuid from 'uuid';
import AppDispatcher from '../dispatcher/app-dispatcher';
import constants from '../constants';

const CHANGE_EVENT = 'change';
const localStorageKey = 'cards database';

let data = {
    columns: [],
};

function createColumn() {
    const id = uuid();
    data.columns.push({ id, groups: [] });
}

function createGroup(columnId, title) {
    const id = uuid();
    for (let column of data.columns) {
        if (column.id === columnId) {
            column.groups.push({ id, title, cards: [] });
            return;
        }
    }
}

function editGroup(id, title) {
    for (let column of data.columns) {
        for (let group of column.groups) {
            if (group.id === id) {
                group.title = title;
                return;
            }
        }
    }
}

function createCard(groupId, text) {
    const id = uuid();
    for (let column of data.columns) {
        for (let group of column.groups) {
            if (group.id === groupId) {
                group.cards.push({ id, text });
                return;
            }
        }
    }
}

function editCard(id, text) {
    for (let column of data.columns) {
        for (let group of column.groups) {
            for (let cardIndex in group.cards) {
                if (group.cards[cardIndex].id === id) {
                    group.cards[cardIndex].text = text;
                    return;
                }
            }
        }
    }
}

function deleteCard(id) {
    for (let column of data.columns) {
        for (let group of column.groups) {
            for (let card of group.cards) {
                if (card.id === id) {
                    let set = new Set(group.cards);
                    set.delete(card);
                    group.cards = [...set];
                    return;
                }
            }
        }
    }
}

const CardsStore = Object.assign({}, EventEmitter.prototype, {

    init() {
        data = JSON.parse(localStorage.getItem(localStorageKey)) || { columns: [] };
    },

    getAll() {
        return data;
    },

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherIndex: AppDispatcher.register(function (payload) {
        let action = payload.action;

        switch (action.actionType) {
            case constants.COLUMN_CREATE:
                createColumn();
                break;
            case constants.GROUP_CREATE:
                createGroup(action.columnId, action.title);
                break;
            case constants.GROUP_UPDATE:
                editGroup(action.id, action.title);
                break;
            case constants.CARD_CREATE:
                createCard(action.groupId, action.text);
                break;
            case constants.CARD_UPDATE:
                editCard(action.id, action.text);
                break;
            case constants.CARD_DELETE:
                deleteCard(action.id);
                break;
            default:
                return true;
        }

        CardsStore.emitChange();

        return true;
    }),

});

CardsStore.addChangeListener(function () {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
});

export default CardsStore;
