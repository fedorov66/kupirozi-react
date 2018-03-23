import React, { Component } from 'react';
import {connect} from 'react-redux';
import CatalogueActions from '../../actions/CatalogueActions';
import ShoppingCartItem from './ShoppingCartItem';

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

	render() {
		let actionStatus = this.props.shoppingCart.actionStatus;
		let items = this.props.shoppingCart.items.map(item => 
			<ShoppingCartItem parent={this} status={item.id == actionStatus.itemId ? actionStatus.status : ''} item={item} key={item.id} />
		);
		return (
			<div className="shopping-cart">
				<h2>Корзина</h2>
				<div className="shopping-cart__container">
					<div className="shopping-cart__items">
						<h3>Содержимое корзины</h3>
						{items}
					</div>				
					<div className="shopping-cart__order">
						<h3>Оформление заказа</h3>
						<strong>Введите ваши контактные данные:</strong>
						<div className="shopping-cart__order-contact">
							<div className="contact-form__field">
								<div className="contact-form__field-cell">
									<label>Фамилия имя отчество (полностью)</label>
								</div>
								<div className="contact-form__field-cell">
									<input type="text" name="fullName" class="text-field" value="" />
								</div>
							</div>
						</div>
						
					</div>
				</div>
			</div>
		);
	}

}

let mapStateToProps = function(state){
    return { shoppingCart : state.ShoppingCart};
};

let mapDispatchToProps = (dispatch) => {
    return {
		getShoppingCart: () => {
			dispatch(CatalogueActions.getShoppingCart());
		}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
