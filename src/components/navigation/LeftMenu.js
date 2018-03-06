import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames/bind';
import axios from 'axios';

function MenuList(props) {
	const listItems = props.items.map((item) =>
		<MenuItem key={item.uri} item={item} />
	);
	return (<div className="leftmenu">{listItems}</div>);
}

function MenuItem(props) {
	const item = props.item;
	var itemClasses = classNames({
      'leftmenu__item': true,
      'important': item.important
    });
	return	(<div className={itemClasses}>
		<Link to={item.uri}>{item.name}</Link>
	</div>);
}

class LeftMenu extends Component {
	
	constructor(props) {
	  super(props);
	  this.state = {
		  data: null
	  }
	}

	componentDidMount() {
		axios.get('/api/navigation').then((response) => {
			this.setState({data: response.data});
		}).catch((error) => {
			debugger;
		});	
	}

	render() {
		if (this.state.data != null) {
			return (
				<MenuList items={this.state.data}></MenuList>
			);			
		} else {
			return (<div>loading...</div>);
		}
	}
}

export default LeftMenu;