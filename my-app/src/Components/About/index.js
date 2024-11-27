import './index.css';
import FooterEl from '../FooterSection';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import HeaderEl from '../Header';
import OwnerHeaderEl from '../OwnerHeader';

const AboutEl=()=>{
  const storedUserDetails=JSON.parse(localStorage.getItem('userName'))
  const typeofuser=storedUserDetails.typeofuser
    return(
        <>
        {typeofuser==="owner"?<OwnerHeaderEl/>:<HeaderEl/>}
        <div className="about-main-container">
        <div className='about-carsoule-container'>
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src="https://www.daimlertruck.com/fileadmin/_processed_/2/e/csm_bharatbenz-truck-range_e369558ef3.jpg" alt="First slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTteOMDUwG2-ymYlwwCGn-PeR7LJFSxbKX9tg&s" alt="Second slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="https://www.shutterstock.com/image-photo/dump-truck-unloading-process-260nw-1071560795.jpg" alt="Third slide" />
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only"></span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only"></span>
      </a>
        </div> 
        </div>
        <div className='about-discription-contaainer'>
            <h1 className='about-heading'>Welcome to <span className='about-extra-style-heading'>CARGOMTE</span></h1>
            <p className='abot-question-text'>Who we are?</p>
            <p className='about-answer-text'>Cargomate is one of the leading players in the transportation industry that connects trans|
                customers and other related entities across India with the objective of making the material tri
                quicker and efficient by providing better vehicle at affordable rates.<br/>
                We help all people associated with the community achieve better profitability in their own busi
                practices and business ethics for the benefit of transporter and customer community.</p>
            <p className='abot-question-text'>What we do?</p>
            <p className='about-answer-text'>Cargomate is one of the leading players in the transportation industry that connects trans|
                customers and other related entities across India with the objective of making the material tri
                quicker and efficient by providing better vehicle at affordable rates.<br/>
                We help all people associated with the community achieve better profitability in their own busi
                practices and business ethics for the benefit of transporter and customer community.</p>
        </div>
        </div>
        <div className='about-can-do-main-container'>
           <div className='about-first-container'>
            <div>
                <h1 className='about-improve-heading'>Improves</h1>
                <div className='about-improves-container mt-3'>
                    <div className='about-icon-small-device'>
                    <div className='about-improve-icon-container'>
                    <i className="bi bi-gift-fill about-icon"></i>
                    </div>
                    </div>
                    <div>
                    <div className='about-improves-description-container'>
                    <p className='about-improves-description'>Cargomate improves productivity by
                            reducing the time it takes to search for loads
                            or trucks by using a state of the art filtered
                            email notification system and eliminating
                            non-relevant services  and animated
                            ads that tend to clutter most freight matching
                            load board services.
                    </p>
                    </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 className='about-improve-heading'>Excellence of services</h1>
                <div className='about-improves-container mt-3'>
                    <div className='about-icon-small-device'>
                    <div className='about-improve-icon-container'>
                    <i className="bi bi-hand-thumbs-up about-icon"></i>
                    </div>    
                    </div>
                    <div>
                    <div className='about-improves-description-container'>
                    <p className='about-improves-description'>Cargomate improves productivity by
                            reducing the time it takes to search for loads
                            or trucks by using a state of the art filtered
                            email notification system and eliminating
                            non-relevant services  and animated
                            ads that tend to clutter most freight matching
                            load board services.
                    </p>
                    </div>
                    </div>
                </div>
            </div>
           </div>
           <div className='about-first-container'>
            <div>
                <h1 className='about-improve-heading'>Our Vision</h1>
                <div className='about-improves-container mt-3'>
                    <div className='about-icon-small-device'>
                    <div className='about-improve-icon-container'>
                    <i className="bi bi-eye-fill about-icon"></i>
                    </div>
                    </div>
                    <div>
                    <div className='about-improves-description-container'>
                    <p className='about-improves-description'>Cargomate improves productivity by
                            reducing the time it takes to search for loads
                            or trucks by using a state of the art filtered
                            email notification system and eliminating
                            non-relevant services  and animated
                            ads that tend to clutter most freight matching
                            load board services.
                    </p>
                    </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 className='about-improve-heading'>Our Mission</h1>
                <div className='about-improves-container mt-3'>
                    <div className='about-icon-small-device'>
                    <div className='about-improve-icon-container'>
                    <i className="bi bi-person-fill about-icon"></i>
                    </div>    
                    </div>
                    <div>
                    <div className='about-improves-description-container'>
                    <p className='about-improves-description'>Cargomate improves productivity by
                            reducing the time it takes to search for loads
                            or trucks by using a state of the art filtered
                            email notification system and eliminating
                            non-relevant services  and animated
                            ads that tend to clutter most freight matching
                            load board services.
                    </p>
                    </div>
                    </div>
                </div>
            </div>
           </div>
           <div className='abot-team-container'>
            <h1 className='about-team-heading'>Team <span className='about-team-extra-styling'>Purpose</span></h1>
            <p className='about-team-discription'>We at trucksuvidha.com are committed to our self, Customers, Employees and Partners to provide best in
                class transportation solutions . Trucksuvidha.com enables transporters and customers to meet their business
                objectives effectively. We aim at achieving highest standards of work for our customers. Our commitment to
                excellence will help the transportation industries and customers achieve financial growth and prosperity. To
                know more about us , please contact us and our representative will assist you shortly.
                </p>
           </div>
        </div>
        <FooterEl/>
        </>
    )
}
export default AboutEl;