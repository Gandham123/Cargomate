import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import HomeEl from './Components/Home';
import AboutEl from './Components/About';
import LoadsEl from './Components/Loads';
import ServicesEl from './Components/Serices';
import ProfileEl from './Components/Profile';
import LoginEl from './Components/Login';
import Protected from './Components/ProtectedRoute';
import RegisterEl from './Components/Registeration';
import FullLoadDetalsEl from './Components/FullLoadDetails';
import CreatePostEl from './Components/CreatePost'; 
import OwnerHomeEl from './Components/OwnerHome';
import AvailbleTrucksEl from './Components/AvailbleTrucks';
import OwnerPageRequesteEl from './Components/OwnerPageRequests';
import OwnerProfileEl from './Components/OwnerProfile';
import DriverDetails from './Components/DriverDeatiledProfile';
import OwnerCreatePostEl from './Components/OwnerCreatePost';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Protected exact path='/' component={HomeEl}/>
        <Protected exact path='/owner' component={OwnerHomeEl}/>
        <Protected exact path='/about' component={AboutEl}/>
        <Protected exact path='/ownerabout' component={AboutEl}/>
        <Protected exact path='/loads' component={LoadsEl}/>
        <Protected exact path='/trucks' component={AvailbleTrucksEl}/>
        <Protected exact path='/trucks/:id' component={DriverDetails}/>
        <Protected exact path='/services' component={ServicesEl}/>
        <Protected exact path='/requests' component={OwnerPageRequesteEl}/>
        <Protected exact path='/profile' component={ProfileEl}/>
        <Protected exact path='/ownerprofile' component={OwnerProfileEl}/>
        <Protected exact path='/loads/:id' component={FullLoadDetalsEl}/>
        <Protected exact path='/driverpost' component={CreatePostEl}/>
        <Protected exact path='/postload' component={OwnerCreatePostEl}/>
        <Route exact path='/login' component={LoginEl}/>
        <Route exact path='/register' component={RegisterEl}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
