import React, { Component } from 'react';

class ShoppingCartItem extends Component {	
	

	render() {
		return (
			<div className="shopping-cart_item">
				<span>{this.props.item.name}</span> <span>{this.props.item.price} x {this.props.item.quantity}</span>
			</div>
		);
	}

}


export default ShoppingCartItem;
