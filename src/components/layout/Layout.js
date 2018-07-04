import React, { Component } from 'react';
import { withRouter } from 'react-router';
import LeftMenu from '../navigation/LeftMenu.js';
import Header from './Header.js';
import Footer from './Footer.js';
import {ShoppingCart} from '../catalogue/';


class Layout extends Component {

  render() {
	return (
		<div id="app" className="wrapper">
			<Header/>
			<aside className="aside aside-1">
				<LeftMenu />
			</aside>
			<article className="main">
				{this.props.children}
			</article>			
			<Footer/>
		</div>
		);
  }
}

export default withRouter(Layout);
