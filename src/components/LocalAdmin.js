import React, { Component } from 'react';
import main from './main';
import './App.css';

class LocalAdmin extends Component {

  onIdChange=(event)=>{
    event.preventDefault()
    this.setState({id:event.target.value})
  }

  onNameChange=(event)=>{
    event.preventDefault()
    this.setState({name:event.target.value})
  }

  setPin=async ()=>{
    const pincode=await main.methods.lAdminPincodes(this.props.account).call()
    this.setState({pin:pincode})
  }

  onFIdChange=(event)=>{
    event.preventDefault()
    this.setState({fid:event.target.value})
  }

  onHospitalChange=(event)=>{
    event.preventDefault()
    this.setState({hos:event.target.value})
  }

  onCountChange=(event)=>{
    event.preventDefault()
    this.setState({count:event.target.value})
  }

  onAddrChange=(event)=>{
    event.preventDefault()
    this.setState({addr:event.target.value})
  }

  onHLocationChange=(event)=>{
    event.preventDefault()
    this.setState({home:event.target.value})
  }

  onCLocationChange=(event)=>{
    event.preventDefault()
    this.setState({curr:event.target.value})
  }

  onCoordChange=(event)=>{
    event.preventDefault()
    this.setState({coords:event.target.value})
  }

  onCreateReporter=async (event)=>{
    event.preventDefault()
    this.setPin()
    await main.methods.createReporter(this.state.id,this.state.name,this.state.pin,this.state.fid).send({from:this.props.account})
  }

  onCreateDoctor=async (event)=>{
    event.preventDefault()
    this.setPin()
    await main.methods.createDoctor(this.state.pin,this.state.addr,this.state.name,this.state.hos,this.state.fid).send({from:this.props.account})
  }

  onCreateFamily=async (event)=>{
    event.preventDefault()
    this.setPin()
    await main.methods.createFamily(this.state.pin,this.state.name,this.state.fid,this.state.count,this.state.home,this.state.curr).send({from:this.props.account})
  }

  onCreateFlat=async (event)=>{
    event.preventDefault()
    this.setPin()
    await main.methods.createFlat(this.state.pin,this.state.id,this.state.count,this.state.coords).send({from:this.props.account})
  }

  constructor(props) {
    super(props)
    this.state = {
      id:'',
      name:'',
      pin:0,
      fid:'',
      hos:'',
      addr:'',
      home:'',
      curr:'',
      count:0,
      coords:''
    }
  }

  render() {
    return (
      <div>
      <form onSubmit={this.onCreateReporter} >
      <div class="form-group">
      <label for="formGroupExampleInput">Reporter Creation:</label>
      <input type="text" class="form-control" placeholder="Reporter ID" onChange={this.onIdChange} />
      <input type="text" class="form-control" placeholder="Reporter Name" onChange={this.onNameChange} />
      <input type="text" class="form-control" placeholder="Smart Card Number" onChange={this.onFIdChange} />
      </div>
      <input type="submit"/>
      </form>
      <hr/>
      <form onSubmit={this.onCreateDoctor} >
      <div class="form-group">
      <label for="formGroupExampleInput">Doctor Creation:</label>
      <input type="text" class="form-control" placeholder="Doctor Address" onChange={this.onAddrChange} />
      <input type="text" class="form-control" placeholder="Doctor Name" onChange={this.onNameChange} />
      <input type="text" class="form-control" placeholder="Working Hostpital" onChange={this.onHospitalChange} />
      <input type="text" class="form-control" placeholder="Smart Card Number" onChange={this.onFIdChange} />
      </div>
      <input type="submit"/>
      </form>
      <hr/>
      <form onSubmit={this.onCreateFamily} >
      <div class="form-group">
      <label for="formGroupExampleInput">Family Creation:</label>
      <input type="text" class="form-control" placeholder="Family Name" onChange={this.onNameChange} />
      <input type="text" class="form-control" placeholder="Smart Card Number" onChange={this.onFIdChange} />
      <input type="number" class="form-control" placeholder="Number of Family Members" onChange={this.onCountChange} />
      <input type="text" class="form-control" placeholder="Home Location" onChange={this.onHLocationChange} />
      <input type="text" class="form-control" placeholder="Current Location" onChange={this.onCLocationChange} />
      </div>
      <input type="submit"/>
      </form>
      <hr/>
      <form onSubmit={this.onCreateFlat} >
      <div class="form-group">
      <label for="formGroupExampleInput">Flat Creation:</label>
      <input type="text" class="form-control" placeholder="Flat Name" onChange={this.onIdChange} />
      <input type="number" class="form-control" placeholder="Person Count" onChange={this.onCountChange} />
      <input type="text" class="form-control" placeholder="Co-ordinates(Latitude,Longtitude)" onChange={this.onCoordChange} />
      </div>
      <input type="submit"/>
      </form>
      </div>
    );
  }
}

export default LocalAdmin;
