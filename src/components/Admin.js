import React, { Component } from 'react';
import main from './main';
import './App.css';

class Admin extends Component {

  onAddrChange=(event)=>{
    event.preventDefault()
    this.setState({addr:event.target.value})
  }

  onPinChange=(event)=>{
    event.preventDefault()
    this.setState({pin:event.target.value})
  }

  onAadhaarChange=(event)=>{
    event.preventDefault()
    this.setState({aadhaar:event.target.value})
  }

  onCreatelAdmin=async (event)=>{
    event.preventDefault()
    await main.methods.createLocalAdmin(this.state.addr,this.state.aadhaar,this.state.pin).send({from:this.props.account})
  }

  constructor(props) {
    super(props)
    this.state = {
      addr:'',
      pin:'',
      aadhaar:''
    }
  }

  render() {
    return (
      <div>
      <form onSubmit={this.onCreatelAdmin} >
      <div class="form-group">
      <label for="formGroupExampleInput">LocalAdmin Creation:</label>
      <input type="text" class="form-control" placeholder="Address" onChange={this.onAddrChange} />
      <input type="text" class="form-control" placeholder="Aadhaar" onChange={this.onAadhaarChange} />
      <input type="number" class="form-control" placeholder="Pincode" onChange={this.onPinChange} />
      </div>
      <input type="submit"/>
      </form>
      </div>
    );
  }
}

export default Admin;
