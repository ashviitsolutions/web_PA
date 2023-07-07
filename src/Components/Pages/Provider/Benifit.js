import React from 'react'
import Image1 from "../../assets/img/warrior.svg"
import Image2 from "../../assets/img/lotus.svg"
import Image3 from "../../assets/img/meditation_.svg"
import Image4 from "../../assets/img/meditation_.svg"

import Image5 from "../../assets/img/paper.png"
import Image6 from "../../assets/img/interview.png"
import Image7 from "../../assets/img/background-check.png"
import Image8 from "../../assets/img/sign.png"

import Image9 from "../../assets/img/exercise.png"
import Image10 from "../../assets/img/massage.png"
import Image11 from "../../assets/img/reflexology.png"
import Image12 from "../../assets/img/diet.png"
import Image13 from "../../assets/img/screening.png"
function Benifit() {
    return (
        <>
            <div id="brief" className="members">
                <div className="container">
                    <div className="row">
                        <div className="heading content">
                            <h3 className="dancing">provider benifits</h3>
                        </div>
                        <div className="content infobox">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="item_wrapper">
                                            <div className="item">
                                                <div className="icon">
                                                    <span style={{ backgroundImage: `url(${Image1})` }}></span>
                                                </div>
                                                <div className="text">
                                                    <h3>fast earning</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="item_wrapper">
                                            <div className="item">
                                                <div className="icon">
                                                    <span style={{ backgroundImage: `url(${Image2})` }}></span>
                                                </div>
                                                <div className="text">
                                                    <h3>work flexibility</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="item_wrapper">
                                            <div className="item">
                                                <div className="icon">
                                                    <span style={{ backgroundImage: `url(${Image3})` }} ></span>
                                                </div>
                                                <div className="text">
                                                    <h3>safety first</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="item_wrapper">
                                            <div className="item">
                                                <div className="icon">
                                                    <span style={{ backgroundImage: `url(${Image4})` }}></span>
                                                </div>
                                                <div className="text">
                                                    <h3>grow your business</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div id="application_process">
            <ul>
              <li>
                <span className="count">01</span>
                <span className="content"><span style={{ backgroundImage: `url(${Image5})` }} className="icon"></span>fill out the form</span>
              </li>
              <li>
                <span className="count">02</span>
                <span className="content"><span style={{ backgroundImage: `url(${Image6})` }} className="icon"></span>phone interview</span>
              </li>
              <li>
                <span className="count">03</span>
                <span className="content"><span style={{ backgroundImage: `url(${Image7})` }} className="icon"></span>background check</span>
              </li>
              <li>
                <span className="count">04</span>
                <span className="content"><span style={{ backgroundImage: `url(${Image8})` }} className="icon"></span>sign the contract</span>
              </li>
            </ul>
          </div>







            <div id="services_tabs">
                <div class="container">
                    <div class="row">
                        <ul>
                            <li class="select">
                                <span class="icon" style={{ backgroundImage: `url(${Image9})` }}></span>
                               <span id='becommembersyogatext'>yoga</span> 
                            </li>
                            <li>
                                <span class="icon" style={{ backgroundImage: `url(${Image10})` }}></span>
                                <span id='becommembersyogatext2'>massage</span> 
                            </li>
                            <li>
                                <span class="icon" style={{ backgroundImage: `url(${Image11})` }}></span>
                                
                                <span id='becommembersyogatext2'>reflexology</span> 
                            </li>
                            <li>
                                <span class="icon" style={{ backgroundImage: `url(${Image12})` }}></span>
                                
                                <span id='becommembersyogatext3'>neutritionist</span> 
                            </li>
                            <li><span class="icon" style={{ backgroundImage: `url(${Image13})` }}></span>
                               
                                <span id='becommembersyogatext4'> biometric screening</span> 
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Benifit