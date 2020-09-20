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
      fam:false
    }
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
      this.setState({iphelp:'Search by Smart Card ID'})
      this.setState({disp:'Smart Card ID'})
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
    const array=await main.methods.getFlatsByPin(this.state.id).call()
    this.setState({arr:array})
  }

  onFetchFlat=async ()=>{
    const array=await main.methods.getHealthRecordsByFlat(this.state.id).call()
    this.setState({arr:array})
    this.setState({fam:true})
  }

  onFetchFamily=async ()=>{
    const array=await main.methods.getHealthRecordsByFamily(this.state.id).call({from:this.state.account})
    this.setState({arr:array})
    this.setState({fam:true})
  }

render(){
  return(<div>
    <Container>
      <Form>
        <InputGroup controlId="formBasicEmail">
          <Form.Control type="text" placeholder={this.state.iphelp} onChange={this.onIdChange} />
          <DropdownButton variant="success" bsStyle="success" title={this.state.disp} onSelect={this.onOption}>
            <Dropdown.Item eventKey="0">Pincode</Dropdown.Item>
            <Dropdown.Item eventKey="1">Flat</Dropdown.Item>
            <Dropdown.Item eventKey="2">Smart Card ID</Dropdown.Item>
          </DropdownButton>
            <InputGroup.Append>
              <Button className="btn btn-success" onClick={this.onFetch} style={{height:'90%'}}>
              Fetch!
              </Button>
            </InputGroup.Append>
        </InputGroup>
      </Form>
    </Container>
    <CardCustom arr={this.state.arr} fam={this.state.fam}/>
    </div>);
  }
}

export default Display;
