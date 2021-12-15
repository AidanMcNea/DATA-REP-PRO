import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

//
class ReviewItem extends Component {
    constructor(){
        super();
        this.DeleteReview = this.DeleteReview.bind(this);
    }

    DeleteReview(){
        console.log('Delete: '+this.props.review._id);

        axios.delete('http://localhost:4000/api/reviews/'+this.props.review._id)
        .then(()=>{
            this.props.ReloadData();
        })
        .catch();

    }

    render() {
        return (
            <div>
                {/* ui for the displaying of the items*/}
                <Card>
                    <Card.Header>
                        <h2>Restaurant Name:</h2>{this.props.review.RestaurantName}</Card.Header>
                    <Card.Body>
                        <blockquote>
                        <img src={this.props.review.Picture}></img><br></br>
                        <h2>Rating out of 5:</h2>{this.props.review.Rating}<br></br>
                            <footer>
                            <h2>Review:</h2>  {this.props.review.Review}
                            </footer>
                        </blockquote>
                    </Card.Body>
<Link to={"/edit/" +this.props.review._id} className="btn btn-primary">Edit</Link>
<Button variant="dark" onClick={this.DeleteReview}>Delete</Button>
                </Card>
            </div>
        );
    }
}
export default ReviewItem;