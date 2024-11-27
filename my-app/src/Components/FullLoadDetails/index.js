import './ndex.css'
import React, { Component } from 'react'
import FooterEl from '../FooterSection';
import HeaderEl from '../Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'; // Import the solid icon
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
const style = {
  position: 'absolute',
  top:'50%',
  left: '50%',
  bottom:'50%',
  transform: 'translate(-50%, -50%)',
  width: 400, // Width set to 400px
  minHeight: 600, // Height set to 800px
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  verflow: 'visible', 
  borderRadius:8,
  overflowY: 'auto',
  scrollbarWidth: 'none', /* Firefox */
  msOverflowStyle: 'none', /* IE and Edge */
};
const modalStyle = {
  marginTop: '20px', // Adjust margin top as needed
  marginBottom: '20px', // Adjust margin bottom as needed
};
const buttonStyle = {
  height: '90px',
  width: '180px',
  backgroundColor: '#027100',
  borderWidth: '0px',
  cursor: 'pointer',
  fontFamily: 'Lato',
  fontSize: '20px',
  fontWeight: 400,
  color: '#ffffff',
  margin: '50px 10px 10px 60px',
  borderRadius: '15px',
};


class FullLoadDetalsEl extends Component{
  state={loadsDetails:{},open: false,mobileNumber:'',driverMailId:'',
  vehicleNumber:'',price:'',showAlert: false,}
  componentDidMount(){
    this.getLoadDetails()
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  driverNumberHandling=(event)=>{
    this.setState({mobileNumber:event.target.value})
  }
  driverEmailHandling=(event)=>{
    this.setState({driverMailId:event.target.value})
  }
  truckNumberHandling=(event)=>{
    this.setState({vehicleNumber:event.target.value})
  }
  priceHandle=(event)=>{
    this.setState({price:event.target.value})
  }
  //vehicleImageUploading = this.vehicleImageUploading.bind(this);
  
  handleSubmit = async() => {
    const token=Cookies.get('token');
    const loacallyStoredObject=JSON.parse(localStorage.getItem('userName'));
    const driverName=loacallyStoredObject.name;
    const{mobileNumber,driverMailId,vehicleNumber,price,loadsDetails}=this.state;
    const finalDrverRequestDetails={
      postedBy:loadsDetails.name,
      driverName:driverName,
      driverMobile:mobileNumber,
      driverEmailId:driverMailId,
      truckNumber:vehicleNumber,
      price,
      statusOfRequest:"Pending",
      ownerMobileNum:loadsDetails.mobileNumber,
      loadType:loadsDetails.typeofLoad,
      ownerPrice:loadsDetails.price,
      postedLoadId:loadsDetails._id,
      fromAddress:loadsDetails.from,
      toAddress:loadsDetails.to
    }
    const options={
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        authorization:`Bearer ${token}`
      },
      body:JSON.stringify(finalDrverRequestDetails)
    }
    const response= await fetch("http://localhost:4000/driverrequest",options)
    if(response.ok===true){
      this.setState({ showAlert: true , open: false});
      setTimeout(() => {
        this.setState({ showAlert: false });
      }, 6000);
    }
    else{
      alert('Something went wrong please reload the browser')
    }
  };
  getLoadDetails=async()=>{
     const{id}=this.props.match.params;
     const token=Cookies.get('token');
     const option={
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        authorization:`Bearer ${token}`
      }
     }
     const url=`http://localhost:4000/loaddetails/${id}`
     const response=await fetch(url,option);
     const fetchedData=await response.json()
     this.setState({loadsDetails:fetchedData.data})

  }
    render(){
      const{loadsDetails,open}=this.state;
      console.log(loadsDetails.typeofLoad)
      const applyOr=open?'overlay':'';
      const drivernameStored=JSON.parse(localStorage.getItem('userName'));
      const{name,loadDate,unloadDate,mobileNumber,from,to,price,typeofLoad,weight,ownerImage}=loadsDetails
        return(
            <div className='load-full-details'> 
            <HeaderEl/>
            <div className={`load-full-detals-main-container ${applyOr}`}>
            {this.state.showAlert && (
          <Stack className="custom-alert" spacing={2}>
            <Alert severity="success">Your Details Submitted Succefully.</Alert>
          </Stack>
        )}
             <div className='load-full-details-mini-container'>
                <div className='load-full-details-mini-top-container mb-5'>
                  <img src={ownerImage} className='load-full-details-profile-image' alt='profile'/>
                  <div className='load-full-details-owner-name-container mt-4'>
                     <h1 className='load-full-details-owner-name'>Load Owner</h1>
                     <p className='load-full-detals-name'>Mr.{name}</p>
                  </div>
                  <div className='load-full-details-date-container mt-4'>
                    <p className='load-full-details-due'>Due</p>
                    <p className='load-full-details-date'>Loading Date: {loadDate}</p>
                    <p className='load-full-details-date'>UnLoading Date: {unloadDate}</p>
                  </div>
                </div>
                <div className='load-full-detals-bottom-container mt-2'> 
                  <div className='load-full-details-container-one'>
                    <h1 className='load-full-details-load-detail-styling'>Load Details</h1>
                    <p className='load-full-details-load-type'>{typeofLoad}</p>
                    <h1 className='load-full-details-load-detail-styling'>Contact Number</h1>
                    <p className='load-full-details-moble-number'>{mobileNumber}</p>
                  </div>
                  <div className='load-full-details-weight-container'>
                    <h1 className='load-fuul-details-weight-name'>Weight</h1>
                    <p className='load-full-details-wegiht'>{weight}</p>
                  </div>
                  <div className='load-full-details-from-to-container'>
                    <p className='load-full-from-heading'>From-To</p>
                    <div className='load-full-details-from-container'>
                        <p className='load-full-details-from-address'>{from}</p>
                        <FontAwesomeIcon icon={faLocationDot} className='loads-full-details-location-icon'/>
                    </div>
                    <div className='load-dotted-line'></div>
                    <div className='load-full-details-from-container to-space'>
                        <p className='load-full-details-from-address'>{to}</p>
                        <FontAwesomeIcon icon={faLocationDot} className='loads-full-details-location-icon'/>
                    </div>
                    
                  </div>
                  <div className='load-full-details-price-space'>
                    <p className='full-load-details-price-name'>Price</p>
                    <div className='load-full-details-price-container'>
                      <p className='load-full-details-price-style'>{price}</p>
                      <FontAwesomeIcon icon={faIndianRupeeSign}  className='rupees-symbol-styling'/>
                    </div>
                  </div>
                  <div className='load-full-details-contact-container'>
                  <Button style={buttonStyle} onClick={this.handleOpen} >Contact</Button>
                  <Modal
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, ...modalStyle }}>
           <h1 className='load-heading'>Please Fill The Form</h1>
           <div className='popup-each-field-container'>
           <label className='popup-label-styling'>Driver Name</label>
           <div className='popup-input-form-styling' >{drivernameStored.name}</div>
           </div>
           <div className='popup-each-field-container'>
           <label className='popup-label-styling'>Driver Phone Number</label>
           <input type='text' className='popup-input-form-styling' placeholder='+91 8186753423' onChange={this.driverNumberHandling}/>
           </div>
           <div className='popup-each-field-container'>
           <label className='popup-label-styling'>Email</label>
           <input type='gmail' className='popup-input-form-styling' placeholder='example@gmail.com' onChange={this.driverEmailHandling}/>
           </div>
           <div className='popup-each-field-container'>
           <label className='popup-label-styling'>Truck Number</label>
           <input type='text' className='popup-input-form-styling' placeholder='Enter Your Truck Number' onChange={this.truckNumberHandling}/>
           </div>
           <div className='popup-each-field-container'>
           <label className='popup-label-styling'>Price</label>
           <input type='text' className='popup-input-form-styling' placeholder='Enter Your Price' onChange={this.priceHandle}/>
           </div>
           <div className='pic-upload-main-container'>
            <button className='cancel-button' onClick={this.handleClose}>Cancel</button>
            <button className='cancel-button submit' onClick={this.handleSubmit}>Submit</button>
           </div>
          </Box>
        </Modal>
                  </div>
          </div>
        </div>
             <div className='mb-2'>
             <p className='load-full-details-loads-name'>Load Photos</p>
             <img src='https://s3-alpha-sig.figma.com/img/2b19/59fa/b1e03e33bd5f6af428261c8b629900b7?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=D6WLkKu51kE-ePPaDYFQjVye9miXXMwC1O~o7iVgpDP7NPfX3zKDpdqhOVqMXNbX3WjRqoNC0Et9l-e-qyd9BrOQAlQLBAK00MFhjI4jnFeWHN-G4sC5qh6kq2CUqikkZRY3Pv4pXtcENdVNBo7hRchqleS31rV42uIVRmaxY6r1yKk-1eqXyp1sT8DOkLa25qzIs5bZ2YqJqawBSI3o~BFOWalJhfNwaEj9qq3OGSgOhgLw7ct2FLZn5HX3PlbseQnPMyNRjeyOxYUaaZTNfzFI6AcurC6SUz7L7UtizGRfNOXW9ldYTtyN85oDsAdJWjvu8qMpMMCF3cEV6WbYxw__' alt='goods' className='loads-photo-styling'/>
             </div>
             <div className='load-full-details-footer-container'>
              <FooterEl/>
             </div>
            </div>
            </div>
        )
    }
}
export default FullLoadDetalsEl