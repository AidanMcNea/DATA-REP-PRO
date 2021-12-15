import React, { Component } from 'react';
import axios from 'axios';


class Edit extends Component {
    constructor() {
        super();
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

    componentDidMount(){
        axios.get('http://localhost:4000/api/reviews/'+ this.props.match.params.id)
        .then((response)=>{
            this.setState({
                RestaurantName:response.data.RestaurantName,
                Picture:response.data.Picture,
                Rating:response.data.Rating,
                Review:response.data.Review,
                _id:response.data._id
            })
        })
        .catch();
    }

    handleSubmit(event) {
        console.log("Restaurant Name: " +this.state.RestaurantName+
        " Rating: " + this.state.Rating +
        " Picture: " + this.state.Picture +
        " Review: " + this.state.Review);

        const NewReview = {
            RestaurantName: this.state.RestaurantName,
            Rating: this.state.Rating,
            Picture: this.state.Picture,
            Review: this.state.Review
        }

        axios.put('http://localhost:4000/api/reviews/' + this.state._id, NewReview)
        .then((response)=>{console.log(response)})
        .catch();
        

        event.preventDefault();
        this.setState({
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

    render() {
        return (
            <div>
                <h1>Here you can Edit or Update your Review!</h1>
                <br></br>
                <form onSubmit={this.handleSubmit}>

                <div className="form-group">
                <label><h2>Edit Restaurant Name:</h2> </label>
                <input type="text"
                    className="form-control"
                    value={this.state.RestaurantName}
                    onChange={this.onChangeRestaurantName}
                />
            </div>
            <div className="form-group">
            <label><h2>Edit Rating: </h2></label>
                <input type="text"
                    className="form-control"
                    value={this.state.Rating}
                    onChange={this.onChangeRating}
                />
                </div>
            <div className="form-group">
            <label><h2>Edit Picture:</h2> </label>
                <input type="text"
                    className="form-control"
                    value={this.state.Picture}
                    onChange={this.onChangePicture}
                />
            </div>
            <div className="form-group">
            <label><h2>Edit Review:</h2> </label>
                <textarea type="text"
                    className="form-control"
                    value={this.state.Review}
                    onChange={this.onChangeReview}
                />
            </div>
            <div>
                <input type="submit" value="Edit/Update"
                    className="btn btn-primary"></input>
            </div>
        </form>
        </div>
        );
    }
}
export default Edit;