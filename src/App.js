import React from 'react';
import './App.css';
import { validatePassword } from './services/password_service';
export default React.createClass({
  handleClick(){
    this.setState({
      message: 'Validating Password',
      validating: true
    });
    const result = validatePassword(this.state.password)
    this.setState({
      message: result.message,
      password: result.modifiedPassword ? result.modifiedPassword : this.state.password,
      validating: false
    })
  },
  handleChange(evt){
    this.setState({password: evt.target.value});
  },
  render() {
    return <div className="app">
        <div className={"passwordHeader" + (this.state.validating ? ' empty' : '')}>
            <h2>{ this.state.validating ? '': this.state.message }</h2>
        </div>
        <input className="passwordInput"
               value={this.state.password}
               onChange={this.handleChange}/>
        <button className="passwordSubmit"
                type="submit"
                disabled={this.state.validating}
                onClick={this.handleClick}>
        Validate password
        </button>
      </div>;
  },
  getInitialState() {
    return {
      message: 'Input a new password',
      password: 'longInitialPassword',
      validating: false
    };
  }
});
