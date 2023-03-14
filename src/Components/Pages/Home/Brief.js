import React from 'react'
import video from "../../assets/video/videoplayback.mp4"
import Image1 from "../../assets/img/warrior.svg"
import Image2 from "../../assets/img/lotus.svg"
import Image3 from "../../assets/img/meditation_.svg"
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
                                        <h5 >Consult now to know how you can improve your lifestyle.</h5>
                                    </div>
                                    <div className="content">
                                        <p id='videofiletext'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                                        <button className="button primary" type="button">register now</button>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="content">
                                        <div className="video_wrapper">
                                            <video id="myVideos" src={video}  autoPlay muted loop  controls={true}/>
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
                            <div className="heading content" style={{marginTop:"10vh" , paddingLeft:"13px"}}>
                                <h3 className="dancing">advantages</h3>
                                <p>Lorem ipsum dolor sit amet</p>
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
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod...</p>
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
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod...</p>
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
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod...</p>
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

            </>
            )
}

            export default Brief