import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
	  <footer className="footer">
		<div className="footer_buttons">
		  <div className="footer_buttons__button">
			<a href="http://krasnodar7.ru/top/?do=v&i=171" title="Рейтинг сайтов Краснодара"><img src="http://krasnodar7.ru/top/?do=in&id=171" alt="" /></a>
		  </div>
		  <div className="footer_buttons__button">
		  </div>
		</div>
		<div className="footer__copyrights">
		  &copy; kupirozi.ru 2011-2017 г.
		</div>
	  </footer>
    );
  }
}

export default Footer;
