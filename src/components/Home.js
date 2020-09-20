import React, { Component } from 'react';
import Display from './Display';

class Home extends Component{
  render(){
    return(
      <div>
      <Display account={this.props.account}/>
      </div>
    )
  }
}

export default Home;
