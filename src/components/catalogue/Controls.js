import React, { Component } from 'react';

class Controls extends Component {

	render() {
		return (<div className="catalog_controls">{this.props.children}</div>);
	}

}

export default Controls;