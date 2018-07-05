import React, { Component } from 'react';
import {connect} from 'react-redux';
import CatalogueActions from '../../actions/CatalogueActions';

class ShoppingCartItem extends Component {	
	
	constructor(props) {
		super(props);
		
		this.changeCountValue = this.changeCountValue.bind(this);
		this.changeTimer = null;
		
		this.state = {
			item_id : props.item.id,
			quantity : parseInt(props.item.quantity, 10),
			changed : false,
		};
	}
	
	hasClass(elm, className) {
		return (elm != null && elm.classList.contains(className));
	}
	
	getParent(elm) {
		return ((elm.parentElement) ? elm.parentElement : ((elm.parentNode) ? elm.parentNode : null));
	}
	
	getParentWithClass(elm, className) {
		let findNext = true;
		while (findNext) {
			let parent = this.getParent(elm);
			if (parent == null) {
				findNext = false;
			} else if (!this.hasClass(parent, className)) {
				elm = parent;
			} else {
				return parent;
			}
			console.log('z');
		}
		return null;
	}
	
	handleCountPlus(e) {
		if (Number.isInteger(this.state.quantity)) {
			let container = this.getParentWithClass(e.currentTarget, 'shopping-cart__item-quantity');
			this.setState(Object.assign(this.state, {quantity : (this.state.quantity + 1)}));
			this.sendRequest(this.state, container);
		}
	}
	
	handleCountMinus(e) {
		if (Number.isInteger(this.state.quantity) && this.state.quantity > 0) {
			let container = this.getParentWithClass(e.currentTarget, 'shopping-cart__item-quantity');
			this.setState(Object.assign(this.state, {quantity : (this.state.quantity - 1)}));
			this.sendRequest(this.state, container);
		}
	}
	
	changeCountValue(e) {
		const currentTarget = e.currentTarget;
		const value = parseInt(currentTarget.value, 10);
		if (Number.isInteger(value) && value >= 0) {
				this.setState(Object.assign(this.state, {
				quantity : currentTarget.value,
				changed : true,
			}));
			clearTimeout(this.changeTimer);
			this.changeTimer = setTimeout(function() {
				let container = this.getParentWithClass(currentTarget, 'shopping-cart__item-quantity');
				this.sendRequest(this.state, container);
			}.bind(this), 1000);
		}
	}
	
	sendRequest(state, container) {
		container.classList.add('running');
		new Promise((resolve, reject) => {
			resolve(this.props.updateShoppingCartItem(state));
		}).then(function(res) {
			if (res && res.data.status === 'NOT_AVAILABLE') {
				alert('В наличии есть ' + res.data.available + ' шт. (Вы запросили: ' + state.quantity + ' шт.)');
			}
			container.classList.remove('running');
		});
	}

	render() {
		const notAvailable = this.props.status === 'NOT_AVAILABLE';
		return (
			<div className="shopping-cart__item">{Date()}
				<div className="shopping-cart__item-name">{this.props.item.name}</div>
				<div className="shopping-cart__item-quantity ld-over">
					<input type="text" name="quantity" autoComplete="off" onChange={this.changeCountValue} value={this.props.item.quantity} />
					<div className="arrows__container">
						<div className="arrow__up" onClick={(e) => this.handleCountPlus(e)}><img src="/assets/img/up-arrow.png" alt="Добавить" /></div>
						<div className="arrow__down" onClick={(e) => this.handleCountMinus(e)}><img src="/assets/img/down-arrow.png" alt="Убать" /></div>
					</div>
					<div className="ld ld-pie ld-flip"></div>
				</div>
				<div className="shopping-cart__item-price">
					<span>{this.props.item.price} ₽ / шт.</span>
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
		updateShoppingCartItem: (params) => {
			return dispatch(CatalogueActions.updateShoppingCartItem(params));
		}
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartItem);
