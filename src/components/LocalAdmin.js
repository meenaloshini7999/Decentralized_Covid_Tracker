import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Nav} from 'react-bootstrap';
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

  onDescChange=(event)=>{
    event.preventDefault()
    this.setState({desc:event.target.value})
  }

  onValChange=(event)=>{
    event.preventDefault()
    this.setState({val:event.target.value})
  }

  onAddTemp=(event)=>{
    event.preventDefault()
    if(this.state.val!==''){
    let val=this.state.disp
    if(val!=='')
    val=val+','
    this.setState({disp:val+this.state.val})
  }
  }

  onCreateReporter=async (event)=>{
    event.preventDefault()
    await this.setPin()
    await main.methods.createReporter(this.state.id,this.state.name,this.state.pin,this.state.fid).send({from:this.props.account})
  }

  onCreateDoctor=async (event)=>{
    event.preventDefault()
    await this.setPin()
    await main.methods.createDoctor(this.state.pin,this.state.addr,this.state.name,this.state.hos,this.state.fid).send({from:this.props.account})
  }

  onCreateFamily=async (event)=>{
    event.preventDefault()
    await this.setPin()
    await main.methods.createFamily(this.state.pin,this.state.name,this.state.fid,this.state.count,this.state.home,this.state.curr).send({from:this.props.account})
  }

  onCreateFlat=async (event)=>{
    event.preventDefault()
    await this.setPin()
    await main.methods.createFlat(this.state.pin,this.state.id,this.state.count,this.state.coords).send({from:this.props.account})
  }

  onRelocate=async (event)=>{
    event.preventDefault()
    await this.setPin()
    await main.methods.relocation(this.state.pin,this.state.curr,this.state.fid).send({from:this.props.account})
  }

  onUpdateHRecord=async (event)=>{
    event.preventDefault()
    await this.setPin()
    let ts=Date.now().toString()
    alert('Created Record ID: '+this.state.fid+ts)
    await main.methods.createHealthRecord(this.state.pin,this.state.id,this.state.fid,this.state.fid+ts,this.state.disp,ts,this.state.desc).send({from:this.props.account})
  }
  tabSwitch=(eventKey)=>{
    if(eventKey==='reporter'){
      this.setState({reporterForm:'block'})
      this.setState({DoctorForm:'none'})
      this.setState({familyForm:'none'})
      this.setState({flatForm:'none'})
      this.setState({relocateForm:'none'})
      this.setState({healthRecForm:'none'})
     }
     else if(eventKey==='Doctor'){
      this.setState({reporterForm:'none'})
      this.setState({DoctorForm:'block'})
      this.setState({familyForm:'none'})
      this.setState({flatForm:'none'})
      this.setState({relocateForm:'none'})
      this.setState({healthRecForm:'none'})
     }
     else if(eventKey==='family'){
       this.setState({reporterForm:'none'})
      this.setState({DoctorForm:'none'})
      this.setState({familyForm:'block'})
      this.setState({flatForm:'none'})
      this.setState({relocateForm:'none'})
      this.setState({healthRecForm:'none'})
     }
     else if(eventKey==='flat'){
       this.setState({reporterForm:'none'})
      this.setState({DoctorForm:'none'})
      this.setState({familyForm:'none'})
      this.setState({flatForm:'block'})
      this.setState({relocateForm:'none'})
      this.setState({healthRecForm:'none'})
     }
       else if(eventKey==='relocate'){
       this.setState({reporterForm:'none'})
      this.setState({DoctorForm:'none'})
      this.setState({familyForm:'none'})
      this.setState({flatForm:'none'})
      this.setState({relocateForm:'block'})
      this.setState({healthRecForm:'none'})
     }
     else{
       this.setState({reporterForm:'none'})
      this.setState({DoctorForm:'none'})
      this.setState({familyForm:'none'})
      this.setState({flatForm:'none'})
      this.setState({relocateForm:'none'})
      this.setState({healthRecForm:'block'})

     }
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
      coords:'',
      disp:'',
      desc:'',
      val:0,
      reporterForm:'block',
      DoctorForm:'none',
      familyForm:'none',
      flatForm:'none',
      relocateForm:'none',
      healthRecForm:'none'
    }
  }

  render() {
    return (
      <div>
      <div className="bg">
      <Nav variant="tabs" defaultActiveKey="reporter" onSelect={this.tabSwitch} style={{background:'black',marginBottom:'75px'}} id='txt'>
      <Nav.Item>
        <Nav.Link eventKey="reporter" >Create Reporter</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Doctor">Create Doctor</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="family">Create Family</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="flat">Create Flat</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="relocate">Relocate Location</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="health">Create Health Record</Nav.Link>
      </Nav.Item>
      </Nav>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <div className="cusform ml-15">
      <form onSubmit={this.onCreateReporter} style={{display:this.state.reporterForm}}>
      <div class="form-group">
      <label for="formGroupExampleInput">Reporter Creation:</label>
      <input type="text" class="form-control" placeholder="Reporter ID" onChange={this.onIdChange} />
      <input type="text" class="form-control" placeholder="Reporter Name" onChange={this.onNameChange} />
      <input type="text" class="form-control" placeholder="Smart Card ID" onChange={this.onFIdChange} />
      </div>
      <input type="submit" className="btn btn-success" />
      </form>

      <form onSubmit={this.onCreateDoctor} style={{display:this.state.DoctorForm}}>
      <div class="form-group">
      <label for="formGroupExampleInput">Doctor Creation:</label>
      <input type="text" class="form-control" placeholder="Doctor Address" onChange={this.onAddrChange} />
      <input type="text" class="form-control" placeholder="Doctor Name" onChange={this.onNameChange} />
      <input type="text" class="form-control" placeholder="Working Hostpital" onChange={this.onHospitalChange} />
      <input type="text" class="form-control" placeholder="Smart Card ID" onChange={this.onFIdChange} />
      </div>
      <input type="submit" className="btn btn-success"/>
      </form>

      <form onSubmit={this.onCreateFamily} style={{display:this.state.familyForm}}>
      <div class="form-group">
      <label for="formGroupExampleInput">Family Creation:</label>
      <input type="text" class="form-control" placeholder="Family Name" onChange={this.onNameChange} />
      <input type="text" class="form-control" placeholder="Smart Card ID" onChange={this.onFIdChange} />
      <input type="number" class="form-control" placeholder="Number of Family Members" onChange={this.onCountChange} />
      <input type="text" class="form-control" placeholder="Home Location" onChange={this.onHLocationChange} />
      <input type="text" class="form-control" placeholder="Current Location" onChange={this.onCLocationChange} />
      </div>
      <input type="submit" className="btn btn-success"/>
      </form>

      <form onSubmit={this.onCreateFlat} style={{display:this.state.flatForm}}>
      <div class="form-group">
      <label for="formGroupExampleInput">Flat Creation:</label>
      <input type="text" class="form-control" placeholder="Flat Name" onChange={this.onIdChange} />
      <input type="number" class="form-control" placeholder="Person Count" onChange={this.onCountChange} />
      <input type="text" class="form-control" placeholder="Co-ordinates(Latitude,Longtitude)" onChange={this.onCoordChange} />
      </div>
      <input type="submit" className="btn btn-success"/>
      </form>

      <form onSubmit={this.onRelocate} style={{display:this.state.relocateForm}}>
      <div class="form-group">
      <label for="formGroupExampleInput">Relocate:</label>
      <input type="text" class="form-control" placeholder="Smart Card ID" onChange={this.onFIdChange} />
      <input type="text" class="form-control" placeholder="Location" onChange={this.onCLocationChange} />
      </div>
      <input type="submit"className="btn btn-success"/>
      </form>

      <form onSubmit={this.onUpdateHRecord} style={{display:this.state.healthRecForm}}>
      <div class="form-group">
      <label for="formGroupExampleInput">Health Record:</label>
      <input type="text" class="form-control" placeholder="Flat Name" onChange={this.onIdChange} />
      <input type="text" class="form-control" placeholder="Smart Card ID" onChange={this.onFIdChange} />
      <p>Temperature Readings (In Celcius):</p>
      <p>{this.state.disp}</p>
      <div className="d-inline-flex"><input type="number" class="form-control" placeholder="Temperature(in Celcius)" onChange={this.onValChange} />
      <button onClick={this.onAddTemp} style={{height:'95%'}} className="btn btn-success">Add</button></div>
      <input type="text" class="form-control" placeholder="Description" onChange={this.onDescChange} />
      </div>
      <input type="submit" className="btn btn-success"/>
      </form>
      </div>
      </div>
      </div>
    );
  }
}

export default LocalAdmin;
