import React, { Component } from "react";
import { request } from '../utils/axios';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import ClientForm from './clients'
import Navigation from './nav'

import '../style/list.css'
import PaletteIcon from '@material-ui/icons/Palette';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

class OrderList extends Component {
  constructor(props){
    super(props)
    this.state = {
      listItems: [],
      color: ''
    }; 
  }

  componentDidMount() {
    request.get('/orders')
      .then(res => {
        console.log(res.data);
        this.setState({
          listItems: res.data
        })
      })
      .catch((err) => {
        if (err.response.status === 401){
          this.props.history.push('/')
        }
      });
  }
 
  deleteItem = (id) => {
    request.delete(`/client/${id}`)
    .then(res => {
      const filteredItems = this.state.listItems.filter(item => {
        return item.id !== id
      })
      this.setState({
        listItems: filteredItems,
      })
    })
    .catch(function (err) {
      console.log(err.response.data);
    })
  }

  signOut() {
    request.get('/signOut')
    .then((res) => {
      this.props.history.push('/')
    }); 
  }
  
  palette (id) {
    const row = id
  }

  changeColorOnGreen() {
   
  }
  changeColorOnYellow() {

  }
  changeColorOnLigthBlue() {

  }
  changeColorOnDarkBlue() {

  }
  changeColorOnPink() {

  }
  changeColorOnRed() {

  }
  changeColorOnWhite() {

  }
  changeColorOnPurple() {

  }

  render() {
    return (
        <div>
          <Navigation />
          <div className="form-order">
            <ClientForm />
          </div>
          <div>
          <table className="table">
            <thead>
              <tr>
                <th className="th-option"></th>
                <th className="th-client">Client</th>
                <th className="th-project">Project</th>
                <th className="th-department">Department</th>
                <th className="th-estimate">Estimate (h)</th>
                <th className="th-budget">Budget ($)</th>
                <th className="th-start-date">Start Date</th>
                <th className="th-history">History</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listItems.map(item => 
              <tr key={item.id}>
                <td className="item-option">
                  <button className="icon-palette" onClick={() => this.palette(item.id)}><PaletteIcon /></button>
                  <Link className="icon-create" to={`/client/${item.id}/edit`}><CreateIcon /></Link>
                  <button className="icon-delete" onClick={() => this.deleteItem(item.id)}><DeleteIcon /></button>
                </td>
                <td className="item-client">{item.client}</td>
                <td className="item-project">{item.project}</td>
                <td className="item-department">{item.department}</td>
                <td className="item-estimate">{item.estimate}</td>
                <td className="item-budget">{item.budget}</td>
                <td className="item-start-date">{item.start_date.split('T')[0]}</td>
                <td><Link to={`/client/${item.id}/show`} >nothing yet</Link></td>
              </tr>  )}
             
            </tbody>
          </table>
          <table className="palette">
            <tbody>
              <tr>
                <td className="green" onClick={this.changeColorOnGreen} />
                <td className="yellow" onClick={this.changeColorOnYellow}/>
              </tr>
              <tr>
                <td className="ligth-blue" onClick={this.changeColorOnLigthBlue} />
                <td className="dark-blue" onClick={this.changeColorOnDarkBlue} />
              </tr>
              <tr>
                <td className="red" onClick={this.changeColorOnRed} />
                <td className="pink" onClick={this.changeColorOnPink} />
              </tr>
              <tr>
                <td className="purple" onClick={this.changeColorOnPurple}/>
                <td className="white" onClick={this.changeColorOnWhite}/>
              </tr>
            </tbody>
          </table>
          </div>        
        </div>
     
    );
  }
}

export default withRouter(OrderList);