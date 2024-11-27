import './index.css';
import { Component } from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import {Link} from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import ContextEl from '../../Context';
class LoginEl extends Component{
    state={username:'',password:'',inProgress:false}
    userName=(event)=>{
        this.setState({username:event.target.value})
    }
    userPassword=(event)=>{
        this.setState({password:event.target.value})
    }
    submittingDetails=async (event)=>{
        event.preventDefault();
        this.setState({inProgress:true})
        const{username,password}=this.state;
        const finalUserDetails={
            name:username,
            password
        }
        const option={
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(finalUserDetails)
        }
        const url='http://localhost:4000/login';
        const response=await fetch(url,option)
        const data=await response.json();
        if(response.ok===true){
            this.setState({inProgress:false})
            Cookies.set('token',data.token,{expires:1})
            localStorage.setItem('userName',JSON.stringify(data.userDetails[0]))
            //console.log(data.userDetails[0])
            if(data.userDetails[0].typeofuser==="owner"){
                this.props.history.replace('/owner');
            }else{ 
             this.props.history.replace('/')
            }
        }
        else{
            this.setState({inProgress:false})
            alert(data.message)
            this.setState({username:'',password:''})
        }
    }
    render(){
        const token=Cookies.get('token')
        if(token!==undefined){
            return <Redirect to='/'/>
        }
        else{
            const{username,password,inProgress}=this.state;
        return(
            <>
            <ContextEl.Provider value={{userName:username}}>
            <div className='login-bg-container'>
                
                <div className='login-main-container'>
                  <h1 className='login-main-heading'>Welcome to <br/> <span className='login-main-heading-extra-style'>CARGOMATE</span></h1>
                  <div className="login-border-styling">
                    <h2 className='login-heading'>LOGIN</h2>
                    <form>
                        <label className='login-label-styling'>User name</label>
                        <input type='text' className='login-input-field-styling' onChange={this.userName} placeholder='Enter Your User Name' value={username}/>
                        <label className='login-label-styling'>Password</label>
                        <input type='text' className='login-input-field-styling' onChange={this.userPassword} placeholder='Enter Your Password' value={password}/>
                        <p className='login-forgot-password-styling'>Forgot <span className='login-forgot-extra-style'>your password....?</span> </p>
                    </form>
                  </div>
                  <div className='login-button-styling-container'>
                    <button type='button' className='login-button-styling' onClick={this.submittingDetails}>{inProgress?<ThreeDots color='#ffffff' height='30' width='30'/>:'Login'}</button>
                  </div>
                  <div className="login-border-container">
                   <span className="login-border-text">Or </span>
                  </div>
                  <p className='login-continue-google'>Continue with <span><div className='login-icon-container'><FontAwesomeIcon icon={faGooglePlusG} className='login-google-icon' /></div></span> google</p>
                  <p className='login-signup-content'>You don’t have an account please Register.<span className='login-signup-name'><Link to='/register' className='login-signup-link'>SINGUP</Link></span></p>
                </div>

            </div>
            </ContextEl.Provider>
            </>
        )
        }
    }
}
export default LoginEl