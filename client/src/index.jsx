import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker'
import Root from "./root";

import './semantic-ui/dist/semantic.min.css';
import 'react-datetime/css/react-datetime.css'
import './assets/stylesheets/app.scss'

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<Root/>, document.getElementById('root'));
});

serviceWorker.register();