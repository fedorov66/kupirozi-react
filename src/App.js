import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Switch, Route, Link } from 'react-router-dom'

import './App.css';
import Layout from './components/layout/Layout.js';
import Categories from './components/catalogue/Categories.js';
import Category from './components/catalogue/Category.js';
import Item from './components/catalogue/Item.js';
import TextPage from './components/content/TextPage.js';


class App extends Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
		<Layout>
			<Switch>
				<Route exact path='/' component={Categories} />
				<Route exact path='/catalogue' component={Categories} />
				<Route exact path='/catalogue/:catId'  component={Category} />
				<Route exact path='/catalogue/:catId/page/:pageIndex'  component={Category} />
				<Route exact path='/catalogue/:catId/:id'  component={Item} />
				<Route exact path='/page/:pageName' component={TextPage} />
			</Switch>
		</Layout>
		);
	}
}

export default App;
