import React, { Component } from 'react';
import {connect} from 'react-redux';
import CatalogueActions from '../../actions/CatalogueActions';
import ShoppingCartItem from './ShoppingCartItem';


function ContactData() {
	return (
	<div className="shopping-cart__order">
		<h3>Оформление заказа</h3>
		<strong>Введите ваши контактные данные:</strong>
		<div className="shopping-cart__order-contact">
			<div className="contact-form__field">
				<div className="contact-form__field-cell">
					<label>Фамилия имя отчество (полностью)</label>
				</div>
				<div className="contact-form__field-cell">
					<input type="text" name="fullName" className="text-field" value="" />
				</div>
			</div>
			<div className="contact-form__field">
				<div className="contact-form__field-cell">
					<label>Email</label>
				</div>
				<div className="contact-form__field-cell">
					<input type="text" name="email" className="text-field" value="" />
				</div>
			</div>
			<div className="contact-form__field">
				<div className="contact-form__field-cell">
					<label>Телефон</label>
				</div>
				<div className="contact-form__field-cell">
					<input type="text" name="phone" className="text-field" value="" />
				</div>
			</div>
			<div className="contact-form__field">
				<div className="contact-form__field-cell">
					<label>Почтовый адрес</label>
				</div>
				<div className="contact-form__field-cell">
					<input type="text" name="postAddress" className="text-field" value="" />
				</div>
			</div>
			<div className="contact-form__field">
				<div className="contact-form__field-cell">
					<label>Комментарии</label>
				</div>
				<div className="contact-form__field-cell">
					<textarea className="textarea-field" name="comment"></textarea>
				</div>
			</div>
			<div className="contact-form__field">
				<div className=""></div>
			</div>
		</div>
		<button onClick={(e) => this.addToCart(e)} className="ld-over button-standart" disabled>
			<span>Оформить заказа</span>
			<div class="ld ld-ball ld-flip"></div>
		</button>		
	</div>
	);
}

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
					<ContactData parent={this} />
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
