import './index.css'
import satya from '../firebase';
import { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { ThreeDots } from 'react-loader-spinner';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
class RegisterEl extends Component{
    state={userProfileUrl:'',showProfile:false,name:'',password:'',email:'',
         mobileNum:'',aadharNum:'',typeofUser:'',showTypesOfTruck:false,typeOfTruck:'Container',registerInProgress:false,thankYouCardDisplay:false
    }
    imageUploading=async(e)=>{
        const image=e.target.files[0];
        const{showProfile}=this.state;
        if(image){
            if(showProfile){
                alert('already image has already uploaded')
            }
            else{
                const storage=getStorage(satya);
                const storageRef=ref(storage,"images/"+image.name);
                await uploadBytes(storageRef,image);
                const downloadUrl=await  getDownloadURL(storageRef);
                console.log(downloadUrl)
                this.setState({userProfileUrl:downloadUrl,showProfile:true})
            }

        }
    }
    userRegisterName=(event)=>{
        this.setState({name:event.target.value})
    }
    userRegisterPassword=(event)=>{
        this.setState({password:event.target.value})
    }
    userRegisterEmail=(event)=>{
        this.setState({email:event.target.value})
    }
    userRegisterMobileNumber=(event)=>{
         this.setState({mobileNum:event.target.value})
    }
    userRegisterAadharNum=(event)=>{
        this.setState({aadharNum:event.target.value})
    }
    userType=(event)=>{
        if(event.target.value==='driver'){
            this.setState({typeofUser:event.target.value,showTypesOfTruck:true})
        }
        else{
            this.setState({typeofUser:event.target.value,showTypesOfTruck:false,typeOfTruck:null})
        }
        
    }
    handleChange=(event)=>{
       this.setState({typeOfTruck:event.target.value})
    }
    registeringUser=async()=>{
        this.setState({registerInProgress:true})
        const {userProfileUrl,name,password,email,
            mobileNum,aadharNum,typeofUser,typeOfTruck}=this.state
        const finalDetailsRegisteredUser={
            name,
            password,
            adhar:aadharNum,
            mail:email,
            typeofuser:typeofUser,
            typeoftruck:typeOfTruck,
            profilepic:userProfileUrl,
            mobilenum:mobileNum
        }
        const option={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(finalDetailsRegisteredUser)
        }
        const url='http://localhost:4000/register';
        const response= await fetch(url,option);
        const data= await response.json();
        if(data.message==='User Registerd Succefully'){
            this.setState({registerInProgress:false,thankYouCardDisplay:true})
        }
        else{
            this.setState({registerInProgress:false});
            alert('Entered Email or Adhar number or Mobile number already existed ')
        }
    }
    formContent=()=>{
        const{showProfile,userProfileUrl,name,password,email,mobileNum,aadharNum,registerInProgress,showTypesOfTruck,typeOfTruck}=this.state;
        let userProfileIconOrImage=null;
        if(showProfile===false){
            userProfileIconOrImage=<div className='register-image-upload-container' onClick={() => this.imageUpload.click()}>
            <FontAwesomeIcon  icon={faCamera} className='register-camera-icon' />
            <FontAwesomeIcon icon={faPen}  className='register-pencil-icon'/>
            <input 
            type='file'
            onChange={this.imageUploading}  
            style={{ display: 'none' }}
            ref={input => this.imageUpload = input}/>
          </div>
        }
        else{
            userProfileIconOrImage=<div className='register-user-profile-image-container'>
                <img src={userProfileUrl} className='register-profile-image-styling' alt='user'/>
            </div>
        }
        let typeOfTruckField=<div>
            <label className='register-label-styling mt-4'>Choose your truck type</label>
            <select className='register-select-truck' onChange={this.handleChange} value={typeOfTruck}>
                <option value={'Container'}>Container</option>
                <option value={'LCV'}>LCV</option>
                <option value={'Open'}>Open</option>
                <option value={'Trailer'}>Trailer</option>
                <option value={'Bulker'}>Bulker</option>
                <option value={'Tipper'}>Tipper</option>
                <option value={'Mini Van'}>Mini Van</option>
            </select>
           </div>
       return(
       <div className='register-main-container'>
                    <h1 className='register-main-heading'>Welcome to <br/> <span className='register-main-heading-extra'>CARGOMATE</span></h1>
                    <div>
                    <p className='register-new-user'>New user</p>
                    <div className='register-container'>
                        {userProfileIconOrImage}
                        <form>
                            <label className='register-label-styling mt-4'>Enter your name</label>
                            <input type='text' placeholder='Enter your name' onChange={this.userRegisterName} value={name} className='register-input-field-styling'/>
                            <label className='register-label-styling'>Password</label>
                            <input type='text' placeholder='Enter your password' onChange={this.userRegisterPassword} value={password} className='register-input-field-styling'/>
                            <label className='register-label-styling'>Email</label>
                            <input type='email' placeholder='example@gmail.com' name='email' onChange={this.userRegisterEmail} value={email} className='register-input-field-styling'/>
                            <label className='register-label-styling'>Mobile number</label>
                            <input type='number' placeholder='+91 1234567890' name='phone' onChange={this.userRegisterMobileNumber} value={mobileNum} className='register-input-field-styling'/>
                            <label className='register-label-styling'>Aadhar number</label>
                            <input type='text' placeholder='1234 567 8901' onChange={this.userRegisterAadharNum} value={aadharNum} className='register-input-field-styling'/>
                            <label className='register-label-styling'>Type of user</label>
                            <br/>
                            <input type='radio' name='typeOfUser' onChange={this.userType} id='driver' className='register-radio-styling' value={'driver'}/>
                            <label htmlFor='driver' className='register-radio-label-style'>Driver</label>
                            <input type='radio' name='typeOfUser' onChange={this.userType} id='owner' className='register-radio-styling' value={'owner'}/>
                            <label htmlFor='owner' className='register-radio-label-style'>Owner</label>
                            {showTypesOfTruck?typeOfTruckField:''}
                        </form>
                    </div>
                    <div className='regster-button-container'>
                        <button className='register-button-styling' onClick={this.registeringUser}>{registerInProgress?<ThreeDots color='#ffffff' height='30' width='30'/>:'Register'}</button>
                    </div>
                    </div>
                <div className="register-border-container">
                   <span className="register-border-text">Or </span>
                  </div>
                  <p className='register-continue-google'>Continue with <span><div className='register-icon-container'><FontAwesomeIcon icon={faGooglePlusG} className='register-google-icon' /></div></span> google</p>
                  <p className='register-signup-content'>You already have an account please login. <span className='register-login-name'><Link to='/login' className='login-signup-link'>Login</Link></span></p>
                </div>
            )
    }
    render(){
       const{thankYouCardDisplay}=this.state;
       let ThankuCardDisplayOrNOt=null;
       if(thankYouCardDisplay===false){
          ThankuCardDisplayOrNOt=this.formContent()
       }
       else{
          ThankuCardDisplayOrNOt=<div className='register-thanku-card'>
            <FontAwesomeIcon icon={faCircleCheck} className='register-thank-You-icon' />
            <p className='register-thank-you-content'>Thank you for registering to  our application </p>
            <div className='thank-you-button-container'>
            <Link to='/login' className='thank-you-link-style'><button className='register-button-styling thank-you-space'>Login</button></Link>
            </div>
          </div>
       }
        return(
            <>
             <div className='register-main-bg-container' style={{backgroundImage:`url(${process.env.PUBLIC_URL}/bhaskar.jpg)`,backgroundSize:'cover'}}>
             {ThankuCardDisplayOrNOt}
             </div> 
            </>
        )
    }
}
export default RegisterEl