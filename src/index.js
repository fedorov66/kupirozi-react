import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import promiseMiddleware from './lib/promiseMiddleware';

import './index.css';
import App from './App';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

let combinedReducers = combineReducers(reducers);
let store = applyMiddleware(promiseMiddleware)(createStore)(combinedReducers);

ReactDOM.render(
	<App store={store} />
, document.getElementById('root'));
registerServiceWorker();
