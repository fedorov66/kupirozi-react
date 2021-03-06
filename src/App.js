import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';
import Layout from './components/layout/Layout.js';
import Categories from './components/catalogue/Categories.js';
import Category from './components/catalogue/Category.js';
import Item from './components/catalogue/Item.js';
import TextPage from './components/content/TextPage.js';
import ShoppingCart from './components/catalogue/ShoppingCart.js';

import { Provider } from 'react-redux';
// import { HashRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
				<Provider store={this.props.store}>
					<Router hashType="hashbang">
							<Switch>
								<Layout>
									<Route exact path='/' component={Categories} />
									<Route exact path='/catalogue' component={Categories} />
									<Route exact path='/catalogue/:catId'  component={Category} />
									<Route exact path='/catalogue/:catId/page/:pageIndex'  component={Category} />
									<Route exact path='/catalogue/:catId/:id'  component={Item} />
									<Route exact path='/shoppingcart'  component={ShoppingCart} />
									<Route exact path='/page/:pageName' component={TextPage} />
								</Layout>
							</Switch>
					</Router>
				</Provider>
			
		);
	}
}

export default App;
