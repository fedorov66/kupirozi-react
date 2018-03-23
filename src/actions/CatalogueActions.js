import * as types from '../constants/ActionTypes';
import axios from 'axios';

function getCatagories() {
	return {
		type: types.CATEGORIES_GET_DATA,
		promise: axios.get('/api/categories')
	}
}

function getCategory(id, pageIndex) {
	return {
		type: types.CATEGORY_GET_DATA,
		promise: axios.get('/api/category/' + id),
		pageIndex: pageIndex
	}
}

function getCategoryPage(pageIndex) {
	return {
		type: types.CATEGORY_GET_PAGE_DATA,
		pageIndex: pageIndex
	}
}

function applyFilter(filter) {
	return {
		type: types.CATEGORY_APPLY_FILTER,
		filter: filter
	}
}

function getShoppingCart() {
	return {
		type: types.SHOPPING_CART_GET,
		promise: axios.get('/api/shopping_cart')
	}
}

function addToShoppingCart(params) {
	return {
		type: types.SHOPPING_CART_ADD,
		promise: axios.post('/api/shopping_cart/add', params)
	}
}

function updateShoppingCartItem(params) {
	console.log(params);
	return {
		type: types.SHOPPING_CART_UPDATE_ITEM,
		promise: axios.post('/api/shopping_cart/update', params)
	}
}

function dropShoppingCartStatus() {
	return {
		type: types.SHOPPING_CART_DROP_STATUS
	}
}

function shoppingCartItemsCount() {
	return {
		type: types.SHOPPING_CART_ITEMS_COUNT,
		promise: axios.get('/api/shopping_cart')
	}
}



export default { 
	getCatagories, 
	getCategory, 
	getCategoryPage, 
	applyFilter, 
	getShoppingCart, 
	addToShoppingCart, 
	updateShoppingCartItem,
	dropShoppingCartStatus, 
	shoppingCartItemsCount
}