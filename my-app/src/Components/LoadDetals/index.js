//each load details in the load page will be displayed
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'; // Import the solid icon
import { Link } from 'react-router-dom/cjs/react-router-dom.min'; 
const LoadDetails=(props)=>{
    const{data}=props;
    const{name,from,to,typeofLoad,_id}=data;
    const viewDetails=()=>{
      console.log(_id)
    }
    return(
        <>
         <div className='load-details-contaner' >
               <div>
                  <h1 className='loads-owner-name'>Owner Name</h1>
                  <p className='loads-name'>{name}</p>
               </div>
               <div>
                  <div className='loads-from-contaner'>
                  <h1 className='loads-owner-name'>From</h1>
                  <FontAwesomeIcon icon={faLocationDot} className='loads-location-from-icon'/>
                  </div>
                  <p className='loads-name'>{from}</p>
               </div>
               <div>
                  <div className='loads-from-contaner'>
                  <h1 className='loads-owner-name'>To</h1>
                  <FontAwesomeIcon icon={faLocationDot} className='loads-location-from-icon'/>
                  </div>
                  <p className='loads-name'>{to}</p>
               </div>
               <div>
                  <h1 className='loads-owner-name'>Type of Goods</h1>
                  <p className='loads-name'>{typeofLoad}</p>
               </div>
               <div>
                  <Link to={`/loads/${_id}`}><button className='loads-view-details-box' onClick={viewDetails}>View Details</button></Link>
               </div>
            </div>
        </>
    )
}
export default LoadDetails