import React, { Component } from 'react';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

class Page extends Component {

	render() {
		let definedClasses = {};
		if (this.props.className != null) {
			definedClasses = this.props.className.split(' ').reduce((obj, cur, i) => { return { ...obj, [cur]: true }; }, {});
		}
		let classes = classNames(Object.assign({}, {
			'pagenation__page' : true,
			'current': this.props.index === this.props.current
		}, definedClasses));

		return (			
				<Link to={this.props.categoryLink + (this.props.index + 1)} className={classes} onClick={this.props.changePage} data-page-index={this.props.index}>{this.props.caption}</Link>
		);
	}

}

export default Page;