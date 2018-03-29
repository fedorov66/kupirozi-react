import React, { Component } from 'react';
import LeftMenu from '../navigation/LeftMenu.js';
import Header from './Header.js';
import Footer from './Footer.js';
import {ShoppingCart} from '../catalogue/';

class Layout extends Component {
	constructor(props) {
		super(props);
	}
	
  render() {
	return (
		<div id="app" className="wrapper">
			<Header/>
			<aside className="aside aside-1">
				<LeftMenu router={this.props} />
			</aside>
			<article className="main">
				{this.props.children}
			</article>			
			<Footer/>
		</div>
		);
  }
}

export default Layout;
