import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import SiteActions from '../../actions/SiteActions';

class TextPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			uri: null
		};
	}

	loadPageIfNeeded() {
		const uri = this.props.match.params.pageName;
		if (this.state.uri !== uri) {
			this.setState((prevState) => {
				return Object.assign({}, prevState, {
					uri: uri
				});
			});
			this.props.getPageData(uri);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		this.loadPageIfNeeded();
	}

	componentDidMount() {
		this.loadPageIfNeeded();
	}

	getText() {
		return {__html: this.props.textPage.data.text};
	}

	render() {
		if (!this.props.textPage.loaded) {
			return (<div>Загрузка</div>);
		}
		return (
			<div className="text-page_container">
				<h2>{this.props.textPage.data.title}</h2>
				<div dangerouslySetInnerHTML={this.getText()} />
			</div>
		);
	}

}

let mapStateToProps = function(state){
    return { textPage : state.TextPage};
};

let mapDispatchToProps = (dispatch) => {
    return {
		getPageData: (uri) => {
			dispatch(SiteActions.getPageData(uri));
		}
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TextPage));
