import AppDispatcher from '../dispatcher/app-dispatcher';
import constants from '../constants';

const CardsActions = {

    createColumn() {
        AppDispatcher.handleViewAction({
            actionType: constants.COLUMN_CREATE,
        });
    },

    createGroup(columnId, title) {
        AppDispatcher.handleViewAction({
            actionType: constants.GROUP_CREATE,
            columnId,
            title,
        });
    },

    editGroup(id, title) {
        AppDispatcher.handleViewAction({
            actionType: constants.GROUP_UPDATE,
            id,
            title,
        });
    },

    createCard(groupId, text) {
        AppDispatcher.handleViewAction({
            actionType: constants.CARD_CREATE,
            groupId,
            text,
        });
    },

    editCard(id, text) {
        AppDispatcher.handleViewAction({
            actionType: constants.CARD_UPDATE,
            id,
            text,
        });
    },

    deleteCard(id) {
        AppDispatcher.handleViewAction({
            actionType: constants.CARD_DELETE,
            id,
        });
    },

};

export default CardsActions;
