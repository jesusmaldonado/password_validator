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
      validating: false
    })
  },
  handleChange(evt){
    this.setState({password: evt.target.value});
  },
  render() {
    return <div className="App">
        <div className="App-header">
            <h2>{ this.state.validating ? '': this.state.message }</h2>
        </div>
        <input className="passwordInput"
               value={this.state.password}
               onChange={this.handleChange}/>
        <button type="submit"
                disabled={this.state.validate}
                onClick={this.handleClick}>
        Validate password
        </button>
      </div>;
  },
  getInitialState() {
    return {
      message: 'Input a new password',
      password: 'samplePassword',
      validating: false
    };
  }
});
