import * as types from '../constants/ActionTypes';


const initialState = {
	data: {},
	loaded: false
};

export default function doAction(state = initialState, action) {
  switch (action.type) {

	case types.SITE_GET_PAGE:
		return state = Object.assign({}, state, {
			data: action.res.data,
			loaded: true
		});

    default:
      return state;
  }
}