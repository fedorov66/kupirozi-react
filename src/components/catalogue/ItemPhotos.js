import React, { Component } from 'react';
import {ItemImages} from '../catalogue';

function SmallImage(props) {
	const url = `http://kupirozi.ru/cache/static/images/${props.name}-mode-7.jpg`;
	return (
	<div className="small-image">
		<img src={url} />
	</div>
	);
}

class ItemPhotos extends Component {
	
	
	render() {
		const item = this.props.item;

		const images = item.images.map(item => {
			return (<SmallImage name={item.name} />)
		});
		return (
			<div className={this.props.className}>
				<ItemImages images={item.images} caption={item.nameRu} />
				<div class="small-image_container">{images}</div>
			</div>)
	}
}

export default ItemPhotos;