import React, { Component } from 'react';
import { request } from '../utils/axios'
import { withRouter } from 'react-router'

import '../style/history-form.css'

class HistoryForm extends Component {
  state = {
    date: '',
    action: ''
  }
  handleDateChange = event => { this.setState({ date: event.target.value }) }
  handleActionChange = event => { this.setState({ action: event.target.value }) }

  handleSubmit = event => {
    event.preventDefault();
    const id = this.props.match.params.id
    request.post('/history', {order_id: id, date: this.state.date, action: this.state.action })
      .then(response => {
        window.location.href=`/client/${id}/show`
        this.props.history.push(`/client/${id}/show`)
      })
      .catch(function (err) {
        console.log(err.response);
      });
  }

  render() {
    return (
      <div>
        <div className="form-history">
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="Date"
              value={this.state.date}
              type="date"
              name="date"
              className="input-date"
              onChange={this.handleDateChange}
            />
            <input
              placeholder=""
              value={this.state.action}
              type="text"
              name="action"
              className="input-action"
              onChange={this.handleActionChange}
            />
            <button className="btn-add" type="submit">Add</button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(HistoryForm);