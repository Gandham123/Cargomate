import './index.css';
import {Component} from 'react';
import HeaderEl from '../Header';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import FooterEl from '../FooterSection';
import satya from '../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
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

class CreatePostEl extends Component{
    state={truckType:'',driverMailId:'',mobileNuum:'',
        from:'',to:'',message:'',imageUploaded:false,open: false,vehicleImage:''}
    
    handleOpen = async() => {
        const loaclStoredDrivername=JSON.parse(localStorage.getItem("userName"))
       const driverName=loaclStoredDrivername.name;
       const driverImage=loaclStoredDrivername.profilepic;
       const{truckType,driverMailId,mobileNuum,from,to,message,vehicleImage}=this.state;
            const finalDriverDetails={
                driver_name:driverName,
                truck_type:truckType,
                email_id:driverMailId,
                mobile_number:mobileNuum,
                from_address:from,
                to_address:to,
                message:message,
                truck_image:vehicleImage,
                driver_image:driverImage
            }
            console.log(finalDriverDetails);
            const token=Cookies.get('token')
            const option={
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify(finalDriverDetails)
            }
            //const url="";
            const response= await fetch("http://localhost:4000/driverpost",option)
            const data=await response.json();
            console.log(data)
            if(response.ok===true){
                this.setState({open:true})
            }else{
                
                alert(data.message)
            }
            //this.setState({open:true})
        
    }; 
    handleClose = () => {
        this.setState({ open: false });
    };
    nameTypeHandle=(event)=>{
        this.setState({truckType:event.target.value})
    }
    emailHandling=(event)=>{
        this.setState({driverMailId:event.target.value})
    }
    mobileNumHandeling=(event)=>{
        this.setState({mobileNuum:event.target.value})
    }
    fromHandling=(event)=>{
        this.setState({from:event.target.value})
    }
    toHandling=(event)=>{
        this.setState({to:event.target.value})
    }
    messageHandling=(event)=>{
        this.setState({message:event.target.value})
    }
    vehicleImageUpload=async(event)=>{
        const image=event.target.files[0];
        const{imageUploaded}=this.state;
        if(image){
          if(imageUploaded){
            alert('already image has already uploaded')
          }
          else{
          const storage=getStorage(satya);
          const storageRef=ref(storage,"images/"+image.name);
          await uploadBytes(storageRef,image);
          const downloadUrl=await  getDownloadURL(storageRef);
          this.setState({vehicleImage:downloadUrl,imageUploaded:true})
          }
        }
    }

    render(){
        const{imageUploaded,open}=this.state;
        const localyStoredUserName=JSON.parse(localStorage.getItem('userName'))
        let styleApply=open?'overlay':'';
        return(
            <>
            <HeaderEl/>
            <div className='create-post-main-container' style={{backgroundImage:`url(${process.env.PUBLIC_URL}/box.png)`}}>
               <div className={`create-post-container ${styleApply}`}>
                <img src='create.png' alt='truck' className='create-post-image-styling'/>
                <div className='create-post-form-contaienr'>
                    <div className='create-post-form-first-line'>
                        <div className='create-post-driver-name-container'>
                        <label className='create-post-label-styling'>Driver Name</label>
                        <br/>
                        <p className='create-post-input-field-styling'>{localyStoredUserName.name}</p>
                        </div>
                        <div className='create-post-driver-name-container'>
                        <label className='create-post-label-styling' style={{color:'#000',fontWeight:500}}>Truck Type</label>
                        <br/>
                        <input type='text' className='create-post-input-field-styling' onChange={this.nameTypeHandle} placeholder='Container'/>
                        </div>
                    </div>
                    <div className='create-post-form-first-line mt-5'>
                        <div className='create-post-driver-name-container'>
                        <label className='create-post-label-styling'>Email</label>
                        <br/>
                        <input type='text' className='create-post-input-field-styling' onChange={this.emailHandling} placeholder='eaxmple@gmail.com'/>
                        </div>
                        <div className='create-post-driver-name-container'>
                        <label className='create-post-label-styling' style={{color:'#000',fontWeight:500}}>Phone Number</label>
                        <br/>
                        <input type='text' className='create-post-input-field-styling' onChange={this.mobileNumHandeling} placeholder='+91 8165432234'/>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <h1 className='from-to'>From-To</h1>
                        <div className='create-post-from-to-container'>
                        <FontAwesomeIcon icon={faSquareCheck} className='icon-styling' />
                        <input type='text' className='input-from' onChange={this.fromHandling}/>
                        <div className='icon-styling-circle'></div>
                        <input type='text' className='input-from' onChange={this.toHandling}/>
                        </div>
                    </div>
                    <div className='mt-5 message-container'>
                        <p className='message-name-styling'>Message</p>
                        <input type='text' className='message-input-styling' placeholder='Write your message' onChange={this.messageHandling}/>
                    </div>
                    <div className='mt-5 create-post-bottom-container'>
                     <div>
                     <h1 className='vehicle-photo-name'>Vehicle Photo</h1>
                     <div className='pic-upload-container' onClick={() => this.fileInput.click()}>
                            {imageUploaded ? '' : <FontAwesomeIcon icon={faArrowUpFromBracket} />}
                            <p className='pic-upload-name-style'>{imageUploaded ? 'Uploaded' : 'Upload'}</p>
                            <input 
                                type='file'
                                onChange={this.vehicleImageUpload}  
                                style={{ display: 'none' }}
                                ref={input => this.fileInput = input}
                            />
                        </div>
                     </div>
                     <div>
                     <Button style={createPostButton} onClick={this.handleOpen} >Share Post</Button>
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
                           <img src='tipper.png' className='image-styling' alt='image'/>
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
export default CreatePostEl