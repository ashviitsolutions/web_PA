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
                                <h2 style={{ fontSize: "18px" }}>Download Productive Alliance App on Google Play or Apple App Store</h2>
                                <p>Book your desired on demand service using our app in less than 5 minutes . Your provider can be at your door as quick as within an hour!
                                </p>
                                <Link to="https://play.google.com/store/apps" target="_blank"><img id='downloadimage' style={{ maxWidth: "180px" }} src={Image1} alt="" /></Link>
                                <Link to="https://play.google.com/store/apps" target="_blank"><img id='downloadimage' style={{ maxWidth: "161px" }} src={Image2} alt="" /></Link>
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