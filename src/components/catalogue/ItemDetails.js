import React, { Component } from 'react';



function ItemDetailsLine(props) {
	return (
		<li className="item-parameters-line">
			<div className="item-parameters-line__left">
				<span className="item-parameters-line__title">{props.name}</span>
				<div className="item-parameters-line__line"></div>
			</div>
			<div className="item-parameters-line__right">
				<div className="item-parameters-line__value">{props.value}</div>
			</div>
		</li>
	);
}


class ItemDetails extends Component {
	
	getText(data) {
		return {__html: data};
	}
	
	additionalInfo(item) {
		let map = {};
		if (item.height != null) {
			map['Высота'] = item.height;
		}
		if (item.width != null) {
			map['Ширина'] = item.width;
		}
		if (item.size != null) {
			map['Диаметр цветка'] = item.size;
		}
		if (item.color != null) {
			map['Цвет'] = item.color;
		}
		if (item.bloom != null) {
			map['Цветение'] = item.bloom;
		}
		if (item.aroma != null) {
			map['Аромат'] = item.aroma;
		}
		if (item.author != null) {
			map['Оригинатор (автор)'] = item.author;
		}
		if (item.stabMuchRosa != null) {
			map['Устойчивость к мучнистой росе'] = item.stabMuchRosa;
		}
		if (item.stabBlankPyat != null) {
			map['Устойчивость к черной пятнистости'] = item.stabBlankPyat;
		}
		return map;
	}

	render() {
		const item = this.props.item;
		const itemInfo = this.additionalInfo(item);
		const itemsLits = [];
		Object.keys(itemInfo).forEach((name) => {
				itemsLits.push(<ItemDetailsLine name={name} value={itemInfo[name]} />);
			}
		);
		return (
			<div className={this.props.className}>
				<h2>{item.nameRu} <span className="en_name">({item.nameEn})</span></h2>
				<div dangerouslySetInnerHTML={this.getText(item.description)} ></div>
				<ul className="item-parameters">
					{itemsLits}
				</ul>
			</div>
		)
	}
}

export default ItemDetails