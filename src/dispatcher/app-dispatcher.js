import Dispatcher from './dispatcher';

const AppDispatcher = Object.assign({}, Dispatcher.prototype, {

    handleViewAction: function (action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action,
        });
    },

});

export default AppDispatcher;
