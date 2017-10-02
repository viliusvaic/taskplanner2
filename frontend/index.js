import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

if (module.hot) {
    render(<App />, document.querySelector('.main'));
}