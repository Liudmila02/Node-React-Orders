import React from 'react';
import { request } from '../utils/axios'
import { withRouter } from "react-router";

class signUpForm extends React.Component {
  state = {
    name: '',
    email: '',
    password: ''
  }
  handleUserNameChange = event => {this.setState({ name: event.target.value })}
  handleEmailChange = event => {this.setState({ email: event.target.value })}
  handlePasswordChange = event => {this.setState({ password: event.target.value })}

  handleSubmit = event => {
    event.preventDefault();

    request.post('/users', { name: this.state.name, email: this.state.email, password: this.state.password })
    .then(res => {
      this.props.history.push('/')
    })
    .catch(function (err) {
      console.log(err)
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
          placeholder="Name" 
          value={this.state.name} 
          required type="text" 
          onChange={this.handleUserNameChange} />
          <input 
          placeholder="Email Address"
          value={this.state.email} 
          type="email" 
          name="email" 
          onChange={this.handleEmailChange} />
          <input 
          placeholder="Password" 
          value={this.state.password} 
          required type="password" 
          name="password" 
          onChange={this.handlePasswordChange} />
        <button className="button-signin" type="submit">Sign up</button>
        </form>
      </div>
    )
  }
}

export default withRouter(signUpForm);