import React, { Component } from 'react'
import axios from 'axios'
import City from './City'

export default class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            listCities:[1,2,3],
            currentCity:null
        }
    }

    componentDidMount() {
        this.getCities();
    }
    
    getCities() {
        let url = "http://localhost:8085/client/villes";
        axios.get(url).then((resp) => {
            //console.log(resp.data);
            this.setState({
                listCities:resp.data,
                currentCity:resp.data[0]
            })
        }).catch(err => {
            console.log(err);
        })
    }

    setCurrentCity(city) {
        this.setState({
            currentCity:city
        })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <div className="card">
                            <h5 className="card-header bg-light">
                                Villes
                            </h5>
                            <div className="btn-group-vertical">
                            {
                                this.state.listCities.map((city, index) => 
                                    <button key={index} onClick={() => this.setCurrentCity(city)} 
                                        className={city===this.state.currentCity?
                                            "btn btn-primary p-2":
                                            "btn btn-basic d-flex p-2"}>
                                        {city.name}
                                    </button>    
                                )
                            }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        {
                            this.state.currentCity==null?"..." : 
                                <City city={this.state.currentCity}/>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
