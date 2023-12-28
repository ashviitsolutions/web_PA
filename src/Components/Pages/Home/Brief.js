import React from 'react'
import video from "../../assets/video/videoplayback.mp4"
import Image1 from "../../assets/img/warrior.svg"
import Image2 from "../../assets/img/lotus.svg"
import Image3 from "../../assets/img/meditation_.svg"
import memberhsip from "../../assets/img/memberhsip_image.png"
import memberhsips from "../../assets/img/membershipcards.png"
import Membership from './Membership'
function Brief() {
    return (
        <>
            <div id="brief">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-offset-1 col-sm-10">
                            <div className="container-fluid" id='videofile'>
                                <div className='row'>
                                    <div className="col-sm-6" >
                                        <div className="content heading">
                                            <h3>Become <span>a member</span>.</h3>
                                            <h5 >Come along for the ride and join our members club</h5>
                                        </div>
                                        <div className="content">
                                            <p id='videofiletext'>Join Productive Alliance membership today and get exclusive perks, discounts and benefits
                                            </p>
                                            <button className="button primary" type="button">register now</button>
                                        </div>
                                    </div>
                                    <div className="col-sm-5" id='video_section'>
                                        <div className="content">
                                            <div className="video_wrapper">
                                                <img src={memberhsip} alt='' width={400} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>




                  
















                    <div className="row">
                        <div className="content">
                            <div className="light">
                            </div>
                        </div>
                        <div className="row">
                            <div className="heading content" id='AdvantageBrief'>
                                <h3 className="dancing" >advantages</h3>
                                <p className='textbrief'>Discover the Advantages of Our Massage Services</p>
                                <span className="eff"></span>
                            </div>
                            <div className="content infobox">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="item_wrapper">
                                                <div className="item">
                                                    <div className="icon">
                                                        <span style={{ backgroundImage: `url(${Image1})` }} ></span>
                                                    </div>
                                                    <div className="text">
                                                        <h3>flexibility</h3>
                                                        <p>Unleash the Benefits of Flexibility: Customized Massages to Enhance Your Range of Motion</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="item_wrapper">
                                                <div className="item">
                                                    <div className="icon">
                                                        <span style={{ backgroundImage: `url(${Image2})` }} ></span>
                                                    </div>
                                                    <div className="text">
                                                        <h3>immunity</h3>
                                                        <p>It protects your body from harmful substances, germs and cell changes that could make you ill</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="item_wrapper">
                                                <div className="item">
                                                    <div className="icon">
                                                        <span style={{ backgroundImage: `url(${Image3})` }} ></span>
                                                    </div>
                                                    <div className="text">
                                                        <h3>positivity</h3>
                                                        <p>Massage therapists treat clients by applying pressure to manipulate the body's soft tissues and joints</p>
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
            </div>
            <Membership />
        </>
    )
}

export default Brief