import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie";
import Alert from '@mui/material/Alert';
import { ThreeDots } from 'react-loader-spinner';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  height: "570px",
  width: "530px",
  borderRadius: "30px",
  boxShadow: 24,
  padding: "50px",
};
const apiStatusList={
    loading:"LOADING",
    failure:"FAILURE",
    success:"SUCCESS"

}

class OwnerEachRequestCardsEl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: 0,
      reviewMessage:'',apiStatus:'',
      showAlert:false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
    console.log("Selected Rating:", newValue);
  };

  AcceptHandling = async () => {
    const { _id } = this.props.dataReqeusts;
    const token = Cookies.get('token');
    const option = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
    const response = await fetch(`http://localhost:4000/driverrequests/${_id}?status_update=Accepted`, option);

    if (response.ok === true) {
      this.props.acceptfun(_id);
    } else {
      const data = await response.json();
      console.log(data);
      alert("Please Refresh the Page and Try Again and check your network connection");
    }
  };

  CancelHandeling = async () => {
    const { _id } = this.props.dataReqeusts;
    const token = Cookies.get('token');
    const option = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
    const response = await fetch(`http://localhost:4000/driverrequests/${_id}?status_update=Rejected`, option);

    if (response.ok === true) {
      this.props.cancelfun(_id);
    } else {
      alert("Please Refresh the Page and Try Again and check your network connection");
    }
  };
  reviewMessageHandling=(event)=>{
      this.setState({reviewMessage:event.target.value});
  }
  submittingReview=async()=>{
    this.setState({apiStatus:apiStatusList.loading})
    const{value,reviewMessage}=this.state;
    const token=Cookies.get('token');
    const locallyStoredUserDetails=JSON.parse(localStorage.getItem("userName"));
    const localyOwnerName=locallyStoredUserDetails.name;
    const { driverName,_id} =this.props.dataReqeusts;
    const finallyReviewDetails={
        ownerName:localyOwnerName,
        driverName:driverName,
        rating:value,
        reviewMessage:reviewMessage,
        requestId:_id,
    }
    const option={
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(finallyReviewDetails)
    }

    this.props.completefun(this.props.dataReqeusts._id)
    const response=await fetch("http://localhost:4000/reviews",option)
    if(response.ok===true){
        this.setState({ showAlert: true , open: false,apiStatus:apiStatusList.success,value:0,reviewMessage:''});
      setTimeout(() => {
        this.setState({ showAlert: false });
      }, 6000);
    }
    else{
        this.setState({apiStatus:apiStatusList.failure})
        alert('please try after some time')
    }

  }

  render() {
    const { dataReqeusts } = this.props;
    const { driverName, truckNumber, driverMobile, price, statusOfRequest } = dataReqeusts;
    const { open, value ,reviewMessage,apiStatus} = this.state;

    let finalStatusButton = null;
    let submittButtonRender=null;
    if (statusOfRequest === "Pending") {
      finalStatusButton = (
        <div className="d-flex flex-column ">
          <button className="Owner-requests-button-container" onClick={this.AcceptHandling} style={{ marginTop: "-15px" }}>Accept</button>
          <button className="Owner-requests-button-container" onClick={this.CancelHandeling} style={{ backgroundColor: "#FF0004", marginTop: "6px", marginBottom: "10px" }}>Cancel</button>
        </div>
      );
    } else if (statusOfRequest === "Accepted") {
        if(apiStatus===apiStatusList.loading){
            submittButtonRender=<div className="d-flex flex-row justify-content-center">
                <ThreeDots color='#ffffff' height='30' width='30'/>
            </div>
        }
        else{
            submittButtonRender="Submit"
        }
      finalStatusButton = (
        <div>
          <Button onClick={this.handleOpen} className="Owner-requests-button-container" style={{ backgroundColor: "#60FF46", color: "#ffffff", borderRadius: "14px" }}>Pending</Button>
          <Modal
            open={open}
            onClose={this.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="d-flex flex-row">
                <FontAwesomeIcon icon={faCheck} className="tick-icon-styling-review" />
                <p className="review-card-complete-load">Complete Load</p>
              </div>
              <hr className="review-card-line" />
              <p className="review-card-complete-load mt-5 mb-4">Thank you ....! Please give a driver review</p>
              <Stack spacing={1}>
                <Rating
                  name="half-rating"
                  value={value}
                  precision={0.5}
                  onChange={this.handleChange}
                  sx={{
                    '& .MuiRating-icon': {
                      fontSize: '35px', 
                    },
                  }}
                />
              </Stack>
              <p className="review-card-complete-load mt-4" style={{ fontSize: "16px", marginBottom: "0px", marginLeft: "10px" }}>Write a review</p>
              <textarea rows={3} cols={30} className="review-card-message-container mb-4" onChange={this.reviewMessageHandling} value={reviewMessage}/>
              <div className="d-flex flex-row justify-content-center">
                <button className="Owner-requests-button-container" onClick={this.submittingReview}>{submittButtonRender}</button>
                <button className="Owner-requests-button-container" style={{ backgroundColor: "#FF0004", marginLeft: "20px" }} onClick={this.handleClose}>Cancel</button>
              </div>
            </Box>
          </Modal>
        </div>
      );
    } else if (statusOfRequest === "Completed") {
      finalStatusButton = (
        <div>
          <button className="Owner-requests-button-container" style={{ backgroundColor: "#15008C" }}>Completed</button>
        </div>
      );
    } else {
      finalStatusButton = (
        <div>
          <button className="Owner-requests-button-container" style={{ backgroundColor: "#E35A5C" }}>Declined</button>
        </div>
      );
    }

    return (
      <>
        <div className='Owner-requests-each-status-container'>
        {this.state.showAlert && (
          <Stack className="custom-alert" spacing={2}>
            <Alert severity="success">Your Review Submitted Successfully.</Alert>
          </Stack>
        )}
          <h1 className='Owner-requests-load-details mb-3'>Driver Details</h1>
          <div className='d-flex flex-row justify-content-between'>
            <div>
              <h1 className='Owner-requests-load-details' style={{ fontSize: "20px" }}>Driver Name</h1>
              <p className='Owner-request-details-content'>Mr.{driverName}</p>
            </div>
            <div>
              <h1 className='Owner-requests-load-details' style={{ fontSize: "20px" }}>Truck Number</h1>
              <p className='Owner-request-details-content'>{truckNumber}</p>
            </div>
            <div>
              <h1 className='Owner-requests-load-details' style={{ fontSize: "20px" }}>Contact</h1>
              <p className='Owner-request-details-content'>{driverMobile}</p>
            </div>
            <div className='Owner-requests-price-container shadow'>
              <p className='Owner-request-price'>Price</p>
              <p className='Owner-requests-load-details' style={{ fontSize: "16px", marginTop: "0px" }}>{price}</p>
            </div>
            <div>
              {finalStatusButton}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default OwnerEachRequestCardsEl;
