import * as types from '../constants/ActionTypes';


const initialState = [];

export default function doAction(state = initialState, action) {
  switch (action.type) {

	case types.CATEGORIES_GET_DATA:
		return state.categories = action.res.data;

    default:
      return state;
  }
}