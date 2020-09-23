import React, { Component } from 'react';
import {Container,Form,InputGroup,Dropdown,DropdownButton,Button} from 'react-bootstrap';
import main from './main';
import CardCustom from './CardCustom';
import './App.css';

class Display extends Component {

  constructor(props) {
    super(props)
    this.state = {
      disp:'Select Search Term',
      iphelp:'',
      id:'',
      pin:0,
      arr:[],
      type:'flat',
      display:false
    }
  }

  onIdChange=(event)=>{
    event.preventDefault()
      this.setState({id:event.target.value})
    }

  onOption=async (eventKey)=>{
    this.setState({arr:[]})
    this.setState({display:false})
    if(eventKey==='0'){
      this.setState({iphelp:'Search by Pincode'})
      this.setState({disp:'Flats By Pincode'})
      this.setState({type:'flat'})
    }
    else if(eventKey==='1'){
      this.setState({iphelp:'Search by Flat'})
      this.setState({disp:'Flat'})
      this.setState({type:'family'})
    }
    else if(eventKey==='2'){
      this.setState({iphelp:'Search by Smart Card ID'})
      this.setState({disp:'Smart Card ID'})
      this.setState({type:'family'})
    }
    else{
      this.setState({iphelp:'Search using Pincode'})
      this.setState({disp:'Reporters By Pincode'})
      this.setState({type:'reporter'})
    }
  }

  onFetch=async (event)=>{
    event.preventDefault()
    this.setState({arr:[]})
    this.setState({display:true})
  const selection=this.state.disp
  if(selection==='Flats By Pincode')
   this.onFetchPin()
  else if(selection==='Flat')
   this.onFetchFlat()
  else if(selection==='Smart Card ID')
   this.onFetchFamily()
  else if(selection==='Reporters By Pincode')
   this.onFetchReporters()
  else{
    alert('Choose a Search Team First!')
    this.setState({display:false})
    }
  }

  onFetchPin=async ()=>{
    try{
    const array=await main.methods.getFlatsByPin(this.state.id).call()
    const fid=async(val)=>{
      const arrval=await main.methods.flats(val).call()
      this.setState({arr:[...this.state.arr,arrval]})
    }
    array.map((val,key)=>{fid(val);return null})
    }
    catch(err){
      alert('Pincode Should be Number')
    }
  }

  onFetchFlat=async ()=>{
    const array=await main.methods.getHealthRecordsByFlat(this.state.id).call()
    const fid=async(val)=>{
      const arrval=await main.methods.healthRecords(val).call()
      this.setState({arr:[...this.state.arr,arrval]})
    }
    array.map((val,key)=>{fid(val);return null})
  }

  onFetchFamily=async ()=>{
    const array=await main.methods.getHealthRecordsByFamily(this.state.id).call()
    const fid=async(val)=>{
      const arrval=await main.methods.healthRecords(val).call()
      this.setState({arr:[...this.state.arr,arrval]})
    }
    array.map((val,key)=>{fid(val);return null})
  }

  onFetchReporters=async ()=>{
    try{
    const array=await main.methods.getReporterByPincode(this.state.id).call()
    const fid=async(val)=>{
      const arrval=await main.methods.reporters(val).call()
      this.setState({arr:[...this.state.arr,arrval]})
    }
    array.map((val,key)=>{fid(val);return null})
    }
    catch(err){
      alert('Pincode Should be Number')
    }
  }

render(){
  return(<div>
    <Container style={{marginTop:'5px'}}>
      <Form>
        <InputGroup controlId="formBasicEmail">
          <Form.Control type="text" placeholder={this.state.iphelp} onChange={this.onIdChange} />
          <DropdownButton variant="success" bsStyle="success" title={this.state.disp} onSelect={this.onOption}>
            <Dropdown.Item eventKey="0">Flats By Pincode</Dropdown.Item>
            <Dropdown.Item eventKey="1">Flat</Dropdown.Item>
            <Dropdown.Item eventKey="2">Smart Card ID</Dropdown.Item>
            <Dropdown.Item eventKey="3">Reporters By Pincode</Dropdown.Item>
          </DropdownButton>
            <InputGroup.Append>
              <Button className="btn btn-success" onClick={this.onFetch} style={{height:'90%'}}>
              Fetch!
              </Button>
            </InputGroup.Append>
        </InputGroup>
      </Form>
    </Container>
    {this.state.display?<CardCustom arr={this.state.arr} type={this.state.type}/>:null}
    </div>);
  }
}

export default Display;
