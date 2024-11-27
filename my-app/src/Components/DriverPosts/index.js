import "./index.css";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
//In this Each driver posts Details will be designed for the owner page availbel Trucks
const DriverPostsEl=(props)=>{
    const{data}=props;
    const{ driverName, createdAt,driverEmail,driverImage, fromAddress,message,truckType,toAddress,mobileNumber,  truckImage,id}=data;
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
 
    const timeDifference = currentDate.getTime() - createdDate.getTime(); // difference in milliseconds

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  console.log(hours);

  // Build a readable string based on time difference
  let timeString = '';
  if (days > 0) timeString = `${days} days `;
  else if (hours > 0) timeString = `${hours} hours `;
  else if (minutes > 0) timeString = `${minutes} minutes `;
  else if (seconds > 0) timeString = `${seconds} seconds `;
    return(
        <>
         <div className="profile-card">
            <div className="header">
                <img src={driverImage} alt="Profile" className="profile-pic" />
                <div className="name-info">
                    <h2><u>Mr. {driverName}</u></h2>
                   <Link to={`/trucks/${id}`}><span className="profile-link">Profile</span></Link> 
                </div>
            </div>
            <div className="driver-posts-middle-container">
                <div className="driver-posts-from-to-container">
                    <div className="driver-post-from-container">
                        <p className="driver-post-from-name">From</p>
                        <p className="driver-posts-from-address">{fromAddress}</p>
                    </div>
                    <div className="driver-post-from-container">
                        <p className="driver-post-from-name" style={{marginRight:"24px"}}>To</p>
                        <p className="driver-posts-from-address" style={{color:"#FF0004"}}>{toAddress}</p>
                    </div>
                </div>
                <div className="truck-container">
                    <p className="driver-posts-truck">Truck Photo</p>
                    <img src={truckImage} alt="truck" className="driver-posts-truck-pic-styling"/>
                </div>
            </div>
           <div className="driver-posts-truck-info">
             <p className="driver-posts-truck-type">Truck Type : <span style={{color:"#FF0000"}}>{truckType}</span></p>
             <hr className="driver-posts-line-styling"/>
             <p className="driver-posts-message">{message}</p>
             <div className="d-flex flex-row justify-content-between">
             <p className="driver-posts-time">Posted {timeString} ago</p>
             <p className="driver-posts-message" style={{color:"#FF0000",textAlign:"end",marginTop:"5px"}}>View Details</p>
             
             </div>
           </div>
            <div className="action-buttons">
                <button className="message-btn">
                    <span className="icon">💬</span>
                    <div className="dropdown">
                        <span>Mail</span>
                        <span>Text message</span>
                        <span>WhatsApp</span>
                    </div>
                </button>
                <div className="call-container">
                <button className="call-btn">📞</button>
                <div className="call-dropdown">{mobileNumber}
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default DriverPostsEl;