import React, { Component } from 'react';
import classNames from 'classnames/bind';

class Input extends Component {
  constructor(props) {
    super(props);
  }

  handleValidation(validation) {
    if (!validation) {
      return {};
    }
    const isValid = (validation != null && !(this.props.name in validation));
    return {
      isValid : isValid,
      validateMesssage : !isValid ? validation[this.props.name] : '',
      classNames : {
        'validation-success' : isValid,
        'validation-error' : !isValid
      }
    };
  }

  changeHandler(e) {
    e.currentTarget.classList.remove('validation-error');
    this.props.onChange(e);
  }

  render() {
    const validation = this.handleValidation(this.props.validation);
    const inputClasses = classNames(Object.assign({'text-field' : true}, validation.classNames || {}));
    const inputTitle = validation.validateMesssage || '';
    return (
        <input type="text" className={inputClasses} title={inputTitle} name={this.props.name} onChange={this.changeHandler.bind(this)} value={this.props.value} />
    );
  }

} export default Input;
