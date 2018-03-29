import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import CatalogueActions from '../../actions/CatalogueActions';
import ShoppingCartItem from './ShoppingCartItem';
import ShoppingCartContactData from './ShoppingCartContactData';

class ShoppingCart extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			items : []
		};
	}
	
	componentDidMount() {
		this.props.getShoppingCart();
	}
	
	updateChangesItems(items) {
		debugger;
	}
	
	checkOut(orderData) {
		this.props.checkOutShoppingCart({
			contactData: orderData
		});
	}

	render() {
		let actionStatus = this.props.shoppingCart.actionStatus;
		let items = this.props.shoppingCart.items.map(item => 
			<ShoppingCartItem parent={this} status={item.id == actionStatus.itemId ? actionStatus.status : ''} item={item} key={item.id} />
		);
		if (items.length == 0) {
			return (
				<div className="shopping-cart">
					<div className="shopping-cart__empty">
						<h1>Корзина пуста</h1>
						Перейдите в раздел <Link to="/catalogue/">"Каталог"</Link> для совершения покупок.
					</div>
				</div>
			);
		} else {
			return (
				<div className="shopping-cart">
					<h2>Корзина</h2>
					<div className="shopping-cart__container">
						<div className="shopping-cart__items">
							<h3>Содержимое корзины</h3>
							{items}
						</div>				
						<ShoppingCartContactData parent={this} />
					</div>
				</div>
			);
		}
	}

}

let mapStateToProps = function(state){
    return { shoppingCart : state.ShoppingCart};
};

let mapDispatchToProps = (dispatch) => {
    return {
		getShoppingCart: () => {
			dispatch(CatalogueActions.getShoppingCart());
		},
		checkOutShoppingCart: (orderData) => {
			dispatch(CatalogueActions.checkOutShoppingCart(orderData));
		}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
