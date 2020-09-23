import React, { Component } from 'react';
import './App.css';

class Navbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
}

goTo=(path)=>{
  const url=window.location.href.split('/')
  if(path!=='/')
  path='/'+path
  return url[0]+path
}

  render(){
    return(<div>
      <div className="container-fluid" style={{backgroundColor:'black'}}>
        <nav class="navbar navbar-expand-lg navbar-dark">
          <a class="navbar-brand" href={this.goTo('/')} style={{color:'#61E786'}}>Decentralized Covid-19 Tracker</a>
          <div class="collapse navbar-collapse" id="navbarToggleExternalContent">
            <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href={this.goTo('Admin')}>Administator</a>
            </li>
              <li class="nav-item">
                <a class="nav-link" href={this.goTo('LocalAdmin')}>LocalAdmin</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href={this.goTo('Doctor')}>Doctor</a>
              </li>
            </ul>
              </div>
            </nav>
      </div>
    </div>);
  }
}

export default Navbar;
