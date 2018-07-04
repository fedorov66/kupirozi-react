import React from 'react';
import {connect} from 'react-redux';
import CatalogueActions from '../../actions/CatalogueActions';

function CatagoriesList(props) {
	const categoriesList = props.categories.map((category) => {
			category.image = category.images[0].name;
			return <Category key={category.id} category={category} />
		}
	);
	return (<div className="catalog">{categoriesList}</div>);
}

function Category(props) {
	const category = props.category;
	const description = new DOMParser().parseFromString(category.description, "text/html").documentElement.textContent;
	return (
	 <div className="catalog__category">
		<div className="category_container">
			<div className="category_container__image thumbnail">
			  <img src={"http://kupirozi.ru/cache/static/images/" + category.image + "-mode-3.jpg"} alt={category.name} />
			</div>
			<div className="category_container__descr">
			  <a href={"/#!/catalogue/" + category.id}>{category.name}</a>
				{description}
			</div>
		</div>
	</div>
	);
}

class Categories extends React.Component {

	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		this.props.getCatagories();
	}
	
	render() {
		return (
			<CatagoriesList categories={this.props.catagories}></CatagoriesList>
		);
	}
}

let mapStateToProps = function(state){
    return { catagories : state.Categories};
};

let mapDispatchToProps = (dispatch) => {
    return {
		getCatagories: () => {
			dispatch(CatalogueActions.getCatagories());
		}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);