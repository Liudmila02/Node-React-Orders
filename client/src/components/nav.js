import React, { Component } from "react";
import { request } from '../utils/axios';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Navigation extends Component {

  signOut() {
    request.get('/signOut')
      .then((res) => {
        this.props.history.push('/')
      });
  }

  render() {
    return (
      <div>
        <div className="nav">
          <Link className="log-out" onClick={() => this.signOut()} >Log Out</Link>
        </div>
      </div>
    )
  }
}
export default withRouter(Navigation);