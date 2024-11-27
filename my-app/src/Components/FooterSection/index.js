import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

const FooterEl=()=>{
    return(
        <>
        <div className='footer-bg-container'>
            <div className='footer-first-container'>
                <h1 className='footer-app-name'>CARGOMATE</h1>
                <p className='footer-transport-name'>Transport Services</p>
            </div>
            <div className='footer-second-container'>
                <h1 className='footer-quick-link'>Quick Link</h1>
                <p className='footer-home-styling'>Home</p>
                <p className='footer-home-styling'>About Us</p>
                <p className='footer-home-styling'>Loads</p>
                <p className='footer-home-styling'>Services</p>
            </div>
            <div className='footer-third-container'>
            <h1 className='footer-quick-link'>Get In Touch</h1>
            <p className='footer-home-styling'>Need Help</p>
            <h1 className='footer-quick-link mt-3'>Follow Me</h1>
            <div className='footer-socila-media-icons-container'>
                <div className='footer-icon-container'>
                 <FontAwesomeIcon icon={faFacebookF} className="footer-icon-styling" />
                </div>
                <div className='footer-icon-container'>
                <FontAwesomeIcon icon={faInstagram}className="footer-icon-styling" />
                </div>
                <div className='footer-icon-container'>
                 <FontAwesomeIcon icon={faYoutube} className="footer-icon-styling" />
                </div>
            </div>
            
            </div>
            <div className='footer-fourth-container'>
                <h1 className='footer-address-heading'>Address</h1>
                <p className='footer-home-styling footer-extra'>Rajiv Gandhi university of unknowledge and technology ,Srikakulam</p>
            </div>
        </div>
        </>
    )
}
export default FooterEl;