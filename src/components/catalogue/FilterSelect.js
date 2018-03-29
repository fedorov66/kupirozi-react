import React, { Component } from 'react';
import {connect} from 'react-redux';
import CatalogueActions from '../../actions/CatalogueActions';
import {reactLocalStorage} from 'reactjs-localstorage';


function SelectControl(props) {
	const optionsList = props.options.map((option) => {
			return <Option key={option.value} value={option.value} caption={option.caption} />
		}
	);
	return (
		<div className="custom-select">
			<select onChange={props.parent.handleChange}>{optionsList}</select>
		</div>
	);
}
class Option extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (<option value={this.props.value}>{this.props.caption}</option>);
	}
}

class FilterSelect extends Component {
	
	constructor(props) {
		super(props);	
		this.state = {
			sortBy: 'PRICE'
		};
		this.options = [
			{
				caption: 'По цене',
				value: 'PRICE'
			},
			{
				caption: 'По названию',
				value: 'ITEM_NAME'
			}
		];
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange(e) {
		const value = e.currentTarget.querySelector('option:checked').value;
		this.setState(Object.assign({}, { sortBy: value }));
		this.props.sortBy(value);
	}

	render() {
		return (
			<div className="filter">
				<label>{this.props.caption}</label> <SelectControl parent={this} options={this.options} />
			</div>
		);
	}

}

let mapStateToProps = function(state){
    return { category : state.Category};
};

let mapDispatchToProps = (dispatch) => {
    return {
		sortBy: (sortBy) => {
			dispatch(CatalogueActions.sortBy(sortBy));
		}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterSelect);
