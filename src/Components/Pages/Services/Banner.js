import React from 'react'
import Image1 from "../../assets/img/treatment-finger-keep-hand-161477.jpeg"


function Banner() {
    return (
        <>
            <div id="small_banner" style={{ backgroundImage: `url(${Image1})` }} >
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-6">
                            <div className="head" id="bannerservices">
                                <h1>Feel relax with our variety of services.</h1>
                                <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</h3>
                                <button className="button" type="button" >book now</button>
                                <button className="button negative" type="button">book for event</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          
        </>
    )
}

export default Banner