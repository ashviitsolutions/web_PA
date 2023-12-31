import React from 'react'
import { Link } from 'react-router-dom'
import image1 from "../../assets/img/social_icons/facebook.png"
import image2 from "../../assets/img/social_icons/twitter.png"
import image3 from "../../assets/img/social_icons/youtube.png"
import image4 from "../../assets/img/social_icons/instagram.png"

import image5 from "../../assets/img/map.png"
import image6 from "../../assets/img/phone.png"

import twiter from "../../assets/img/x_twiter_logo.png"
import tiktok from "../../assets/img/icons8-tiktok-188.png"
import image7 from "../../assets/img/mail.png"
import image8 from "../../assets/img/download-google-play.png"
import image9 from "../../assets/img/download-app-store.png"

function Footer() {
    return (
        <>
            <div id="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="brand">
                                <h3>Productive <span>Alliance</span></h3>
                            </div>
                            <div className="intro" style={{ Width: "100%" }}>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras diam massa, placerat at elit in, ornare venenatis purus. Curabitur consequat elementum diam, nec molestie ex ornare ut.
                                </p>

                            </div>
                            <div className="brand">
                                <h3><span>Follow Us</span></h3>
                            </div>
                            <div className="social">
                                <div className="icon">
                                    <img src={image1} alt="" />
                                </div>
                                <div className="icon">
                                    <img style={{ Width: "100%", color: "#fff" }} src={twiter} alt="" />
                                </div>
                                <div className="icon">
                                    <img style={{ Width: "100%" }} src={tiktok} alt="" />
                                </div>
                                <div className="icon">
                                    <img style={{ Width: "90%" }} src={image4} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="head">
                                <h3>quick <span>links</span></h3>
                            </div>
                            <div className="nav">
                                <ul>
                                    <li><Link to="/">home</Link></li>
                                    {/*<li><Link to="/privacypolicy">Privacy Policy</Link></li>
    <li><Link to="/termcondition">Term & Condition</Link></li> */}
                                    <li><Link to="/giftcard">gift card</Link></li>
                                    <li><Link to="/become_member">membership</Link></li>
                                    <li><Link to="/about">about us</Link></li>
                                    <li><Link to="/contact">contact us</Link></li>
                                    <li><Link to="/login">login</Link></li>
                                    <li><Link to="/become_provider">become provider</Link></li>
                                    <li><Link to="/">blog</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="head">
                                <h3>Keep <span>in touch</span></h3>
                            </div>
                            <div className="infobox">
                                <div className="icon">
                                    <img src={image5} alt="" />
                                </div>
                                <div className="text">
                                    <p>
                                        Lorem ipsum dolor sit amet. consectetur adipiscing elit.
                                    </p>
                                </div>
                            </div>
                            <div className="infobox">
                                <div className="icon">
                                    <img src={image6} alt="" />
                                </div>
                                <div className="text">
                                    <p>
                                        732-567-0553
                                    </p>
                                </div>
                            </div>
                            <div className="infobox">
                                <div className="icon">
                                    <img src={image7} alt="" />
                                </div>
                                <div className="text">
                                    <p>
                                        info@productivealliance.com
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="head">
                                <h3>Get <span>a callback</span></h3>
                            </div>
                            <div className="form">
                                <form style={{ position: "relative" }} >
                                    <input className="input" type="text" placeholder="contact number..." />
                                    <input className="button" type="submit" />
                                </form>
                                <div className="intro">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </p>
                                </div>
                                <div className="app_buttons">
                                    <Link to="https://play.google.com/store/apps" target="_blank"><img style={{ maxWidth: "180px" }} src={image8} alt="" /></Link>
                                    <Link to="https://play.google.com/store/apps" target="_blank"><img style={{ maxWidth: "161px" }} src={image9} alt="" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="footer_strip">
                <div className="container">
                    <div className="row">
                        <div className="copyright pull-left">
                            <h3>Copyright © 2021 productive alliance, All Rights Reserved.</h3>
                        </div>
                        <div className="copyright pull-right">
                            <h3>A design by <Link target="_blank" to="/privacypolicy"><b>Ashvi IT solutions</b></Link></h3>
                            <span style={{ color: "#ffff" }}><Link to="/privacypolicy" style={{ color: "#ffff" }}>Privacy Policy</Link></span>
                            <span style={{ color: "#ffff" }}> <Link to="/termcondition" style={{ color: "#ffff" }}>Term & Condition</Link></span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer