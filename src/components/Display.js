import React, { Component } from 'react';
import {Container,Form,InputGroup,Dropdown,DropdownButton} from 'react-bootstrap';
import main from './main';
import './App.css';
class Display extends Component {

  constructor(props) {
    super(props)
    this.state = {
      disp:'Select Search Term',
      iphelp:'',
      id:'',
      ladmin:false
    }
  }

  checkLAdmin=async ()=>{
    const pincode=await main.methods.lAdminPincodes(this.props.account).call()
    if(pincode!==0)
    this.setState({ladmin:true})
  }

  onIdChange=(event)=>{
    event.preventDefault()
      this.setState({id:event.target.value})
    }

  onOption=async (eventKey)=>{
    if(eventKey==='0'){
      this.setState({iphelp:'Search by Pincode'})
      this.setState({disp:'Pincode'})
    }
    else if(eventKey==='1'){
      this.setState({iphelp:'Search by Flat'})
      this.setState({disp:'Flat'})
    }
    else{
      await this.checkLAdmin()
      if(this.state.ladmin===true){
      this.setState({iphelp:'Search by Smart Card ID'})
      this.setState({disp:'Smart Card ID'})
      }
      else
      alert('Only LocalAdmin can utilize this Search Term!')
    }
  }

  onFetch=async (event)=>{
    event.preventDefault()
  const selection=this.state.disp
  if(selection==='Pincode')
   this.onFetchPin()
  else if(selection==='Flat')
   this.onFetchFlat()
  else if(selection==='Smart Card ID')
   this.onFetchFamily()
  else
    alert('Choose a Search Team First!')
  }

  onFetchPin=async ()=>{
    const arr=await main.methods.getFlatsByPin(this.state.id).call()
    console.log(arr)
  }

  onFetchFlat=async ()=>{
    const arr=await main.methods.getHealthRecordsByFlat(this.state.id).call()
    console.log(arr)
  }

  onFetchFamily=async ()=>{
    const arr=await main.methods.getHealthRecordsByFamily(this.state.id).call()
    console.log(arr)
  }

render(){
  return{
    <div>
    <Container>
      <Form>
        <InputGroup controlId="formBasicEmail">
          <Form.Control type="text" placeholder={this.state.iphelp} onChange={this.onIdChange} />
          <DropdownButton variant="dark" bsStyle="success" title={this.state.disp} onSelect={this.onOption}>
            <Dropdown.Item eventKey="0">Pincode</Dropdown.Item>
            <Dropdown.Item eventKey="1">Flat</Dropdown.Item>
            <Dropdown.Item eventKey="2">Smart Card ID</Dropdown.Item>
          </DropdownButton>
            <InputGroup.Append>
              <Button variant="dark" onClick={this.onFetch}>
              Fetch!
              </Button>
            </InputGroup.Append>
        </InputGroup>
      </Form>
    </Container>
    </div>
  }
}

}

export default Display;
