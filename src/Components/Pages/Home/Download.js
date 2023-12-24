import React from 'react'
import { Link } from 'react-router-dom'
import Image1 from "../../assets/img/download-google-play.png"
import Image2 from "../../assets/img/download-app-store.png"
import Image3 from "../../assets/img/phone_mockup.png"

function Download() {
    return (
        <>
            <div id="download_app">                  
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="headinghome">
                                <h3>Try our app</h3>
                                <h2 style={{fontSize:"18px"}}>Download our app from google play store and get a smooth booking experience</h2>
                                <p>Discover the epitome of convenience with our Massage On Demand app! Elevate your booking experience by downloading our app directly from the Google Play Store. Unleash the power of instant bookings, personalized preferences, and a world of relaxation—all just a few taps away. Join us on this journey and redefine the way you indulge in wellness. Your tranquility, your way!</p>
                                <Link to="https://play.google.com/store/apps" target="_blank"><img id='downloadimage' style={{ maxWidth: "180px" }} src={Image1} alt="" /></Link>
                                <Link to="https://play.google.com/store/apps" target="_blank"><img  id='downloadimage' style={{ maxWidth: "161px" }} src={Image2} alt="" /></Link>
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className="gutter" >
                                <img className="img-responsive" src={Image3} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Download