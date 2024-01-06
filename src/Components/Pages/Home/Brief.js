import React from "react";
import video from "../../assets/video/videoplayback.mp4";
import Image1 from "../../assets/img/warrior.svg";
import Image2 from "../../assets/img/lotus.svg";
import Image3 from "../../assets/img/meditation_.svg";
import memberhsip from "../../assets/img/membership_plan_1.png";
import memberhsips from "../../assets/img/membershipcards.png";
import Membership from "./Membership";
import { useNavigate } from "react-router-dom";
function Brief() {
	const navigate = useNavigate();
	return (
		<>
			<div id="brief">
				<div className="container">
					<div className="Home_page_memberhsip_container memberhsip_section">
						<div className="Home_page_memberhsip">
							<div className="content">
								<img src={memberhsip} alt="" width={450} height={300} />
							</div>
						</div>

						<div className="Home_page_memberhsip">
							<div className="content heading">
								<h3>
									Become <span>a member</span>.
								</h3>
								<h5>Come along for the ride and join our members club</h5>
							</div>
							<div className="content">
								<p id="">
									Join Productive Alliance membership today and get exclusive
									perks, discounts and benefits
								</p>
								<ul>
									<li>Get up to 14% off on all available services</li>
									<li>Monthly 60-minute massage commitment at members rate</li>
									<li>Unlimited massages on all services at members rates.</li>
								</ul>
								<button
									className="button primary"
									type="button"
									onClick={() => navigate("/become_member")}
								>
									Join Now
								</button>
							</div>
						</div>
					</div>

					{/*  <div className="row">
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
    </div>  */}
				</div>
			</div>
		</>
	);
}

export default Brief;
