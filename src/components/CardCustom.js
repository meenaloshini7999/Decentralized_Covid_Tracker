import React, { Component } from 'react';

class CardCustom extends Component {

    constructor(props) {
        super(props)
        this.state = { }
    }

    render() {
      return (
          <div>
          <div className="cusform m-5">
            {
            this.props.arr.map((val,key)=>{
              if(this.props.type==='family')
                return(
                  <div class="card-body">
                  <div class="card" style={{width: "18rem"}}>
                  <h5 class="card-title m-2">{val.id}</h5>
                  <h6 class="card-subtitle m-2 text-muted">{'Temperatures : '+val.temperature}</h6>
                  <h6 class="card-subtitle m-2 text-muted">{'Date : '+new Date(parseInt(val.date)).toUTCString()}</h6>
                  <h6 class="card-subtitle m-2 text-muted">{'Description : '+val.description}</h6>
                  <p class="card-text m-2">{'Signed By : '+val.doc}</p>
                  </div>
                  </div>
                )
                else if(this.props.type==='reporter')
                  return(
                    <div class="card-body">
                    <div class="card" style={{width: "18rem"}}>
                    <h5 class="card-title m-2">{val.Name}</h5>
                    <h6 class="card-subtitle m-2 text-muted">{'Reporter ID : '+val.repId}</h6>
                    <h6 class="card-subtitle m-2 text-muted">{'Smart Card ID : '+val.family}</h6>
                    </div>
                    </div>
                  )
              else
                return(
              <div class="card-body">
              <div class="card" style={{width: "18rem"}}>
              <h5 class="card-title m-2">{val.id}</h5>
              <h6 class="card-subtitle m-2 text-muted">{'Total Strength: '+val.total}</h6>
              <h6 class="card-subtitle m-2 text-muted">{'Postive Cases : '+val.active}</h6>
              <p class="card-text">{'Co-ordinates : '+val.coords}</p>
              </div>
              </div> )
            })
            }
          </div>
        </div>
      );
    }
}

export default CardCustom;
