import React, { Component } from 'react';
import axios from 'axios';
import {ItemPhotos, ItemDetails} from '../catalogue';

class Item extends Component {
	
	constructor(props) {
	  super(props);
	  this.state = {
		  data: {}
	  }
	}

	componentDidMount() {
		const params = this.props.match.params;
		axios.get('/api/category/' + params.catId + '/' + params.id).then((response) => {
			this.setState({data: response.data});
		}).catch((error) => {
			debugger;
		});	
	}
	
	render() {
		if (this.state.data.id != null) {
			return (
			  <div className="catalog_item_container">
				<ItemPhotos className="catalog_item_photos" item={this.state.data} />
				<ItemDetails className="catalog_item_details" item={this.state.data} />
			  </div>
			);			
		} else {
			return (<div>loading...</div>);
		}
	}
}

export default Item;