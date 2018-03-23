import React, { Component } from 'react';
import {connect} from 'react-redux';
import CatalogueActions from '../../actions/CatalogueActions';
import {reactLocalStorage} from 'reactjs-localstorage';

class FilterCheckbox extends Component {
	
	constructor(props) {
		super(props);	
		this.state = {
			checked : this.getBoolean(reactLocalStorage.get(`${this.props.name}__state.checked`, false))
		};
		this.applyFilter = this.applyFilter.bind(this);
		this.applyFilter(null, this.state.checked);
		
	}
	
	getBoolean(value) {
		if (value != null) {
			if (typeof(value) === 'string') {
				value = value === 'true';
			}
			return value;
		}
		return false;
	}

	applyFilter(event, value) {
		let checked = this.getBoolean(event ? event.target.checked : value);

		this.setState(prevState => {
			reactLocalStorage.set(`${this.props.name}__state.checked`, checked);
			return Object.assign({}, prevState, {checked: checked});
		});
		
		this.props.applyFilter({
			name: this.props.name,
			value: checked
		});
	}

	render() {
		return (
			<div className="filter">
				<input type="checkbox" name={"filter-" + this.props.name} checked={this.state.checked} onChange={this.applyFilter} value="true" /> - <span>{this.props.caption}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterCheckbox);
