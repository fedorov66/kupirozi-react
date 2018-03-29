import React, { Component } from 'react';
import ShoppingCartIcon from '../../components/catalogue/ShoppingCartIcon.js';

class Header extends Component {
  render() {
    return (
		<header className="header">
			<div className="logo_container">
				  <img src="/assets/img/logo_n.png" alt="logo" />
			</div>
			<div className="search_panel"></div>
			<div className="control_panel">
				<ShoppingCartIcon></ShoppingCartIcon>
			</div>
		</header>
    );
  }
}

export default Header;
