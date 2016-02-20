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
