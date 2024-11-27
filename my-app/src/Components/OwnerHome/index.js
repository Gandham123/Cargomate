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
            <div className='Home-bg-container'>
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
                        <img src='https://s3-alpha-sig.figma.com/img/9c84/4ffc/81f5a8780944685b1d2739891fa83f32?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oBklCtRL8Deia9bQ5VXc216GlNLt7bCglsV3f57i4C3Ii05zjpFrIYTrh9FKdOmRyVpasEkqsero06Rntd7B3eU7iGtSN-H8x-MaHyl9yvogckkICXhRKILrxhMC2GMf25SgPe5aB9O~yAmA4yx413eqrTcPThuQbQEi5SHb2zZlaVrOxyuN8XJOCbNS1P1~rgFrVUXeP8r-Op4MHmu6elPO9eJwWyRQ6bgr89IpsCrQYEU3nlE-qF-yO-PDDsh0V4CVxB7hNTyp92fBy8GlE9AsP30OSXka4JnX0W3J~Dc9VHdg1cFA0Veut6Xlkfj53IhvjzOdk8klvbmlI~enAw__' className='home-features-image-styling' alt='features'/>
                        <p className='home-feture-name'>Fast Delivery</p>
                    </div>
                    <div className='home-features-images-first-container home-second-feature shadow'>
                        <img src='https://s3-alpha-sig.figma.com/img/2ee5/f395/8e01d0c3fb70e4ae8d4b0291d6d7e6a1?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NcPBN~3-~LGxs4VhJ36r4gfqBYNEhDDyxjjNtnOG7z9jTvxnUd8DPE23VBTdduBZ0tSTGwEunha-fCrlWESChKPsa2jtkxKHWA-rlVux2oXmRC7oQboZRyWNmnMuu1x8M5V-TDlxerrUrly5l8580~WqXh4uiL6XfDl0jWRJsmWSFErCL9OzTbfRA9ptWiKee9BZN32Hl9DYkP1VKEMplUl86sKRivPXwOr3GucGX5LJfxYF0O5cSvVeVrkeUDfnKWJMVeSGvxY-FCV9LKGeCefK0xWcGfmqHIfF4vzLRlilzqKwMpF-QeJSynzSfFq6g6v8UJmC4uSH4eX20Moohg__' className='home-features-image-styling' alt='features'/>
                        <p className='home-feture-name'>Load Finding</p>
                    </div>
                </div>
                <div className='home-feature-image-container'>
                    <img src='https://s3-alpha-sig.figma.com/img/07fd/e636/760a8a9514a5f7faa2bb485ba6c12625?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qLx~EoASEhM59UBYOfCQB5UPL4B8RBDwPbTKAF9oxSw7CiD1Z6zlpZww4XdFZpQUwxY1vU9-Cg3sPVrqaEKbOdK02nbw5hv9RXXOrnqMVJzKqtekabjOAnVifmy7xI3FHyLYsuxoSrcusONsY7y~cRkhySB8hHox5keQ1FYRsMzaMxi56mCR5Mle1HsFopGZxlnuuB3sZXiwLidTpk5gqOidKzMCq0wVaAp3PdqUWXolgeRpiey-Vzafq9Q1MOF6oETA3NUaJRJztD0wdGcYLvxK6DYRxeUEiSil~M9CSd7VNUk9M1A3iOBL8nIC1ApuTn1IiIEasQY29IRSY1IJPw__' className='home-feature-truck-image' alt='truck'/>
                </div>
                <div className='home-features-images-third-container'>
                    <div className='home-features-images-first-container home-second-feature shadow'>
                        <img src='https://s3-alpha-sig.figma.com/img/9565/b133/4e892eb855bcff780372ba3c79422169?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cYy7mryz1k5pia9XUCAHUZ-42p5k2cYWJSJQw72C4UYUD0nqaw-ertD8w~LP6XWJuWsLN9N5zcP74jYmor-3ptvifCdIwYXELGUwSfcfxsSC1bE5PJzntbzLHtSgLhPsLRE82hXHs8YmjbPcpI3kxzWbn22KPSgDAOG3TDAcVNqZrVBQ4xeX6LAS5o8928soGDxEGEe0gNeDZQ7Y4E2suCph3WRE4FuZMMk2BhXFGSAs62P9OPP6Ur81eh7NbRO6JosicItA78fcesZyVBoFat9ygwdxSGdbaJj-wd2wYimlTrX9sPxc7yOPX2JlGSAqZE7RgMnzWbg1uaIX0c0fJA__' className='home-features-image-styling' alt='features'/>
                        <p className='home-feture-name'>Direct Contacting</p>
                    </div>
                    <div className='home-features-images-first-container shadow'>
                        <img src='https://s3-alpha-sig.figma.com/img/487d/0ebc/3ae7d6d09c89a06e18e3573f4cb479eb?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WQ0IVNsfokp6zUd2A4TbbN-K9tk5ay6iXeP6iQk8XMKQ1fyec3NqQfuVhD2K-nWoJvPlDWUz3W~m5eVnbsfxZjyDH6-ROBEyBJiGJC4-j~meqMaQThWuKVno5H3omnmw2Npi2K1fpJNcuJ44nEGusmzuOtiDPgVvoE9bYtYWLGhFyek07qXbWdOi1OxbQdouimBGjiGfSnuyyyaOZHg58r6NRlnqapPF92efboGm98XKuaicuWaOtxFD2TFhGIVt7yYaNrylQki1kK-yl8RZ33wV7QraQGK4sx24-t8~SFMmyVTBgEQb5PjndQozH67qu1aOgKQQP5gR3Kir1-caFw__' className='home-features-image-styling' alt='features'/>
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