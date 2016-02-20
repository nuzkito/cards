let callbacks = [];
let promises = [];

const Dispatcher = function () {};

Dispatcher.prototype = Object.assign({}, Dispatcher.prototype, {

    register(callback) {
        callbacks.push(callback);
        return callbacks.length - 1;
    },

    dispatch(payload) {
        let resolves = [];
        let rejects = [];

        promises = callbacks.map(function (callback, index) {
            return new Promise(function (resolve, reject) {
                resolves[index] = resolve;
                rejects[index] = reject;
            });
        });

        callbacks.forEach(function (callback, index) {
            Promise.resolve(callback(payload)).then(function () {
                resolves[index](payload);
            }, function() {
                rejects[index](new Error('Dispatcher callback unsuccessful'));
            });
        });

        promises = [];
    },

    waitFor(promiseIndexes, callback) {
        let selectedPromises = promiseIndexes.map(function (index) {
            return promises[index];
        });

        return Promise.all(selectedPromises).then(callback);
    },

});

export default Dispatcher;
