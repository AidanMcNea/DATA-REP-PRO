import React, { Component } from 'react';
import Reviews from './reviews';
import axios from 'axios';

class Read extends Component
{
    constructor(){
        super();
        this.ReloadData = this.ReloadData.bind(this);
    }

    ReloadData(){
        axios.get('http://localhost:4000/api/reviews')
        .then((response)=>{
            this.setState({myreviews: response.data})
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    componentDidMount(){
        axios.get('http://localhost:4000/api/reviews')
        .then((response)=>{
            this.setState({myreviews: response.data})
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    state = {
        myreviews: []            
    };

    render(){
        //displaying all reviews
        return(
            <div>
                <h1>Our Reviews!</h1>
                
                <Reviews films={this.state.myreviews} ReloadData={this.ReloadData}></Reviews>
            </div>
        );
    }
}
export default Read;