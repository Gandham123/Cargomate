import "./index.css";
import OwnerHeaderEl from "../OwnerHeader";
import { Component } from "react";
import FooterEl from '../FooterSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import EachCompletedLoadEl from "../EachCompleteLoadCard";
import Cookies from "js-cookie";
 
class OwnerProfileEl extends Component{
    state={completedLoads:0,pendingLoads:0,completedLoadDetails:[]}
    componentDidMount(){
         this.getCount()
    }
    getCount=async()=>{
        const token=Cookies.get("token");
        const{name}=JSON.parse(localStorage.getItem("userName"))
        const option={
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        const response=await fetch(`http://localhost:4000/completedloads/${name}`,option);
        const data=await response.json()
        this.setState({completedLoads:data.completedCount,pendingLoads:data.pendingCount,completedLoadDetails:data.results})

    }
    render(){
        const{completedLoads,pendingLoads,completedLoadDetails}=this.state;
        const{mobilenum,name,profilepic}=JSON.parse(localStorage.getItem("userName"));
        let emptyViewRecentPosts=<div className='profile-empty-posts-view'>
          <div>
          <img src="postsEmpty.png" className='empty-image-styling' alt='empty'/>
          <p className='empty-text'>Their is no recent posts</p>
          </div>
        </div>
        return(
            <>
            <OwnerHeaderEl/>
            <div className='profile-main-container'>
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
                    <div className='profile-right-container mt-4'>
                        <div className='d-flex flex-row justify-content-end'>
                            <div className="completed-loads-main-conatiner">
                                <p className="number-loads">{completedLoads}</p>
                                <p className="number-loads" style={{fontSize:"12px"}}>Completed Loads</p>
                            </div>
                            <div className="completed-loads-main-conatiner extra-styling" style={{backgroundColor:"#ffffff"}}>
                                <p className="number-loads">{pendingLoads}</p>
                                <p className="number-loads" style={{fontSize:"12px"}}>Pending Loads</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='profile-bottom-main-container'>
                 <div className='profile-bottom-top-container'>
                    <div className='profile-recent-buttons-main-container'>
                        <div className={`profile-recent-button-container shadow`}>
                          <FontAwesomeIcon icon={faReceipt} className='profile-recent-icon' />
                          <p className='profile-recent-style'>Completed Loads</p>
                        </div>
                    </div>
                 </div>
                 <div className='m-5'>
              <div className='profile-recent-posts-first-line'>
                <h1 className='profile-recent-heading'>From</h1>
                <h1 className='profile-recent-heading'>To</h1>
                <h1 className='profile-recent-heading'>LoadType</h1>
                <h1 className='profile-recent-heading'>Date</h1>
              </div>
              <hr className='profile-recent-posts-line'/>
              <div className='profile-recent-posts'>
                <div className='profile-recent-posts-mini-container'>
                {completedLoadDetails.length===0?emptyViewRecentPosts:completedLoadDetails.map((eachItem)=>(<EachCompletedLoadEl key={eachItem.id} completedData={eachItem}/>))}
                </div>
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
export default OwnerProfileEl;