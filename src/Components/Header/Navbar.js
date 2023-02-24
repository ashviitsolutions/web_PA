import React from 'react'
import {Link} from "react-router-dom"
import Images1 from "../assets/img/download-google-play.png"
import Images2 from "../assets/img/download-app-store.png"

function Navbar() {
    return (
        <div id="navigation">
            <div className="toggle_button">
            </div>                                
            <div className="container">
                <div className="row">
                    <div className="float_wrapper">
                        <Link to="/">
                            <div className="logo">
                                <span className="icon"></span>
                                <span className="name">Productive Alliance <small>experience the difference</small> </span>
                            </div>
                        </Link>
                        <ul className="nav_bar">
                            <li>
                                <Link to="/">home</Link>
                            </li>
                            <li id="service_drpdwn" className="drpdwn">
                                <span className="text">
                                    <Link to="/services">services</Link>
                                    <span className="ico" ></span>
                                </span>
                                <ul className="drpdwn_menu">
                                    <li>
                                        <Link to="/services/massage_on_demand">massage on demand</Link>
                                    </li>
                                    <li>
                                        <Link to="/services/corporate_events">corporate events</Link>
                                    </li>
                                    <li>
                                        <Link to="/services/private_events">private events</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/about">about us</Link>
                            </li>
                            <li>
                                <Link to="/giftcard">gift card</Link>
                            </li>
                            <li>
                                <Link to="/contact">contact us</Link>
                            </li>
                            <li>
                                <Link to="/become_member">membership</Link>
                            </li>
                            <li>
                                <Link to="/provider">become provider</Link>
                            </li>
                            <li className="withicon">
                                <span className="icon" ></span>
                                <Link to="/select_location">Book now</Link>
                            </li>
                            <li className="withicon">
                                <span className="icon" ></span>
                                <Link to="/login">login</Link>     
                            </li>
                            <div className="app_buttons">
                            <Link to="https://play.google.com/store/apps" target="_blank"><img style={{maxWidth:"180px"}} src={Images1} alt=""/></Link>
                            <Link to="https://play.google.com/store/apps" target="_blank"><img style={{maxWidth:"161px"}} src={Images2} alt=""/></Link>
                          </div>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar