import React, { Component } from 'react';
import {connect} from 'react-redux';
import CatalogueActions from '../../actions/CatalogueActions';
import {Pagination, Controls, FiltersGroup, FilterCheckbox, ItemImages} from '../catalogue';
import {Link} from 'react-router-dom';
import classNames from 'classnames/bind';
import axios from 'axios';


function ItemsList(props) {
	const itemsLits = props.items.map((item) => {
			item.image = item.images.length > 0 ? item.images[0].name : 'empty';
			return <Item addToCart={props.addToCart} key={item.id} item={item} />
		}
	);
	return (<div className="catalog">{itemsLits}</div>);
}

class Item extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			quantity : 1
		};
	}
	
	handleCountPlus(e) {
		this.setState(Object.assign({}, {quantity : (this.state.quantity + 1)}));
	}
	
	handleCountMinus(e) {
		if (this.state.quantity > 0) {
			this.setState(Object.assign({}, {quantity : (this.state.quantity - 1)}));
		}
	}
	
	changeCountValue(e) {
		const intValue = Number.parseInt(e.currentTarget.value, 10);
		let curValue = this.state.quantity;
		if (!Number.isNaN(intValue)) {
			curValue = intValue;
		}
		this.setState(Object.assign({}, {quantity : curValue}));
	}
	
	addToCart(e) {
		e && e.preventDefault();
		let button = e.currentTarget;
		button.setAttribute('disabled', true);
		button.classList.add('running');
		this.props.addToCart(this.state.quantity, this.props.item.id, button);
	}

	render() {
		const item = this.props.item;
		const available = item.quantityAvailable > 0;
		const availableText = available ? 'В наличии' : 'Нет в наличии';
		const availablePrice = available ? item.price + ' ₽ ' : '-';
		const itemClasses = classNames({
			'item_container' : true,
			'item__sold' : item.quantityAvailable <= 0,
			'item__new' : item.isNew,
			'item__ii' :  item.isNewText != null && item.isNewText !== ''
		});
		return (
		  <div className="catalog__category catalog_category__item">
			<div className={itemClasses}>
			  <div className="category_container__image thumbnail">
			  {/*<ItemImages images={item.images} caption={item.nameRu} />*/}
			  </div>
			  <div className="catalog__item_descr">
				<div className="item__name">
				  <Link to={"/catalogue/" + item.categoryId + "/" + item.id}>{item.nameRu}</Link><br/>
				  <span className="item__enName">({item.nameEn})</span>
				</div>
				<div className="item__price">
				  Цена: <span>{availablePrice}</span> <span className="item__availability">({availableText})</span>
				</div>
			  </div>
			  {available ? (
				<div className="addToCart__container">
					<div className="addToCart__quantity">
						<input type="text" name="quantity" autocomplete="off" onChange={(e) => this.changeCountValue(e) } value={this.state.quantity} />
						<div class="arrows__container">
							<div class="arrow__up" onClick={(e) => this.handleCountPlus(e)}><img src="/assets/img/up-arrow.png" alt="Добавить" /></div>
							<div class="arrow__down" onClick={(e) => this.handleCountMinus(e)}><img src="/assets/img/down-arrow.png" alt="Убать" /></div>
						</div>
					</div>
					<button onClick={(e) => this.addToCart(e)} className="ld-over catalog__item_addToCart">
						<span>Добавить в корзину</span>
						<div class="ld ld-ball ld-flip"></div>
					</button>
				</div>
			  ) : (
			  <button className="catalog__item_soldout" disabled="disabled">Нет в наличии</button>
			  )}
			</div>
		  </div>
		)
	}
}

class Category extends Component {

	constructor(props) {
		super(props);
		this.changePage = this.changePage.bind(this);
		this.addToCart = this.addToCart.bind(this);
	}
	
	componentDidMount() {
		let pageIndex = this.props.match.params.pageIndex;
		this.props.getCategory(this.props.match.params.catId, pageIndex != null ? parseInt(pageIndex, 10) - 1 : 0);
	}
	
	componentWillReceiveProps(nextProps) {
		let status = nextProps.shoppingCart.actionStatus;
		if (status != null && status === "NOT_AVAILABLE") {
			alert('Не удалось добавить в корзину');
			this.props.dropShoppingCartStatus();
		}
	}
	
	addToCart(quantity, itemId, button) {
		const params = {
			item_id: itemId,
			quantity: quantity
		};
		new Promise((resolve, reject) => {		
			resolve(this.props.addToShoppingCart(params));
		}).then(function(res) {
			if (res && res.data.status === 'NOT_AVAILABLE') {
				alert('В наличии есть ' + res.data.available + ' шт. (Вы запросили: ' + quantity + ' шт.)');
			}
			button.removeAttribute('disabled');
			button.classList.remove('running')
		});
		
	}
	
	changePage(pageIndex) {
		this.props.getPage(pageIndex);
	}
	
	render() {
		if (this.props.category.loaded) {
			return (
				<div>
					<Controls>
						<FiltersGroup>
							<FilterCheckbox name="AVAILABILITY" caption="Только в наличии" />
						</FiltersGroup>
						<Pagination changePage={this.changePage} categoryLink={'/catalogue/' + this.props.match.params.catId + '/page/'} parent={this} />
					</Controls>
					<ItemsList addToCart={this.addToCart} parent={this} items={this.props.category.items}></ItemsList>
					<Controls>
						<Pagination changePage={this.changePage} categoryLink={'/catalogue/' + this.props.match.params.catId + '/page/'} parent={this} />
					</Controls>
				</div>
			);
		} else {
			return (
				<div>Загрузка...</div>
			)
		}
		
	}
}

let mapStateToProps = function(state){
    return {
		category : state.Category, 
		shoppingCart : state.ShoppingCart
	};
};

let mapDispatchToProps = (dispatch) => {
    return {
		getCategory: (id, pageIndex) => {
			dispatch(CatalogueActions.getCategory(id, pageIndex));
		},
		getPage: (pageIndex) => {
			dispatch(CatalogueActions.getCategoryPage(pageIndex));
		},
		addToShoppingCart: (params) => {
			return dispatch(CatalogueActions.addToShoppingCart(params));
		},
		dropShoppingCartStatus: () => {
			dispatch(CatalogueActions.dropShoppingCartStatus());
		}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
