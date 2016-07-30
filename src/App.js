import React from 'react';
import './App.css';

export default React.createClass({
  validatePassword(){
    this.setState({message: 'Validating Password'});
  },
  handleChange(evt){
    this.setState({password: evt.target.value});
  },
  render() {
    return <div className="App">
        <div className="App-header">
          <h2>{this.state.message}</h2>
        </div>
        <input className="passwordInput"
               value={this.state.password}
               onChange={this.handleChange}/>
        <button type="submit"
                disabled={this.state.validate}
                onClick={this.validatePassword}>
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
