import './index.css';
import HeaderEl from '../Header';
import FooterEl from '../FooterSection';
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
import { Component } from 'react';
import EachRecentPostEl from '../EachRecentPost';
import Cookies from "js-cookie";
class ProfileEl extends Component{
    state={showRecentPosts:true,showReviews:false,recentPostList:[],reviewList:[],overalRating:0}
    async componentDidMount(){
        const token=Cookies.get("token");
        const{name}=JSON.parse(localStorage.getItem("userName"));
        const option={
         method:"GET",
         headers:{
             'Content-Type':'application/json',
             Authorization:`Bearer ${token}`
         }
        }
        const recentPostsresponse=await fetch(`http://localhost:4000/driverpost/${name}`,option)
        const data=await recentPostsresponse.json();
        const reviewsResponse=await fetch(`http://localhost:4000/review/${name}`,option);
        const reviewData=await reviewsResponse.json()
        let finallyOverallRating=null;
        if(reviewData.avgRating.length===0){
            finallyOverallRating=0
        }
        else{
            finallyOverallRating=reviewData.avgRating[0].avgRating
        }
        this.setState({recentPostList:data.recentPosts,reviewList:reviewData.reviewDetails,overalRating:finallyOverallRating})


    }
    reviewsRender=()=>{
        const{reviewList}=this.state;
        let emptyViewRecentReviews=<div className='profile-empty-posts-view'>
          <div>
          <img src="postsEmpty.png" className='empty-image-styling' alt='empty'/>
          <p className='empty-text'>Their is no reviews till now</p>
          </div>
        </div>
        return(
            <>
             <h1 className='profile-owner-heading'>Owner Reviews</h1>
                  <hr className='profile-line'/>
                  <div className='profile-reviews-posted-main-container'>
                    <div className='profile-review-scrollable-container'>
                       {reviewList.length===0?emptyViewRecentReviews:reviewList.map((eachItem)=>(<EachReviewCardEl key={eachItem.id} reviewData={eachItem}/>))} 
                    </div>
                  </div>
            </>
        )
    }
    recentPostsRender=()=>{
        const{recentPostList}=this.state;
        let emptyViewRecentPosts=<div className='profile-empty-posts-view'>
          <div>
          <img src="postsEmpty.png" className='empty-image-styling' alt='empty'/>
          <p className='empty-text'>Their is no recent posts</p>
          </div>
        </div>
        return(
            <>
            <div className='m-5'>
              <div className='profile-recent-posts-first-line'>
                <h1 className='profile-recent-heading'>From</h1>
                <h1 className='profile-recent-heading'>To</h1>
                <h1 className='profile-recent-heading'>Message</h1>
                <h1 className='profile-recent-heading'>Date</h1>
              </div>
              <hr className='profile-recent-posts-line'/>
              <div className='profile-recent-posts'>
                <div className='profile-recent-posts-mini-container'>
                    {recentPostList.length===0?emptyViewRecentPosts:recentPostList.map((eachItem)=>(<EachRecentPostEl key={eachItem._id} recentPostsData={eachItem}/>))}
                </div>
              </div>
            </div>
            </>
        )
    }
    recentPostsHandling=()=>{
        this.setState({showRecentPosts:true,showReviews:false})
    }
    reviewHandling=()=>{
        this.setState({showRecentPosts:false,showReviews:true})
    }
    render(){
        const{showRecentPosts,showReviews,overalRating}=this.state;
        let parsedRating=parseFloat(overalRating).toFixed(1);
        const{mobilenum,name,profilepic,typeoftruck}=JSON.parse(localStorage.getItem("userName"));
        const recentPostsButtonshadow=showRecentPosts?'recent-posts-shadow':'';
        const reviewsButtonShadow=showReviews?'recent-posts-shadow':'';
        let overalRatingContainer=null;
        if(showReviews){
            overalRatingContainer=<div className='profile-overal-rating-container'>
            <h1 className='priofile-overal-rating'>Overall Rating</h1>
            <Stack spacing={1}>
                    <Rating
                        name="half-rating-read"
                        defaultValue={overalRating}
                        precision={0.5}
                        readOnly
                        icon={
                        <StarIcon
                            fontSize="inherit"
                            sx={{
                            color: '#FFD700', // Color for full stars
                            }}
                        />
                        }
                        emptyIcon={
                        <StarIcon
                            fontSize="inherit"
                            sx={{
                            color: '#D9D9D9', // Background color for empty stars
                            }}
                        />
                        }
                        sx={{
                        fontSize: '36px', // Set star size
                        '& .MuiRating-iconFilled': {
                            marginRight: '20px', // Space between stars
                        },
                        '& .MuiRating-iconHalf': {
                            color: '#FFD700', // Color for half-filled stars
                            background: 'linear-gradient(90deg, #FFD700 50%, #D9D9D9 50%)', // Half-fill effect
                            clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)', // Only display the left half as filled
                        },
                        }}
                    />
            </Stack>
            <p className='priofile-overal-rating mt-3'>{parsedRating} <span><FontAwesomeIcon icon={faStar} style={{ fontSize: '27px', color: '#03A600' }}/></span></p>
            </div>
        }
        return(
        <>
        <HeaderEl/>
        <div className='profile-main-main-container' style={{backgroundImage:`url(${process.env.PUBLIC_URL}/box.png)`}}> 
            <div className='profile-mini-container'>
                <div className='profile-top-container'>
                    <div className='profile-image-name-container'>
                        <img src={profilepic} className='profile-image-styling' alt='profile'/>
                        <div>
                            <h1 className='profile-name-styling'>Mr.{name}</h1>
                            <p className='profile-mobile-number'>{mobilenum}</p>
                        </div>
                    </div>
                    <div className='profile-edit-container'>
                        <FontAwesomeIcon icon={faPen} className='profile-edit-icon' />
                        <p className='profle-edit'>Edit</p>
                    </div>
                    <div className='profile-right-container'>
                        <h1 className='profile-Truck-Details'>Truck Details</h1>
                        <p className='profile-vehicle-type'>Vehicle Type: {typeoftruck}</p>
                        <p className='profile-vehicle-type mt-0'>Truck Number: AP 05 TK 8978</p>
                    </div>
                </div>
                <div className='profile-bottom-main-container'>
                 <div className='profile-bottom-top-container'>
                    <div className='profile-recent-buttons-main-container'>
                        <div className={`profile-recent-button-container ${recentPostsButtonshadow}`} onClick={this.recentPostsHandling}>
                          <FontAwesomeIcon icon={faReceipt} className='profile-recent-icon' />
                          <p className='profile-recent-style'>Recent Post's</p>
                        </div>
                        <div className={`profile-recent-button-container extra ${reviewsButtonShadow}`} onClick={this.reviewHandling}>
                          <FontAwesomeIcon icon={faMessage} className='profile-recent-icon' />
                          <p className='profile-recent-style extra-style'>Review</p>
                        </div>
                    </div>
                    {overalRatingContainer}
                 </div>
                 {showReviews?this.reviewsRender():this.recentPostsRender()}
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
export default ProfileEl