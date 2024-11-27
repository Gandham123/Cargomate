import './index.css';

const EachRecentPostEl=(props)=>{
    const{recentPostsData}=props;
    const{from_address,to_address,message,createdAt}=recentPostsData;
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
    return(
        <div className='profile-each-reacent-posts shadow'>
                    <div className='from-address-container'>
                        <h1 className='profile-recent-from-address-style'>{from_address}</h1>
                    </div>
                    <div className='from-address-container'>
                        <h1 className='profile-recent-from-address-style'>{to_address}</h1>
                    </div>
                    <div className='from-address-container'>
                        <h1 className='profile-recent-from-address-style' style={{fontSize:18,marginTop:6}}>{message}</h1>
                    </div>
                    <div className='from-address-container'>
                        <h1 className='profile-recent-from-address-style' style={{color:'#0F6900'}}>{formattedDate}</h1>
                    </div>
        </div>
    )
}
export default EachRecentPostEl;