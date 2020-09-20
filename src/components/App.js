import React, { Component } from 'react';
import web3 from './web3';
import LocalAdmin from './LocalAdmin';
import Admin from './Admin';
import Doctor from './Doctor';
import './App.css';

class App extends Component {

  async componentWillMount() {
    await this.initiate()
  }

  async initiate(){
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  }

  constructor(props) {
    super(props)
    this.state = {
      account:''
     }
  }

  render() {
    return (
      <div>
        <Doctor account={this.state.account}/>
      </div>
    );
  }
}

export default App;
