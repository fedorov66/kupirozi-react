import React, { Component } from 'react';
import {connect} from 'react-redux';
import CatalogueActions from '../../actions/CatalogueActions';
import ShoppingCartItem from './ShoppingCartItem';

class ShoppingCart extends Component {
	
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		this.props.getShoppingCart();
	}


	render() {
		const items = this.props.shoppingCart.items.map(item => 
			<ShoppingCartItem item={item} />
		);
		return (
			<div className="shopping-cart">
				{items}
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
