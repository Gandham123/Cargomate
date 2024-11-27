import "./index.css";
import { Component } from "react";
import OwnerHeaderEl from "../OwnerHeader";
import FooterEl from "../FooterSection";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ThreeDots } from 'react-loader-spinner';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Cookies from 'js-cookie';
const style = {
    position: 'absolute',
    top:'50%',
    left: '50%',
    bottom:'50%',
    transform: 'translate(-50%, -50%)',
    width: 500, // Width set to 400px
    height: 400, // Height set to 800px
    bgcolor: '#ffffff',
    borderWidth:1,
    borderStyle:'solid',
    borderColor:'#000000',
    p: 4, 
    borderRadius:8,
};
const createPostButton={width: '150px',
    height: '40px',
    borderWidth: '0px',
    backgroundColor: '#00BD5C',
    color: '#ffffff',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 400,
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '8px',
    textAlign: 'center',
    paddingTop: '8px',
    marginTop: '30px'
}

class OwnerCreatePostEl extends Component{
    state={loadType:'',phoneNumber:'',amount:'',from:'',to:'',open: false,selectedDate: dayjs('2024-11-14'),
        unLoadingDate:dayjs('2024-11-14'),loadWeight:'',inProgress:false}
    handleOpen=async ()=>{
        this.setState({inProgress:true})
        const locallyStoredUser=JSON.parse(localStorage.getItem('userName'));
        const{loadType,phoneNumber,amount,loadWeight,from,to,selectedDate,unLoadingDate}=this.state;
        const token=Cookies.get('token');
        const finallLoadDetails={
            name:locallyStoredUser.name,
            loadDate:selectedDate.format('DD/MM/YYYY'),
            unloadDate:unLoadingDate.format('DD/MM/YYYY'),
            weight:loadWeight,
            from,
            to,
            price:amount,
            mobileNumber:phoneNumber,
            typeofLoad:loadType,
            ownerImage:locallyStoredUser.profilepic
        }
        const option={
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(finallLoadDetails)
        }
        const response=await fetch('http://localhost:4000/load',option);
        if(response.ok===true){
            this.setState({open:true,loadType:'',phoneNumber:'',amount:'',from:'',to:'',selectedDate: dayjs('2024-11-14'),
            unLoadingDate:dayjs('2024-11-14'),loadWeight:'',inProgress:false})
        }
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    LoadTypeHandle=(event)=>{
        this.setState({loadType:event.target.value})
    }
    phoneNumberHandling=(event)=>{
        this.setState({phoneNumber:event.target.value})
    }
    amountHandeling=(event)=>{
        this.setState({amount:event.target.value})
    }
    fromHandling=(event)=>{
        this.setState({from:event.target.value})
    }
    toHandling=(event)=>{
        this.setState({to:event.target.value})
    }
    handleDateChange = (newDate) => {
        this.setState({ selectedDate:newDate});
    };
    handleUnLoadDate=(newDate)=>{
        //const formattedDate = newDate.format('DD/MM/YYYY'); 
        this.setState({unLoadingDate:newDate})
    }
    handelWeight=(event)=>{
        this.setState({loadWeight:event.target.value})
    }
    render(){
        const{open,inProgress,loadType,amount,phoneNumber,from,to,loadWeight}=this.state;
        let styleApply=open?'overlay':'';
        const locallyStoredOwnerDetails=JSON.parse(localStorage.getItem('userName'))
        return(
            <>
            <div>
                <OwnerHeaderEl/>
                <div className='create-post-main-container'>
                 <div className={`create-post-container ${styleApply}`}>
                <img src='https://s3-alpha-sig.figma.com/img/2559/76a9/edccfa26a962859bdc2e578a0d87fa83?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lEO4113f6oamzMktbD96Wq-0QT8SNZWe1fA5~acPPXT~guVWzkrIbVijFlN2iwnafjiqfj67aR39xL31d9z2xpV4Nmbtx8SSi6yR5I-o1Uhl-gSiWlEoRoDfBl8zklL5HuDFjrqw7KNDlwy6euq4o-0FKuhvQBSNm27yTsM0nrKhPqRpD3aC9q9BKJB-FpYf-G0P4d0j2n2F6s-QvD26Csiv4Iy0rG2IuVJdLgo44ItMcj~a~QQtwA~MvL5OZyJEdDHaciOFr0qf58ESMC-r3ryDvC4VOWB5IqoUevDumfspRv2SKaAGaFVPqOONxHo9nOI6mayEhsZIqzcEzPeYMg__' alt='truck' className='create-post-image-styling'/>
                <div className='create-post-form-contaienr'>
                    <div className='create-post-form-first-line'>
                        <div className='create-post-driver-name-container'>
                        <label className='create-post-label-styling'>Owner Name</label>
                        <br/>
                        <p className='create-post-input-field-styling'>{locallyStoredOwnerDetails.name}</p>
                        </div>
                        <div className='create-post-driver-name-container'>
                        <label className='create-post-label-styling' style={{color:'#000',fontWeight:500}}>Load Type</label>
                        <br/>
                        <input type='text' className='create-post-input-field-styling' onChange={this.LoadTypeHandle} placeholder='Fruits' value={loadType}/>
                        </div>
                    </div>
                    <div className='create-post-form-first-line mt-3'>
                        <div className='create-post-driver-name-container'>
                        <label className='create-post-label-styling'>Phone Number</label>
                        <br/>
                        <input type='text' className='create-post-input-field-styling' onChange={this.phoneNumberHandling} placeholder='7867679876' value={phoneNumber}/>
                        </div>
                        <div className='create-post-driver-name-container'>
                        <label className='create-post-label-styling' style={{color:'#000',fontWeight:500}}>Amount</label>
                        <br/>
                        <input type='text' className='create-post-input-field-styling' onChange={this.amountHandeling} placeholder='10000' value={amount}/>
                        </div>
                    </div>
                    <div className='create-post-form-first-line mt-3'>
                        <div className='create-post-driver-name-container'>
                        <label className='create-post-label-styling'>Load Weight</label>
                        <br/>
                        <input type='text' className='create-post-input-field-styling' onChange={this.handelWeight} placeholder='6 Tons' value={loadWeight}/>
                        </div>
                    </div>
                    <div className='mt-3 mb-4'>
                        <h1 className='from-to'>From-To</h1>
                        <div className='create-post-from-to-container'>
                        <FontAwesomeIcon icon={faSquareCheck} className='icon-styling' />
                        <input type='text' className='input-from' onChange={this.fromHandling} value={from}/>
                        <div className='icon-styling-circle'></div>
                        <input type='text' className='input-from' onChange={this.toHandling} value={to}/>
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-start" style={{marginTop:"60px"}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div style={{maxWidth: '200px'}}>
                        <DesktopDatePicker
                            label="Loading Date"
                            value={this.state.selectedDate}
                            onChange={this.handleDateChange}
                            format="DD/MM/YYYY"  // Custom date format
                        />
                        </div>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div style={{maxWidth: '200px',marginLeft:"40px"}}>
                        <DesktopDatePicker
                            label="Unloading Date"
                            value={this.state.unLoadingDate}
                            onChange={this.handleUnLoadDate}
                            format="DD/MM/YYYY"  // Custom date format
                        />
                        </div>
                    </LocalizationProvider>
                    </div>
                    <div className="share-post mt-3">
                    <Button style={createPostButton} onClick={this.handleOpen} >{inProgress?<ThreeDots color='#ffffff' height='30' width='30'/>:'Share Post'}</Button>
                     <Modal
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <div className='icon-container'>
                        <FontAwesomeIcon icon={faCircleXmark}  className='popup-icon-styling' onClick={this.handleClose}/>
                        </div>
                        <div className='popup-container'>
                           <img src='https://s3-alpha-sig.figma.com/img/07fd/e636/760a8a9514a5f7faa2bb485ba6c12625?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ihlZTtUHNFaoOrpIhaA3Uo-gkIgP53iODFzY0JynN2qqhhRbcaWHsH30COnvZauofOjTF99h8LZD6vekx8T6DEnywF1j1Fs8IZ7ys8bQ5iyBFydhKRKf41rM3728uo6DdBZBGGyVKRfFXQH06Hpp~S01IHxoUIvAWWVlioqRVzx5nKArj~v1rtgLsdbYET7tIY3By0HAaK4WiSfPYb9lZeV~VEiMAJiLZv3eVpVDbgv0yo2cDIg1ucY5Na5NmmuHq-3D1SBvwdawjjmKdYxxPlQsH8dusG0NJ0nK2VrA2WaxHO9DIqoa3ORJ9eadE2DsgQLltMfqPs5tQpJiAkLBfw__' className='image-styling' alt='image'/>
                           <p className='thanks'>Thank for contacting</p>
                           <h1 className='cragomate'>CARGOMATE</h1>
                        </div>
                    </Box>
                    </Modal>
                    </div>
                </div>
                 </div>
                </div>
            </div>
             <div className='create-post-footer-container'>
                <FooterEl/>
             </div>
            </>
        )
    }
}
export default OwnerCreatePostEl;