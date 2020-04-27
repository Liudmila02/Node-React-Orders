import React from 'react';
import { request } from '../utils/axios';
import { withRouter } from "react-router";
import HistoryForm from './history-form'
import Navigation from './nav'

import '../style/show-order.css'

class OrderShow extends React.Component {
  state = {
    Item: null,
    listHistory: []
  }

  componentDidMount() {
    this.showOrder();
    this.listHistory();
  }
  showOrder = () => {
    request.get(`/client/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          Item: res.data.order
        })
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.props.history.push('/')
        }
      });
  }

  listHistory = () => {
    request.get('/histories')
      .then(res => {
        this.setState({
          listHistory: res.data
        })
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.props.history.push('/')
        }
      });
  }

  render() {
    return (
      <div>
        <Navigation />
        <button type="button" className="btn-back" onClick={() => this.props.history.push('/orders')}>Back</button>
        <div className="show-order">
          {this.state.Item &&
            <div>
              <span className="client"> Client: <span className="show-client">{this.state.Item.client}</span> </span>
              <span className="project"> Project: <span className="show-project">{this.state.Item.project}</span> </span>
              <span className="department"> Department:  <span className="show-department">{this.state.Item.department}</span></span>

            </div>
          }
        </div>
        <HistoryForm />
        <div>
          <table id="parametr" className="table">
            <thead>
              <tr>
                <th id="th-date" className="th-date">Date</th>
                <th className="th-manager">Manager</th>
                <th className="th-action">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listHistory.map(item =>
                <tr key={item.id}>
                  <td id="date" className="item-client">{item.date.split('T')[0]}</td>
                  <td id="manager" className="item-project">Name</td>
                  <td id="action" className="item-department">{item.action}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default withRouter(OrderShow);