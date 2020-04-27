import React from "react";
import { request } from '../utils/axios';
import { withRouter } from "react-router";

class OrderEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      client: '',
      project: '',
      department: '',
      estimate: '',
      budget: '',
      start_date: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getOrderDetails();
  }

  getOrderDetails() {
    let id = this.props.match.params.id;
    request.get(`/client/${id}`)
      .then(response => {
        this.setState({
          id: response.data.order.id,
          client: response.data.order.client,
          project: response.data.order.project,
          department: response.data.order.department,
          estimate: response.data.order.estimate,
          budget: response.data.order.budget,
          start_date: response.data.order.start_date.split('T')[0]
        }, () => {
        })
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 401) {
          this.props.history.push('/')
        }
      });
  }

  editOrder(newOrder) {
    request({
      method: 'put',
      url: `/client/${this.props.match.params.id}`,
      data: newOrder
    }).then(response => {
      this.props.history.push('/orders')
    })
      .catch((err) => {
        console.log(err)
      });
  }

  onSubmit(e) {
    e.preventDefault()
    const newOrder = {
      client: this.refs.client.value,
      project: this.refs.project.value,
      department: this.refs.department.value,
      estimate: this.refs.estimate.value,
      budget: this.refs.budget.value,
      start_date: this.refs.start_date.value
    }
    this.editOrder(newOrder);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            value={this.state.client}
            required type="text"
            name="client"
            ref="client"
            className="input-client"
            onChange={this.handleInputChange}
          />
          <input
            value={this.state.project}
            required type="text"
            name="project"
            ref="project"
            className="input-project"
            onChange={this.handleInputChange}
          />
          <select
            value={this.state.department}
            ref="department"
            value={this.state.value}
            className="input-department"
            onChange={this.handleInputChange}>
            <option value="" disabled selected>Department</option>
            <option value="Milestep">Milestep</option>
            <option value="LibidoSoft">LibidoSoft</option>
          </select>
          <input
            value={this.state.estimate}
            required type="text"
            name="estimate"
            ref="estimate"
            className="input-estimate"
            onChange={this.handleInputChange}
          />
          <input
            value={this.state.budget}
            required type="text"
            name="budget"
            ref="budget"
            className="input-budget"
            onChange={this.handleInputChange}
          />
          <input
            value={this.state.start_date}
            required type="date"
            name="start_date"
            ref="start_date"
            className="input-start-date"
            onChange={this.handleInputChange}
          />
          <button type="submit" className="btn-create">Edit</button>
        </form>
      </div>
    )
  }
}

export default withRouter(OrderEdit)