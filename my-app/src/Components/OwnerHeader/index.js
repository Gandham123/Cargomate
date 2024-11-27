import './index.css';
import { Component } from 'react';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { FiLogOut } from "react-icons/fi";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
class OwnerHeaderEl extends Component{
    loggingout=()=>{
        Cookies.remove('token')
        localStorage.clear();
        this.props.history.replace('/login')
    }
   
   render(){
    const storedUserData=JSON.parse(localStorage.getItem('userName'));
    const storedProfileUrl=storedUserData.profilepic;
    return(
        <>
        <div className="header-main-container">
              <div>
              <p className="header-paragraph">CargoMate</p>
              </div>
              <div className="header-middle-container">
              <NavLink
            to="/owner"
            className="header-home-styling"
            activeClassName="header-home-active-styling"
            exact
          >
            Home
          </NavLink>
          <NavLink
             to='/ownerabout'
            className="header-home-styling"
            activeClassName="header-home-active-styling"
          >
            AboutUs
          </NavLink>
          <NavLink
            to="/trucks"
            className="header-home-styling"
            activeClassName="header-home-active-styling"
          >
            Trucks
          </NavLink>
          <NavLink
            to="/requests"
            className="header-home-styling"
            activeClassName="header-home-active-styling"
          >
            Requests
          </NavLink>
              </div>
              <div className="header-end-container">
                <div className="header-profile-container">
                    < NavLink activeClassName="header-home-active-styling" to='/ownerprofile' className='header-profile'>
                    <img src={storedProfileUrl} className="header-profile-styling" alt="profile"/>
                    <p className="header-profile-name-styling">Profile</p>
                    </NavLink>
                    <FiLogOut className="header-logout-icon-styling" onClick={this.loggingout}/>
                </div>
              </div>
        </div>
        <div className="header-small-device">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <p className="header-paragraph smaller-heading">CargoMate</p>
        <button className="navbar-toggler header-space" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav text-center">
          <NavLink
            to="/"
            className="header-home-styling smaller"
            activeClassName="header-home-active-styling"
            exact
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="header-home-styling smaller"
            activeClassName="header-home-active-styling"
          >
            AboutUs
          </NavLink>
          <NavLink
            to="/loads"
            className="header-home-styling smaller"
            activeClassName="header-home-active-styling"
          >
            Loads
          </NavLink>
          <NavLink
            to="/services"
            className="header-home-styling smaller"
            activeClassName="header-home-active-styling"
          >
            Services
          </NavLink>
          < NavLink activeClassName="header-home-active-styling" to='/profile' className='smaller-header-profile smaller'>
                <img src='https://s3-alpha-sig.figma.com/img/23e7/6502/d02452d09a52619b81fa1d3dadaea3a9?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UdD9zHPRmicVNVfpRkWv-wd-O6iR1oBbUzIFOVdjj4cvZPpJcB~8oCah9TJgQpfpmeLEI9Ap9jW0zGHZT~MUhlif7Z7zAJ6XNg3kagUcG97oRbix1A5ItRrKNjnjF5XdKmj4S9BU2vpGiZmuYcKN2pWs-XmfBamwreiIni7gDpRkKg5HmIicRgb6uVj5JOfehq1S45zKlSUM4C81FBUNblEInMrNqMN9oylpW8rp64nbNz328ZPjuRtj84-3ahy85DAlTvokVaCtk8BVo1nTu7dILEUkXv6B7ZviTzWhy5i8h3Z6TOdB7FVylPSGJVyrxX4Npn1Wm9Dgi8Dc4dweJg__'className="header-profile-styling" alt="profile"/>
                <p className="header-profile-name-styling">Profile</p>
          </NavLink>
          <button className="smaller-logout-button-styling" onClick={this.loggingout}>Logout</button>
          </div>
        </div>
      </nav>
        </div>
        </>
    )
   }
}
export default withRouter(OwnerHeaderEl)