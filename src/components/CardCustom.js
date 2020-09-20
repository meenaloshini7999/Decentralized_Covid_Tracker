import React, { Component } from 'react';
import main from './main';
import web3 from './web3';

class CardCustom extends Component {

    constructor(props) {
        super(props)
        this.state ={
        flat:[],
        fam:[]
      }
    }

    Flatfetch=async(id)=>{
       const flat=await main.methods.flats(id).call()
       this.setState({flat:flat})
    }

    Familyfetch=async(id)=>{
      const fam=await main.methods.families(id).call()
    }

    render() {
      return (
          <div>
              {
              this.props.arr.map((val, key) => {

                if(this.props.fam===true)
              return(null)
              else{
                {this.Flatfetch(val)}
              return(
                <div class="card" style={{width: "18rem"}}>
  <div class="card-body">
    <h5 class="card-title">{this.state.flat.id}</h5>
    <h6 class="card-subtitle mb-2 text-muted">{'Total: '+this.state.flat.total+' Active :'+this.state.flat.active}</h6>
    <p class="card-text">{'Coordinates: '+this.state.flat.coords}</p>
            </div>
            </div>
          );
        }

              })}
        </div>
      );
    }
}

export default CardCustom;
