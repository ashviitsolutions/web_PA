import React from "react";
import { Link } from "react-router-dom";
import Image1 from "../../assets/img/body-massage.png";
import Image2 from "../../assets/img/piggy-bank.png";
import Image3 from "../../assets/img/price-tag.png";
import Image4 from "../../assets/img/online-support.png";
import Image5 from "../../assets/img/warrior.svg";
import Image6 from "../../assets/img/lotus.svg";
import Image7 from "../../assets/img/meditation_.svg";
import Image8 from "../../assets/img/meditation_.svg";
import Membership from "../Home/Brief";
function Benifit() {
	return (
		<>
			<Membership />
			<div id="membership_benifits" className="">
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							<div className="content">
								<ul className="float_wrapper">
									<li className="">
										<span
											className="icon"
											style={{ backgroundImage: `url(${Image1})` }}
										></span>
										<span className="title">Provider's Location</span>
										<span className="text">
											get access to professional locations for better
											experience.
										</span>
									</li>
									<li className="">
										<span
											className="icon"
											style={{ backgroundImage: `url(${Image2})` }}
										></span>
										<span className="title">Savings</span>
										<span className="text">
											enjoy less rates on 30+ services
										</span>
									</li>
									<li className="">
										<span
											className="icon"
											style={{ backgroundImage: `url(${Image3})` }}
										></span>
										<span className="title">Exclusive Offers</span>
										<span className="text">unlock member only coupons</span>
									</li>
									<li className="">
										<span
											className="icon"
											style={{ backgroundImage: `url(${Image4})` }}
										></span>
										<span className="title">Priority Support</span>
										<span className="text">24/7 support for members only.</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div id="brief" className="members">
				<div className="container">
					<div className="row">
						<div className="heading content">
							<h3 className="dancing">Membership benifits</h3>
						</div>
						<div className="content infobox">
							<div className="container-fluid">
								<div className="row">
									<div className="col-sm-6">
										<div className="item_wrapper">
											<div className="item">
												<div className="icon">
													<span
														style={{ backgroundImage: `url(${Image5})` }}
													></span>
												</div>
												<div className="text">
													<h3>fast earning</h3>
													<p>Get upto 14% off on every Service.</p>
												</div>
											</div>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="item_wrapper">
											<div className="item">
												<div className="icon">
													<span
														style={{ backgroundImage: `url(${Image6})` }}
													></span>
												</div>
												<div className="text">
													<h3>work flexibility</h3>
													<p>One 60 Min Massages Every Month</p>
												</div>
											</div>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="item_wrapper">
											<div className="item">
												<div className="icon">
													<span
														style={{ backgroundImage: `url(${Image7})` }}
													></span>
												</div>
												<div className="text">
													<h3>safety first</h3>
													<p>Preferred Rates on All Bookings</p>
												</div>
											</div>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="item_wrapper">
											<div className="item">
												<div className="icon">
													<span
														style={{ backgroundImage: `url(${Image8})` }}
													></span>
												</div>
												<div className="text">
													<h3>grow your business</h3>
													<p>
														Unlock exclusive benefits, access premium content,
														and enjoy personalized perks with our membership
														plan. Elevate your experience and grow together!
													</p>
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

			<div className="faqbutton">
				<Link to="/book">
					<button className="button">get started</button>
				</Link>
			</div>
		</>
	);
}

export default Benifit;
