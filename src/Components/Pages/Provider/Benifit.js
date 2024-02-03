import React from 'react'
// import "./style.css"
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
import Process1 from "../../assets/img/process1.png"
import Process2 from "../../assets/img/process2.png"
import Process3 from "../../assets/img/process3.png"
import Process4 from "../../assets/img/process4.png"
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
                                                    <h3>Maximize your earning potential</h3>
                                                    <p>Experience unparalleled earning potential with our commitment to generous compensation. Our pay rates soar 100% above the national average per hour, ensuring that your efforts are handsomely recognized.</p>
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
                                                    <h3>Tailored to Your Lifestyle</h3>
                                                    <p>Whether you're opting for part-time independence, full-time commitment, or a side hustle, we provide flexible opportunities that suit your schedule seamlessly.</p>
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
                                                    <h3>Freedom to Choose</h3>
                                                    <p>We respect the significance of your time at Productive Alliance. Providers bear no obligation; the power is in your hands. Seamlessly respond to opportunities by clicking "Accept" or "Deny" in your personalized provider portal.</p>
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
                                                    <h3>Enhanced Rewards System</h3>
                                                    <p>At Productive Alliance, we take pride in delivering quality and convenience to our clients. As a token of appreciation, our clients automatically include gratuity, boosting our providers' earnings beyond their salary.</p>
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


            {/* <div id="application_process">
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
            </div> */}
            <div className='container-fluid provider-process'>
                <div className='container process'>
                    <div className='row'>
                    <div className='col-sm-3 processImg'>
                            <img src={Process1} />
                        </div>
                        <div className='col-sm-3 processImg'>
                            <img src={Process2} />
                        </div>
                        <div className='col-sm-3 processImg'>
                            <img src={Process3} />
                        </div>
                        <div className='col-sm-3 processImg'>
                            <img src={Process4} />
                        </div>
                    </div>
                </div>
            </div>






            <div id="services_tab">
                <div className="container-brief">
                    <div className="selects">
                        <div className='item'>
                            <img className="icons" src={Image9} alt='...' />
                            <p id='becommembersyogatexts'>Yoga</p>
                        </div>

                    </div>

                    <div className="selects">
                        <div className='item'>
                            <img className="icons" src={Image10} alt='...' />
                            <p id='becommembersyogatexts2'>Massage</p>
                        </div>

                    </div>

                    <div className="selects">
                        <div className='item'>
                            <img className="icons" src={Image11} alt='...' />
                            <p id='becommembersyogatexts2' style={{ marginLeft: "-10px" }}>reflexology</p>
                        </div>

                    </div>
                    <div className="selects">
                        <div className='item'>
                            <img className="icons" src={Image12} alt='...' />
                            <p id='becommembersyogatexts3'>Nutritionist</p>
                        </div>

                    </div>

                    <div className="selects">
                        <div className='item'>
                            <img className="icons" src={Image13} alt='...' />
                            <p id='becommembersyogatexts4'>Medical Screening</p>
                        </div>

                    </div>





                </div>
            </div >
        </>
    )
}

export default Benifit