import * as types from '../constants/ActionTypes';


const initialState = {
	items: [],
	actionStatus: {},
	count: 0,
	loaded: false,
	checkOutResult: {},
};

const Helper = {

	countItems : (items) => {
		return !items || items.length === 0 ? 0 : items.reduce((prev, cur) => {
			if (typeof(prev) === 'number') {
				prev = { quantity: prev };
			}
			return prev.quantity + cur.quantity;
		}, { quantity: 0 });
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
				actionStatus : {
					status: action.res.data.status,
					itemId: action.res.data.itemId
				},
				count: Helper.countItems(action.res.data.shoppingCart.items)
			});
		
		case types.SHOPPING_CART_DROP_STATUS:
			return state = Object.assign({}, state, { actionStatus : {} });
			
		case types.SHOPPING_CART_ITEMS_COUNT:
			return Object.assign({}, state, {
				count: Helper.countItems(action.res.data.items)
			});
		
		case types.SHOPPING_CART_UPDATE_ITEM: {
			
			return state = Object.assign({}, state, { 
				items : action.res.data.shoppingCart.items,
				actionStatus : {
					status: action.res.data.status,
					itemId: action.res.data.itemId
				},
				count : Helper.countItems(action.res.data.shoppingCart.items) 
			});

		}
		
		case types.SHOPPING_CHECKOUT: {
			return Object.assign({}, state, {
				checkOutResult: action.res.data
			});
		}

		default:
		  return state;
	}
}