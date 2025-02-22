import './index.css';
import { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import OwnerHeaderEl from '../OwnerHeader';
import FooterEl from '../FooterSection';

class OwnerHomeEl extends Component{
    render(){
        return(  
            <>
            <OwnerHeaderEl/>
            <div className='Home-bg-container' style={{backgroundImage:`url(${process.env.PUBLIC_URL}/transpotation.jpg)`}}>
            <h1 className='home-first-line-heading'>WELCOME TO OWNER’S PORTAL</h1>
            <h1 className='home-second-line-heading'>CARGOMATE</h1>
            <div className='home-buttons-container'>
               <Link to='/trucks' className='home-linking-style'><button className='home-first-buton' type='button'>Availble Trucks</button></Link>  
             <Link to='/postload' className='home-linking-style'><button className='home-second-buton' type='button'>Create Post</button></Link>
            </div>
        </div>
        <div className='home-features-sections'>
            <h1 className='home-features-heading'>Features of <span className='home-features-extra'>CARGOMATE</span></h1>
            <p className='home-features-description'>Our transport solution offers seamless communication between drivers and goods owners, ensuring real-time messaging for efficient coordination. With live GPS tracking, you can monitor your shipments at all times for added peace of mind. The user-friendly booking interface makes scheduling effortless, while driver ratings and reviews help you select the best professionals for your needs. Plus, our 24/7 customer support is always available to assist you, ensuring a smooth and reliable transport experience.</p>
            <div>
                <div className='home-features-images-main-container'>
                    <div className='home-features-images-first-container shadow'>
                        <img src='delivery.jpg' className='home-features-image-styling' alt='features'/>
                        <p className='home-feture-name'>Fast Delivery</p>
                    </div>
                    <div className='home-features-images-first-container home-second-feature shadow'>
                        <img src='fruits.jpg' className='home-features-image-styling' alt='features'/>
                        <p className='home-feture-name'>Load Finding</p>
                    </div>
                </div>
                <div className='home-feature-image-container'>
                    <img src='tipper.png' className='home-feature-truck-image' alt='truck'/>
                </div>
                <div className='home-features-images-third-container'>
                    <div className='home-features-images-first-container home-second-feature shadow'>
                        <img src='caller.jpg' className='home-features-image-styling' alt='features'/>
                        <p className='home-feture-name'>Direct Contacting</p>
                    </div>
                    <div className='home-features-images-first-container shadow'>
                        <img src='timer.jpg' className='home-features-image-styling' alt='features'/>
                        <p className='home-feture-name'>Save Time</p>
                    </div>
                </div>
            </div>
        </div> 
        <FooterEl/>
        </>
        )
    }
}
export default OwnerHomeEl;