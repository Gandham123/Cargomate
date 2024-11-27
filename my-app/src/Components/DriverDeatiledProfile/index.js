//in this page when owner clicked on the driver profile in the avavilbele trucks
//then this page will display with entire details of that driver and previous reviews
import "./index.css"
import { Component } from "react";
import OwnerHeaderEl from "../OwnerHeader";
import FooterEl from "../FooterSection";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import EachReviewCardEl from '../EachReviewCard';
import Cookies from "js-cookie";
class DriverDetails extends Component{
    state={driverPersonal:{},overallRating:0,reviews:[]}
    componentDidMount(){
        this.getDriverData();
    }
    getDriverData=async()=>{
        const{id}=this.props.match.params;
        const token=Cookies.get('token');
        const option={
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        const response=await fetch(`http://localhost:4000/trucks/${id}`,option);
        const data=await response.json();
        let finallyOverallRating=null;
        if(data.avgRating.length===0){
            finallyOverallRating=0;
        }
        else{
           finallyOverallRating=data.avgRating[0].avgRating;
        }
        this.setState({driverPersonal:data.driverDetails,overallRating:finallyOverallRating,reviews:data.reviewDetails})
        //console.log(data.driverDetails);
        //console.log(data.avgRating[0].avgRating);
        //console.log(data.reviewDetails)
    }
    render(){
        const{driver_name,mobile_number,driver_image,truck_type}=this.state.driverPersonal;
        const{overallRating,reviews}=this.state;
        let emptyViewRecentReviews=<div className='profile-empty-posts-view'>
          <div>
          <img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?ga=GA1.1.577768108.1712477903&semt=ais_hybrid" className='empty-image-styling' alt='empty'/>
          <p className='empty-text'>Their is no reviews till now</p>
          </div>
        </div>
        let parsedRating=parseFloat(overallRating).toFixed(1)
        return(
            <>
            <OwnerHeaderEl/>
            <div className='profile-main-container'>
            <div className='profile-mini-container'>
                <div className='profile-top-container'>
                    <div className='profile-image-name-container'>
                        <img src={driver_image} className='profile-image-styling' alt='profile'/>
                        <div>
                            <h1 className='profile-name-styling'>Mr.{driver_name}</h1>
                            <p className='profile-mobile-number'>{mobile_number}</p>
                        </div>
                    </div>
                    <div className='profile-edit-container'>
                        <FontAwesomeIcon icon={faPen} className='profile-edit-icon' />
                        <p className='profle-edit'>Edit</p>
                    </div>
                    <div className='profile-right-container'>
                        <h1 className='profile-Truck-Details'>Truck Details</h1>
                        <p className='profile-vehicle-type'>Vehicle Type: {truck_type}</p>
                        <p className='profile-vehicle-type mt-0'>Truck Number: AP 05 TK 8978</p>
                    </div>
                </div>
                <div className='profile-bottom-main-container'>
                 <div className='profile-bottom-top-container'>
                    <div className='profile-recent-buttons-main-container'>
                        <div className={`profile-recent-button-container extra`}>
                          <FontAwesomeIcon icon={faMessage} className='profile-recent-icon' />
                          <p className='profile-recent-style extra-style'>Review</p>
                        </div>
                    </div>
                    <div className='profile-overal-rating-container'>
            <h1 className='priofile-overal-rating'>Overall Rating</h1>
            <Stack spacing={1}>
                <Rating
                    name="half-rating-read"
                    value={overallRating}
                    precision={0.5}
                    readOnly
                    icon={<StarIcon fontSize="inherit" sx={{ color: '#FFD700' }} />}
                    emptyIcon={<StarIcon fontSize="inherit" sx={{ color: '#D9D9D9' }} />}
                    sx={{
                        fontSize: '36px',
                        '& .MuiRating-iconFilled': {
                            marginRight: '20px',
                        },
                        '& .MuiRating-iconHalf': {
                            color: '#FFD700',
                            background: 'linear-gradient(90deg, #FFD700 50%, #D9D9D9 50%)',
                            clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
                        },
                    }}
                />
            </Stack>
            <p className='priofile-overal-rating mt-3'>{parsedRating} <span><FontAwesomeIcon icon={faStar} style={{ fontSize: '27px', color: '#03A600' }}/></span></p>
            </div>
                 </div>
                 <h1 className='profile-owner-heading'>Owner Reviews</h1>
                  <hr className='profile-line'/>
                  <div className='profile-reviews-posted-main-container'>
                    <div className='profile-review-scrollable-container'>
                      {reviews.length===0?emptyViewRecentReviews:reviews.map((eachItem)=>(<EachReviewCardEl key={eachItem._id} reviewData={eachItem}/>))}
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <div className='profile-footer-container'>
            <FooterEl/>
        </div>
            </>
        )
    }
}
export default DriverDetails;