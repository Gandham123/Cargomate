//each driver requests cards will be designed
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const EachDriverRequestCards=(props)=>{
    const{dataReqeusts}=props;
    const{postedBy,loadType,ownerMobileNum,ownerPrice,statusOfRequest}=dataReqeusts;
    const statusButtonExtraStyle=statusOfRequest==="Accepted"?"accepted-button-color-change":''
    return(
        <>
        <div className='driver-requests-each-status-container'>
                    <h1 className='driver-requests-load-details mb-3'>Load Details</h1>
                     <div className='d-flex flex-row justify-content-between'>
                        <div>
                            <h1 className='driver-requests-load-details' style={{fontSize:"20px"}}>Owner Name</h1>
                            <p className='driver-request-details-content'>Mr.{postedBy}</p>
                        </div>
                        <div>
                            <h1 className='driver-requests-load-details' style={{fontSize:"20px"}}>LoadType</h1>
                            <p className='driver-request-details-content'>{loadType}</p>
                        </div>
                        <div>
                            <h1 className='driver-requests-load-details' style={{fontSize:"20px"}}>Contact</h1>
                            <p className='driver-request-details-content'>{ownerMobileNum}</p>
                        </div>
                        <div className='driver-requests-price-container shadow'>
                            <p className='driver-request-price'>Price</p>
                            <p className='driver-requests-load-details' style={{fontSize:"16px",marginTop:"0px"}}>{ownerPrice}</p>
                        </div>
                        <button className={`driver-requests-button-container ${statusButtonExtraStyle}`}>{statusOfRequest}</button>
                     </div>
        </div>
        </>
    )
}
export default EachDriverRequestCards;