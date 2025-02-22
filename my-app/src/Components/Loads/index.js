import './index.css'
import { Component } from 'react';
import HeaderEl from '../Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'; // Import the solid icon
import React from 'react';
import dayjs from 'dayjs';
import LoadDetails from '../LoadDetals';
import FooterEl from '../FooterSection';
import Cookies from 'js-cookie';
import { ThreeDots } from 'react-loader-spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
const apiStatusList={
   success:'SUCCESS',
   failure:'FAILURE',
   inProgress:'INPROGRESS'
}
class LoadsEl extends Component{
   state={from:'',to:'',postedDate:'',loadDetailsList:[],apiStatus:''}
   componentDidMount(){
      this.getData()
   }
   getData=async ()=>{
      this.setState({apiStatus:apiStatusList.inProgress})
      const{from,to,postedDate}=this.state;
      console.log(postedDate);
      const token=Cookies.get('token');
      const option={
         method:'GET',
         headers:{
           'Content-Type':'application/json',
           Authorization:`Bearer ${token}`
         }
      }
      const url=`http://localhost:4000/load?fromAddress=${from}&toAddress=${to}&date=${postedDate}`;
      const response=await fetch(url,option);
      if(response.ok===true){
         const data=await response.json();
         this.setState({loadDetailsList:data.fetchedDetals,apiStatus:apiStatusList.success})
      }
      else{
         this.setState({apiStatus:apiStatusList.failure})
      }    
   }
   searchingData=()=>{
      this.getData()
   }
   fromAddress=(event)=>{
     this.setState({from:event.target.value})
   }
   toAddress=(event)=>{
      this.setState({to:event.target.value})
   }
   datehandling=(event)=>{
      const formattedDate = dayjs(event.target.value).format('DD/MM/YYYY');
      this.setState({postedDate:formattedDate})
   }
   clearFiters=()=>{
    this.setState({from:'',to:'',postedDate:''},this.getData)
   }
   successView=()=>{
      const{loadDetailsList}=this.state;
      let finalSuccessrender=null;
      if(loadDetailsList.length===0){
         finalSuccessrender=<div className='loads-not-found'>
          <img src='notFound.png' alt='not' className='loads-not-found-image'/>
          <h1 className='loads-not-heading'>Ooops their is no loads in this route try with another route</h1>
          <button type='button' className='btn btn-primary' onClick={this.clearFiters}>Clear</button>
         </div>
      }
      else{
         finalSuccessrender=<div className='loads-inner-container'>
         {loadDetailsList.map((eachItem)=>(<LoadDetails key={eachItem.d} data={eachItem}/>))}
         </div>
      }

      return(
         <>
           {finalSuccessrender}
         </>
      )
   }
   loadingView=()=>{
      return(
         <>
         
            <div className='loads-spinner-contaner'>
              <ThreeDots color='rgb(255, 83, 10)' height='50' width='50'/>
            </div>
         </>
      )
   }
   failureTry=()=>{
      this.getData();
   }
   failureView=()=>{
         return(
            <div className='laods-failure-main-container'>
            <img src='failure.png' alt='failure' className='loads-failure-image'/>
            <h1 className='loads-failure-heading'>Ooops something went wrong</h1>
            <button className='btn btn-primary mt-3' type='button' onClick={this.failureTry}>Try Again</button>
         </div>
         )
   }
  render(){
   const{from,to,apiStatus}=this.state;
   console.log(apiStatus)
   let finalLoadsRender=null;
   if(apiStatus===apiStatusList.success){
      finalLoadsRender=this.successView()
   }
   else if(apiStatus===apiStatusList.inProgress){
      finalLoadsRender=this.loadingView()
   }
   else if(apiStatus===apiStatusList.failure){
      finalLoadsRender=this.failureView()
   }
   return(
      <>
      <HeaderEl/> 
      <div className='loads-top-container' style={{backgroundImage:`url(${process.env.PUBLIC_URL}/box.png)`}}>
         <div className='loads-welcome-container'>
            <h1 className='loads-welcome-styling'>Welcome to <span className='loads-welcome-heading-extra-styling'>Cargomate</span></h1>
            <p className='loads-heading-para'>Quickly find loads near you and keep your trips running smoothly with CargoMate</p>
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
            <p className='loads-from-styling'>calendar</p>
            <div>
               <input type='date' className='loads-calendar-container' onChange={this.datehandling}/>
            </div>
            </div>
            <div>
               <button type='button' className='loads-search-box' onClick={this.searchingData}>search</button>
            </div>
         </div>
      </div>
      <div  className='loads-show-contaner'>
      {finalLoadsRender}
      </div>
      <FooterEl/>
      </>
     )
  }
}
export default LoadsEl;