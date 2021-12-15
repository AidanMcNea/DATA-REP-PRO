import React, { Component } from 'react';
import ReviewItem from './reviewItem';

class Reviews extends Component
{
    render(){
        return this.props.films.map((review)=>{
            return <ReviewItem review={review} key={review._id} ReloadData={this.props.ReloadData}></ReviewItem>
        })
    }
}
export default Reviews;