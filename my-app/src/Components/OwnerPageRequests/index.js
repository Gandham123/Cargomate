//This is the owner page here the owner can view all the requests send by the driver
//for the loads posted by he  
import "./index.css";
import OwnerHeaderEl from "../OwnerHeader";
import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import OwnerEachRequestCardsEl from "../OwnerEachRequest";
import Cookies from "js-cookie";
class OwnerPageRequesteEl extends Component{
    state={statedPresent:[],statedPrevious:[]}
    componentDidMount(){
        this.getDataOfAllDriversRequests()
    }
    getDataOfAllDriversRequests=async()=>{
        const token=Cookies.get("token");
        const locallyStoredUserDetials=JSON.parse(localStorage.getItem("userName"));
        const loginedOwnerName=locallyStoredUserDetials.name;
        const option={
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        const response= await fetch(`http://localhost:4000/driverrequests/${loginedOwnerName}`,option);
        if(response.ok===true){
            const data=await response.json();
            console.log(data.userRequests);
            const finallyPresentRequest=data.userRequests.filter((eachItem)=>(eachItem.statusOfRequest==="Pending"))
            const finallyPreviousRequests=data.userRequests.filter((eachItem)=>(eachItem.statusOfRequest!=="Pending"))
            this.setState({statedPresent:finallyPresentRequest,statedPrevious:finallyPreviousRequests})
        }

    }
    deleteAcceptedRequests=(recieveid)=>{
        const{statedPresent,statedPrevious}=this.state;
        const finallyPresented=statedPresent.filter((eachItem)=>(eachItem._id!==recieveid))
        console.log(finallyPresented);
        const deletedPresentItem=statedPresent.filter((eachItem)=>(eachItem._id===recieveid));
        deletedPresentItem[0].statusOfRequest="Accepted";
        this.setState({statedPresent:finallyPresented,statedPrevious:[...statedPrevious,deletedPresentItem[0]]})
        
    }
    deleteCanceledRequest=(recieveid)=>{
        const{statedPresent,statedPrevious}=this.state;
        const finallyPresented=statedPresent.filter((eachItem)=>(eachItem._id!==recieveid))
        const deletedPresentItem=statedPresent.filter((eachItem)=>(eachItem._id===recieveid));
        deletedPresentItem[0].statusOfRequest="Declined";
        this.setState({statedPresent:finallyPresented,statedPrevious:[deletedPresentItem[0],...statedPrevious]})
    }
    completedLoadTag=(recieveid)=>{
        const{statedPrevious}=this.state;
        const changingItem=statedPrevious.filter((eachItem)=>(eachItem._id===recieveid));
        changingItem[0].statusOfRequest="Completed";
        const finallyPrevious=statedPrevious.filter((eachItem)=>(eachItem._id!==recieveid));
        this.setState({statedPrevious:[changingItem[0],...finallyPrevious]})
    }
    render(){
        const{statedPresent,statedPrevious}=this.state;
        let emptyViewRender=<div className="owner-empty-requests-view">
           <div>
           <img src='emptyreq.png' className="owner-empty-image" alt="empty"/>
           <p className="no-content">Their is no pending requests</p>
           </div>
        </div>
        return(
            <>
             <OwnerHeaderEl/>
             <div className="Owner-request-sttaus-main-container" style={{backgroundImage:`url(${process.env.PUBLIC_URL}/box.png)`}}>
            <div className='Owner-requests-mini-container'>
                <h1 className='Owner-requests-heading'>Requests</h1>
                <hr className='Owner-requests-line'/>
                <div style={{minHeight:"400px"}}>
                {statedPresent.length===0?emptyViewRender:statedPresent.map((eachItem)=>(<OwnerEachRequestCardsEl key={eachItem._id} dataReqeusts={eachItem} acceptfun={this.deleteAcceptedRequests} cancelfun={this.deleteCanceledRequest}/>))}
                </div>
                <h1 className='Owner-requests-heading mt-5'>Previous Load</h1>
                <hr className='Owner-requests-line'/>
                {statedPrevious.length===0?emptyViewRender:statedPrevious.map((eachItem)=>(<OwnerEachRequestCardsEl key={eachItem._id} dataReqeusts={eachItem} completefun={this.completedLoadTag}/>))}
            </div>
        </div>
            </>
        )
    }
}
export default OwnerPageRequesteEl;