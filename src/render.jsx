import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app';

export function render(store) {
    window.React = React; // For chrome dev tool support

    document.addEventListener('DOMContentLoaded', function() {
        ReactDOM.render(
            <Provider store={ store }>
                <App />
            </Provider>,
            document.getElementById('root'));
    });
}
