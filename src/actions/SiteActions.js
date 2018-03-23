import * as types from '../constants/ActionTypes';
import axios from 'axios';

function getPageData(uri) {
	return {
		type: types.SITE_GET_PAGE,
		promise: axios.get('/api/page/' + uri)
	}
}

export default {getPageData}