import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';

class ItemImages extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			photoIndex: 0,
			isOpen: false,
		};
	}
	
	formatImageUrl(name, mode = 3) {
		return `http://kupirozi.ru/cache/static/images/${name}-mode-${mode}.jpg`;
	}
	
	render() {
		const { photoIndex, isOpen } = this.state;
		const images = this.props.images.map(image => this.formatImageUrl(image.name, 6));		
		const mainImage = this.props.images.length > 0 ? this.formatImageUrl(this.props.images[0].name) : this.formatImageUrl('empty');		
		return (
			<div className="item-images" onClick={() => this.setState({ isOpen: true })}>
				<img src={mainImage} alt={this.props.caption} />
				{isOpen && (
				  <Lightbox
					mainSrc={images[photoIndex]}
					nextSrc={images[(photoIndex + 1) % images.length]}
					prevSrc={images[(photoIndex + images.length - 1) % images.length]}
					onCloseRequest={() => this.setState({ isOpen: false })}
					onMovePrevRequest={() =>
					  this.setState({
						photoIndex: (photoIndex + images.length - 1) % images.length,
					  })
					}
					onMoveNextRequest={() =>
					  this.setState({
						photoIndex: (photoIndex + 1) % images.length,
					  })
					}
				  />
				)}
			</div>
		)
	}
	
}

export default ItemImages;