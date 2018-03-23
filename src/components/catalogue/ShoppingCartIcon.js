import React, { Component } from 'react';
import {connect} from 'react-redux';
import CatalogueActions from '../../actions/CatalogueActions';
import ShoppingCartItem from './ShoppingCartItem';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

class ShoppingCartIcon extends Component {
	
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		this.props.countItems();
	}
	
	goToCart(event) {
	}

	render() {
		const itemsCount = this.props.shoppingCart.count;
		const cartClasses = classNames({
			'shopping-cart_icon' : true,
			'empty' : itemsCount === 0
		});
		return (
			<Link to="/shoppingcart">
				<div className={cartClasses}>
					<div className="shopping-cart_icon__counter">{itemsCount}</div>
				</div>
			</Link>
		);
	}

}

let mapStateToProps = function(state){
    return { shoppingCart : state.ShoppingCart};
};

let mapDispatchToProps = (dispatch) => {
    return {
		countItems: () => {
			dispatch(CatalogueActions.shoppingCartItemsCount());
		}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartIcon);
