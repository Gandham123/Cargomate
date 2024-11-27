//in this page the owner profile each completed load card will be designed
import"./index.css";
const EachCompletedLoadEl=(props)=>{
    const{completedData}=props;
    const{fromAddress,toAddress,loadType,updatedAt}=completedData;
    const date = new Date(updatedAt);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    const formatedDate=`${day}/${month}/${year}`
    return(
        <>
        <div className='profile-each-reacent-posts shadow'>
                    <div className='from-address-container'>
                        <h1 className='profile-recent-from-address-style'>{fromAddress}</h1>
                    </div>
                    <div className='from-address-container'>
                        <h1 className='profile-recent-from-address-style'>{toAddress}</h1>
                    </div>
                    <div className='from-address-container'>
                        <h1 className='profile-recent-from-address-style' style={{fontSize:18,marginTop:6}}>{loadType}</h1>
                    </div>
                    <div className='from-address-container'>
                        <h1 className='profile-recent-from-address-style' style={{color:'#0F6900'}}>{formatedDate}</h1>
                    </div>
        </div>
        </>
    )
}
export default EachCompletedLoadEl;