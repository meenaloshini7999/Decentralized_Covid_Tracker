import React, { Component } from 'react';
import web3 from './web3';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import LocalAdmin from './LocalAdmin';
import Admin from './Admin';
import Doctor from './Doctor';
import Home from './Home';
import Error from './Error';
import Navbar from './Navbar';
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
      <Navbar/>
      <BrowserRouter>
        <Switch>
        <Route path="/" exact>
          <Home account={this.state.account}/>
        </Route>
        <Route path="/admin">
          <Admin account={this.state.account}/>
        </Route>
        <Route path="/localAdmin">
          <LocalAdmin account={this.state.account} />
        </Route>
        <Route path="/Doctor">
          <Doctor account={this.state.account}/>
        </Route>

        <Route component={Error}/>
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
