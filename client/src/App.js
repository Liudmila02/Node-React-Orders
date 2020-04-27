import React, {Component} from 'react'
import { Router, Route} from 'react-router-dom';

import LoginForm from './components/login';
import signUpForm from './components/signUp';
import OrderList from './components/list'
import OrderShow from './components/show-order'
import OrderEdit from './components/edit-client'
import history from './utils/history'

class App extends Component {
  render () {
  return (
    <Router history={history}>
    <div>
      <Route exact path="/" component={LoginForm} />
      <Route path="/signUp" component={signUpForm} />
      <Route path="/client/:id/edit" component={OrderEdit} />
      <Route path="/client/:id/show" component={OrderShow} /> 
      <Route path="/orders" component={OrderList} />
    </div>
  </Router>
  );
  }
}

export default App;
