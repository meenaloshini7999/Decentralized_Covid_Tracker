import React, { Component } from 'react';
import main from './main';
import './App.css';

class Doctor extends Component {

  onIdChange=(event)=>{
    event.preventDefault()
    this.setState({id:event.target.value})
  }

  onNameChange=(event)=>{
    event.preventDefault()
    this.setState({name:event.target.value})
  }

  onFIdChange=(event)=>{
    event.preventDefault()
    this.setState({fid:event.target.value})
  }

  onFlagChange=(event)=>{
    event.preventDefault()
    if(event.target.value==='YES')
    this.setState({flag:true})
  }

  onSignHRecord=async (event)=>{
    event.preventDefault()
    await main.methods.flagCovidStatus(this.state.id,this.state.name,this.state.fid,this.state.flag).send({from:this.props.account})
  }

  constructor(props) {
    super(props)
    this.state = {
      id:'',
      name:'',
      fid:'',
      flag:false
    }
  }

  render() {
    return (
      <div>
      <div className="cusform boxed">
      <form onSubmit={this.onSignHRecord} >
      <div class="form-group">
      <label for="formGroupExampleInput">Sign HealthRecord:</label>
      <input type="text" class="form-control" placeholder="HealthRecord ID" onChange={this.onIdChange} />
      <input type="text" class="form-control" placeholder="Flat Name" onChange={this.onNameChange} />
      <input type="text" class="form-control" placeholder="Smart Card ID" onChange={this.onFIdChange} />
      <input type="text" class="form-control" placeholder="Type YES if Tested Positive" onChange={this.onFlagChange} />
      </div>
      <input type="submit" className="btn btn-success"/>
      </form>
      </div>
      </div>
    );
  }
}

export default Doctor;
