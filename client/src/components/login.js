import React, {Component} from 'react';
import { request } from '../utils/axios'
import { withRouter } from 'react-router'

import '../style/login.css'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  }
  handleEmailChange = event => { this.setState({ email: event.target.value })}
  handlePasswordChange = event => {this.setState({ password: event.target.value })}

  handleSubmit = event => {
    event.preventDefault();
    request.post('/login', { email: this.state.email, password: this.state.password })
    .then(response => {
      this.props.history.push('/orders')
    })
    .catch(function (err) {
      console.log(err.response.data);
    });
  }

  render() {
    return (
      <div>
        <div className="form-login">
          <form onSubmit={this.handleSubmit}>
              <input 
                placeholder="Email Address" 
                value={this.state.email} 
                type="email" 
                name="email" 
                className="input-email"
                onChange={this.handleEmailChange} 
              />
              <br/>
              <input 
                placeholder="Password" 
                value={this.state.password} 
                type="password" 
                name="password" 
                className="input-password"
                onChange={this.handlePasswordChange} 
              />
              <br />
            <button className="button-signin" type="submit">Sign in</button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(LoginForm);