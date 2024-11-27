import Cookies from "js-cookie";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
const Protected=(props)=>{
    const jwt=Cookies.get('token')
    if(jwt!==undefined){
       return <Route {...props}/>
    }
    else{
        return <Redirect to='/login'/>
    }
}
export default Protected