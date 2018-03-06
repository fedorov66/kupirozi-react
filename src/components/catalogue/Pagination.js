import React, { Component } from 'react';
import {connect} from 'react-redux';
import CatalogueActions from '../../actions/CatalogueActions';
import {Page} from '../catalogue'

class Pagination extends Component {

	constructor(props) {
		super(props);
		this.changePage = this.changePage.bind(this);
	}

	changePage(event) {
		const pageIndex = parseInt(event.target.getAttribute('data-page-index'), 10);
		this.props.getCategoryPage(pageIndex);
	}
	
	
	updatePages() {
		let pages = [];
		for (let i = 0; i < this.props.category.pagination.totalPages; i++) {
			pages.push(<Page changePage={this.changePage} categoryLink={this.props.categoryLink} current={this.props.category.pagination.current} key={i} caption={i + 1} index={i} />);
		}
		if (this.props.category.pagination.totalPages > 1) {
			pages.splice(0, 0, <Page className="page__direction" changePage={this.changePage} categoryLink={this.props.categoryLink} caption="Начало" key="first" index={0} />);
			pages.push(<Page className="page__direction" changePage={this.changePage} categoryLink={this.props.categoryLink} caption="Конец" key="last" index={this.props.category.pagination.totalPages - 1} />);
		}
		return pages;
	}

	render() {
		const pages = this.updatePages();
		return (
			<div className="catalog_controls__pagenation">
			{pages.length > 1 &&
				pages
			}
			</div>
		);
	}
}

let mapStateToProps = function(state){
    return { category : state.Category};
};

let mapDispatchToProps = (dispatch) => {
    return {
		getCategoryPage: (pageIndex) => {
			dispatch(CatalogueActions.getCategoryPage(pageIndex))
		}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);