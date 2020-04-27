import React from 'react';
import { request } from '../utils/axios'
import { withRouter } from "react-router";

import '../style/clients.css'

class ClientForm extends React.Component {
  state = {
    client: '',
    project: '',
    department: '',
    estimate: '',
    budget: '',
    start_date: ''
  }

  ClientChange = event => {this.setState({ client: event.target.value })}
  ProjectChange = event => {this.setState({ project: event.target.value })}
  DepartmentChange = event => {this.setState({ department: event.target.value })}
  EstimateChange = event => {this.setState({ estimate: event.target.value })}
  BudgetChange = event => {this.setState({ budget: event.target.value })}
  StartDateChange = event => {this.setState({ start_date: event.target.value })}

  handleSubmit = event => {
    event.preventDefault();
  const { client, project, department, estimate, budget, start_date } = this.state
    request.post('/clients', {client: client, project: project, department, estimate, budget, start_date})
     .then(response => {
      window.location.href='/orders'
       this.props.history.push('/orders')
     })
     .catch(function (err) {
       console.log(err);
     });
   }
   render() {
    return (
      <div>    
        <form 
          className="form-client"
          onSubmit={this.handleSubmit}>
            <input 
              placeholder="Name"
              value={this.state.client}
              required type="text" 
              name="client"  
              className="input-client"
              onChange={this.ClientChange}
            />
            <input 
              placeholder="Project"
              value={this.state.project} 
              required type="text"
              name="project"  
              className="input-project"
              onChange={this.ProjectChange} 
            />
            <select 
              value={this.state.department}  
              className="input-department"
              onChange={this.DepartmentChange}>
              <option value="" disabled selected>Department</option>
              <option value="Milestep">Milestep</option>
              <option value="LibidoSoft">LibidoSoft</option>
            </select>
            <input 
              placeholder="Est"
              value={this.state.estimate} 
              required type="text"
              name="estimate"  
              className="input-estimate"
              onChange={this.EstimateChange} 
            />
            <input 
              placeholder="Bdjt"
              value={this.state.budget} 
              required type="text"
              name="budget" 
              className="input-budget" 
              onChange={this.BudgetChange} 
            />
            <input 
              placeholder="Start Date"
              value={this.state.start_date} 
              required type="date"
              name="start_date"  
              className="input-start-date"
              onChange={this.StartDateChange} 
            />
          <button type="submit" className="btn-create">Create</button>
        </form>
      </div>
    )
  }
}
export default withRouter(ClientForm);