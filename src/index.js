import 'babel-polyfill';
import './styles.css';
import ReactDOM from 'react-dom';
import React from 'react';
import CardsApp from './components/cards-app';
import CardsStore from './stores/cards-store';

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(() => {
    CardsStore.init();
    ReactDOM.render(<CardsApp />, document.getElementById('app'));
});

if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.');
    navigator.serviceWorker.register('/service-worker.js').then(function() {
        console.log('CLIENT: service worker registration complete.');
    }, function() {
        console.log('CLIENT: service worker registration failure.');
    });
} else {
    console.log('CLIENT: service worker is not supported.');
}
