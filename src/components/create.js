import React, { Component } from 'react';
import axios from 'axios';
//this is where you can add a review

class Create extends Component {
    constructor() {
        super();//takes in everything the user inputs
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeRestaurantName = this.onChangeRestaurantName.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onChangePicture = this.onChangePicture.bind(this);
        this.onChangeReview = this.onChangeReview.bind(this);
        this.state = {
            RestaurantName: '',
            Rating: '',
            Picture: '',
            Review: ''
        }
    }

    handleSubmit(event) {//log the event with the user inputs
        console.log("Restaurant Name: " +this.state.RestaurantName+
        " Rating: " + this.state.Rating +
        " Picture: " + this.state.Picture +
        " Review: " + this.state.Review);

        const NewReview = {//add the inputs a review
            RestaurantName: this.state.RestaurantName,
            Rating: this.state.Rating,
            Picture: this.state.Picture,
            Review: this.state.Review
        }

        //post that to the schema
        axios.post('http://localhost:4000/api/reviews', NewReview)
        .then((response)=>{
            console.log(response)
        })
        .catch((err)=>{
            console.log(err);
        })

        event.preventDefault();
        this.setState({//cant be empty
            RestaurantName: '',
            Rating: '',
            Picture: '',
            Review: ''
        });
    }

    onChangeRestaurantName(event) {
        this.setState({
            RestaurantName: event.target.value
        })
    }
    onChangeRating(event) {
        this.setState({
            Rating: event.target.value
        })
        
    }
    onChangePicture(event) {
        this.setState({
            Picture: event.target.value
        })
        
    }
    onChangeReview(event){
        this.setState({
            Review: event.target.value
        })
    }

    render(){//ui for the add review page
        return(
            <div>
            <h1>Add Your Restaurant Review!</h1>
            <br></br>
            <form onSubmit={this.handleSubmit}>

            <div className="form-group">
                <label><h2>Add Restaurant Name:</h2> </label>
                <input type="text"
                    className="form-control"
                    value={this.state.RestaurantName}
                    onChange={this.onChangeRestaurantName}
                />
            </div>
            <div className="form-group">
                <label><h2>Choose Rating: </h2></label>
                <input type="text"
                    className="form-control"
                    value={this.state.Rating}
                    onChange={this.onChangeRating}
                />
                </div>
            <div className="form-group">
                <label><h2>Add Picture:</h2> </label>
                <input type="text"
                    className="form-control"
                    value={this.state.Picture}
                    onChange={this.onChangePicture}
                />
            </div>
            <div className="form-group">
                <label><h2>Add Review:</h2> </label>
                <textarea type="text"
                    className="form-control"
                    value={this.state.Review}
                    onChange={this.onChangeReview}
                />
            </div>
            <div>
                <input type="submit" value="Submit"
                    className="btn btn-primary"></input>
            </div>
        </form>
        </div>
    
        );
    }
}
export default Create;