//All Availbel trucks will be display in the Owner page 
import "./index.css";
import OwnerHeaderEl from "../OwnerHeader";
import FooterEl from '../FooterSection';
import { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'; // Import the solid icon
import React from 'react';
import dayjs from 'dayjs';
import DriverPostsEl from "../DriverPosts";
import Cookies from 'js-cookie';
import { ThreeDots } from 'react-loader-spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
const apiStatusList={
   loading:"Loading",
   success:"SUCCESS",
   failure:"Failure",
}
class AvailbleTrucksEl extends Component{
    state={from:"",to:"",driverPostsList:[],apiSatatus:''}
    componentDidMount(){
      this.getDriverPosts();
    }
    getDriverPosts=async()=>{
      this.setState({apiSatatus:apiStatusList.loading})
      const {from,to}=this.state;
      const token=Cookies.get("token");
      const options={
         method:"GET",
         headers:{
            'Content-Type':"application/json",
            Authorization:`Bearer ${token}`
         }
      }
      const response=await fetch(`http://localhost:4000/driverpost?from_address=${from}&to_address=${to}`,options);
      if(response.ok===true){
         const data=await response.json();
         const{AvailbleDriver}=data;
         const convertedToCamelCase=AvailbleDriver.map((eachItem)=>({
            driverName:eachItem.driver_name,
            driverEmail:eachItem.email_id,
            fromAddress:eachItem.from_address,
            toAddress:eachItem.to_address,
            message: eachItem.message,
            mobileNumber:eachItem.mobile_number,
            truckImage:eachItem.truck_image,
            truckType:eachItem.truck_type,
            id:eachItem._id,
            driverImage:eachItem.driver_image,
            createdAt:eachItem.createdAt
         }))
         console.log(convertedToCamelCase)
         this.setState({driverPostsList:convertedToCamelCase,apiSatatus:apiStatusList.success})
      }
      else{
         this.setState({apiSatatus:apiStatusList.failure})
      }
    }
    fromAddress=(event)=>{
        this.setState({from:event.target.value})
    }
    toAddress=(event)=>{
         this.setState({to:event.target.value})
    }
    loadingView=()=>{
      return(
         <>
         <div className="driver-posts-loading-container">
           <ThreeDots color='rgb(255, 83, 10)' height='50' width='50'/>
         </div>
         </>
      )
    }
    failureTry=()=>{
      this.getDriverPosts();
    }
    failureView=()=>{
      return(
         <div className='driver-posts-failure-main-container'>
         <img src='failure.png' alt='failure' className='driver-posts-failure-image'/>
         <h1 className='driver-posts-failure-heading'>Ooops something went wrong</h1>
         <button className='btn btn-primary mt-3' type='button' onClick={this.failureTry}>Try Again</button>
      </div>
      )
    }
    clearSearch=()=>{
      this.setState({from:'',to:''},this.getDriverPosts)
    }
    successView=()=>{
      const{driverPostsList}=this.state;
      let finalTrucksAvailble=null;
      if(driverPostsList.length===0){
         finalTrucksAvailble=<div className="driver-posts-trucks-not-found-container">
            <div>
               <img src="notFound.png" className="driver-posts-image-not-found" alt="truck"/>
               <p className="driver-posts-text-not-found">Oops trucks are not availble in these routes try another routes</p>
               <button className="btn btn-primary" onClick={this.clearSearch}>Clear</button>
            </div>
         </div>
      }
      else{
         finalTrucksAvailble= <div className="driver-posts-availble-trucks-container">
         {driverPostsList.map((eachItem)=>(<DriverPostsEl key={eachItem.id} data={eachItem}/>))}
         </div>
      }
      return(
         <>
         {finalTrucksAvailble}
         </>
      )
    }
    searching=()=>{
     this.getDriverPosts();
    }

    render(){
        const{from,to,apiSatatus}=this.state;
        let  driverPostsFinalRender=null;
        if(apiSatatus===apiStatusList.loading){
         driverPostsFinalRender=this.loadingView()
        }
        else if(apiSatatus===apiStatusList.success){
         driverPostsFinalRender=this.successView()
        }
        else if(apiSatatus===apiStatusList.failure){
         driverPostsFinalRender=this.failureView()
        }
        //console.log(driverPostsList)
        return(
            <>
            <OwnerHeaderEl/>
            <div className='loads-top-container'>
         <div className='loads-welcome-container'>
            <h1 className='loads-welcome-styling'>Welcome to <span className='loads-welcome-heading-extra-styling'>Cargomate</span></h1>
            <p className='loads-heading-para'>We invite you to share the details of your loads to help connect with the right transporters for smooth and timely delivery</p>
         </div>
         <div className='loads-filtering-container'>
            <div className='loads-from-search-container'>
               <p className='loads-from-styling'>From</p>
               <div className='loads-searh-box'>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='loads-search-icon' />
                <input type='text' className='loads-input-styling' placeholder='Location' onChange={this.fromAddress} value={from}/>
                <FontAwesomeIcon icon={faLocationDot} className='loads-location-icon'/>
               </div>
            </div>
            <div className='loads-from-search-container'>
               <p className='loads-from-styling'>To</p>
               <div className='loads-searh-box'>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='loads-search-icon' />
                <input type='text' className='loads-input-styling' placeholder='Location' onChange={this.toAddress} value={to}/>
                <FontAwesomeIcon icon={faLocationDot} className='loads-location-icon'/>
               </div>
            </div>
            <div>
            
            </div>
            <div>
               <button type='button' className='loads-search-box' onClick={this.searching}>search</button>
            </div>
         </div>
            </div>
            {driverPostsFinalRender}
            <FooterEl/>
           </>
        )
    }
}
export default AvailbleTrucksEl;