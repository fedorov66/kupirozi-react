import * as types from '../constants/ActionTypes';


const initialState = {
	sourceItems : [],
	filteredItems : [],
	items: [],
	filters: {},
	sortBy: 'PRICE',
	loaded: false
};

const getPaginationData = (itemsTotal, pageIndex) => {
	let itemPerPage = 24;
	let offset, limit;
	let totalPages = Math.ceil(itemsTotal / itemPerPage);
	pageIndex = pageIndex > (totalPages - 1) ? totalPages - 1 : pageIndex;
	offset = (pageIndex * itemPerPage);
	limit = (itemsTotal - offset > itemPerPage ? offset + itemPerPage : offset + (itemsTotal - offset));
	return {
		current : pageIndex,
		totalPages : totalPages,
		offset : offset,
		limit : limit
	}
};

const applyFilters = (state, pageIndex) => {
	let filteredItems = state.sourceItems.slice();
	
	filteredItems = filteredItems.filter(item => {
		let include = true;
		Object.keys(state.filters).forEach(key => {
			if (key == 'AVAILABILITY' && state.filters[key].value) {
				if (item.quantityAvailable <= 0) {
					include = false;
				}
			}
		});				
		return include;
	});
	
	if (state.sortBy != null) {
		filteredItems = filteredItems.sort(function(a, b) {
			let result = 0;
			switch (state.sortBy) {
				case 'ITEM_NAME':
					if (a.nameRu > b.nameRu) {
						result = 1;
					} else {
						result = (a.nameRu < b.nameRu ? -1 : 0);
					}
					break;
				default:
					console.log('price');
					result = Number(a.price) - Number(b.price);
					break;
			}
			return result;
		}.bind(this));
	}

	const pagination = getPaginationData(filteredItems.length, pageIndex);
	
	return Object.assign({}, state, {
		filteredItems: filteredItems,
		items: filteredItems.slice(pagination.offset, pagination.limit),
		pagination: pagination,
		loaded: true
	});
};

export default function doAction(state = initialState, action) {
	
	let pagination = null;
	const pageIndex = action.pageIndex != null ? action.pageIndex : 0;
	
	switch (action.type) {
		
		case types.CATEGORY_GET_PAGE_DATA:		
			return state = applyFilters(state, pageIndex);
		
		  
		case types.CATEGORY_GET_DATA:
			state.sourceItems = action.res.data.items;
			return state = applyFilters(state, pageIndex);
			
		case types.CATEGORY_APPLY_FILTER:
			state.filters[action.filter.name] = action.filter;
			return state = applyFilters(state, pageIndex);

		case types.CATEGORY_SORT_BY:
			state.sortBy = action.sortBy;
			return state = applyFilters(state, pageIndex);
			
		default:
		  return state;
	}
}