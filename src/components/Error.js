import React, { Component } from 'react';
import './App.css';

class Error extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
}

  render(){
    return(
      <div class="boxed" style={{marginLeft:'500px'}}>
      <h1>Error 404. Page Doesn't exist!</h1>
    </div>
    );
  }
}

export default Error;
