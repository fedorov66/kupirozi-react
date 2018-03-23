import React, { Component } from 'react';
import {connect} from 'react-redux';
import CatalogueActions from '../../actions/CatalogueActions';

class Filter extends Component {	
	
	componentDidMount() {
		/*
		this.props.applyFilter({
			name: 'AVAILABILITY',
			value: true
		});*/
	}

	applyFilter(event) {
		let checked = event.target.checked;
		
		this.setState(prevState => {
			return Object.assign({}, prevState, {checked: checked});
		});
		
		this.props.applyFilter({
			name: 'AVAILABILITY',
			value: checked
		});
	}

	render() {
		return (
			<div className="filter">
				<input type="checkbox" name="filter-availability" checked={this.state.checked} onChange={this.applyFilter} value="true" /> - Только в наличии
			</div>
		);
	}

}

let mapStateToProps = function(state){
    return { category : state.Category};
};

let mapDispatchToProps = (dispatch) => {
    return {
		applyFilter: (filter) => {
			dispatch(CatalogueActions.applyFilter(filter));
		}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
