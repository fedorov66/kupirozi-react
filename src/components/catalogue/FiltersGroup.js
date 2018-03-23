import React, { Component } from 'react';

class FiltersGroup extends Component {

	render() {
		return (<div className="filters-group">{this.props.children}</div>);
	}

}

export default FiltersGroup;