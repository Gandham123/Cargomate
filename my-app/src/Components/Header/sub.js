import './sub.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
const SubHeader=(props)=>{
    const{subData, activeFun,isActive}=props;
    const{Item,id,address}=subData;
    const activeElStyling=isActive?'sub-header-active-styling':'';
    const sendActiveId=()=>{
        activeFun(id);
    }
    return(
        <div className='sub-header-main-container'>
           <Link to={address} className={`sub-header-home-styling ${activeElStyling}`} onClick={sendActiveId}>{Item}</Link>
        </div>
    )
}
export default withRouter(SubHeader);