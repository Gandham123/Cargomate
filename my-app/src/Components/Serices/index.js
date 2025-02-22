import HeaderEl from '../Header';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EachDriverRequestCards from '../DriverEachReqestStat';
import { Component } from 'react';
import Cookies from 'js-cookie';
const driverRequestsList=[
    {
        id:1,
        name:"Swamy",
        loadType:"Fruits",
        contact:"8176567998",
        price:"40000",
        status:"Pending" 
    },
    {
        id:2,
        name:"Mahesh",
        loadType:"Vegetabels",
        contact:"8176567998",
        price:"40000",
        status:"Accepted" 
    },
    {
        id:3,
        name:"Swamy",
        loadType:"Furniture",
        contact:"8176567998",
        price:"40000",
        status:"Pending" 
    },
    {
        id:4,
        name:"Swamy",
        loadType:"Fruits",
        contact:"8176567998",
        price:"40000",
        status:"Accepted" 
    }
]
class ServicesEl extends Component{
    state={pendingRequests:[],previousRequests:[]}
    componentDidMount(){
        this.getAllRequests();
    }
    getAllRequests=async()=>{
        const token=Cookies.get('token');
        const userLoacalyStored=JSON.parse(localStorage.getItem("userName"))
        const storedUserName=userLoacalyStored.name;
        const option={
            method:'GET',
            headers:{
                'Content-Type':'appilcation/json',
                Authorization:`Bearer ${token}`
            }
        }
        const response=await fetch(`http://localhost:4000/driverrequests/${storedUserName}`,option)
        if(response.ok===true){
            const data=await response.json();
            console.log(data.userRequests)
            const finallyPendingRequests=data.userRequests.filter((eachItem)=>(eachItem.statusOfRequest==="Pending"));
            const finallyPreviousRequests=data.userRequests.filter((eachItem)=>(eachItem.statusOfRequest!=="Pending"));
            this.setState({pendingRequests:finallyPendingRequests,previousRequests:finallyPreviousRequests})
        }

    }
   render(){
    const{pendingRequests,previousRequests}=this.state;
    let emptyViewRender=<div className="owner-empty-requests-view">
           <div>
           <img src='emptyreq.png' className="owner-empty-image" alt="empty"/>
           <p className="no-content">Their is no pending requests</p>
           </div>
        </div>
    return(
        <>
        <HeaderEl/> 
        <div className="driver-request-sttaus-main-container" style={{backgroundImage:`url(${process.env.PUBLIC_URL}/box.png)`,backgroundRepeat:'repeat-y',backgroundSize:'cover'}}>
            <div className='driver-requests-mini-container'>
                <h1 className='driver-requests-heading'>Requests</h1>
                <hr className='driver-requests-line'/>
                {pendingRequests.length===0?emptyViewRender:pendingRequests.map((eachItem)=>(<EachDriverRequestCards key={eachItem.id} dataReqeusts={eachItem}/>))}
                <h1 className='driver-requests-heading mt-5'>Previous Load</h1>
                <hr className='driver-requests-line'/>
                {previousRequests.length===0?emptyViewRender:previousRequests.map((eachItem)=>(<EachDriverRequestCards key={eachItem.id} dataReqeusts={eachItem}/>))}
            </div>
        </div> 
        </>
    )
   }
}
export default  ServicesEl;