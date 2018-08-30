import React, { Component } from 'react';
import {connect} from 'react-redux';
import CatalogueActions from '../../actions/CatalogueActions';
import {reactLocalStorage} from 'reactjs-localstorage';
import Input from '../controls/Input';

class ShoppingCartContactData extends Component {

	constructor(props) {
		super(props);
		this.STORAGE_KEY = '__shoppingCartContactDtata__state';
		const defaultState = {
			fullName: '',
			email: '',
			phone: '',
			postAddress: '',
			comment: '',
		};
		const savedState = reactLocalStorage.get(this.STORAGE_KEY, null);
		this.state = savedState != null && typeof(savedState) === 'string' ? JSON.parse(savedState) : defaultState;
		this.handleChange = this.handleChange.bind(this);
		this.checkOut = this.checkOut.bind(this);
	}

	checkOut(e) {
		this.props.parent.checkOut(this.state);
	}

	handleChange(e) {
		let value = {};
		value[e.currentTarget.name] = e.currentTarget.value;
		const newState = Object.assign(this.state, value);
		reactLocalStorage.set(this.STORAGE_KEY, JSON.stringify(newState));
		this.setState(newState);
	}

	render() {
		const checkOutResult = this.props.parent.props.shoppingCart.checkOutResult;
		const validation = checkOutResult.validationParameters;
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
							<Input validation={validation} name="fullName" onChange={this.handleChange} value={this.state.fullName} />
						</div>
					</div>
					<div className="contact-form__field">
						<div className="contact-form__field-cell">
							<label>Email</label>
						</div>
						<div className="contact-form__field-cell">
							<Input validation={validation} name="email" onChange={this.handleChange} value={this.state.email} />
						</div>
					</div>
					<div className="contact-form__field">
						<div className="contact-form__field-cell">
							<label>Телефон</label>
						</div>
						<div className="contact-form__field-cell">
							<Input validation={validation} name="phone" onChange={this.handleChange} value={this.state.phone} />
						</div>
					</div>
					<div className="contact-form__field">
						<div className="contact-form__field-cell">
							<label>Почтовый адрес</label>
						</div>
						<div className="contact-form__field-cell">
							<Input validation={validation} name="postAddress" onChange={this.handleChange} value={this.state.postAddress} />
						</div>
					</div>
					<div className="contact-form__field">
						<div className="contact-form__field-cell">
							<label>Комментарии</label>
						</div>
						<div className="contact-form__field-cell">
							<textarea className="textarea-field" name="comment" onChange={this.handleChange} value={this.state.comment}></textarea>
						</div>
					</div>
					<div className="contact-form__field">
						<div className=""></div>
					</div>
				</div>
				<button onClick={this.checkOut} className="ld-over button-standart">
					<span>Оформить заказа</span>
					<div className="ld ld-ball ld-flip"></div>
				</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartContactData);
