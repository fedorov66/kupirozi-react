import * as types from '../constants/ActionTypes';


const initialState = {
	items: [],
	actionStatus: null,
	count: 0,
	loaded: false
};

const Helper = {

	countItems : (items) => {
		return items.reduce((prev, cur) => {
			if (typeof(prev) === 'object') {
				prev = prev.quantity;
			}
			return prev + cur.quantity;
		});
	}
	
};


export default function doAction(state = initialState, action) {
	
	switch (action.type) {

		case types.SHOPPING_CART_GET:
			return state = Object.assign({}, state, { 
				items : action.res.data.items, 
				count : Helper.countItems(action.res.data.items) 
			});
			
		case types.SHOPPING_CART_ADD:
			return state = Object.assign({}, state, { 
				items : action.res.data.shoppingCart.items, 
				actionStatus : action.res.data.status,
				count: Helper.countItems(action.res.data.shoppingCart.items)
			});
		
		case types.SHOPPING_CART_DROP_STATUS:
			return state = Object.assign({}, state, { actionStatus : null });
			
		case types.SHOPPING_CART_ITEMS_COUNT:
			return {
				count: Helper.countItems(action.res.data.items)
			};

		default:
		  return state;
	}
}