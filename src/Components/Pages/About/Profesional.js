import React from "react";
import { Link } from "react-router-dom";
import Image1 from "../../assets/img/meditate.svg";
import Image2 from "../../assets/img/meditation.svg";
import Image3 from "../../assets/img/sahasrara.svg";
function Profesional() {
	return (
		<>
			<div id="about">
				<div className="container">
					<div className="row">
						<div className="col-sm-4">
							<div className="item">
								<div className="content">
									<div
										className="icon"
										style={{
											backgroundImage: `url(${Image1})`,
											borderRadius: "7px",
										}}
									></div>
									<h3>Vetted service providers</h3>
									<p>
										We screen and run background checks on all of our service
										providers. We regularly verify to make sure our providers
										are licensed, insured, and fully equipped to service our
										clients' needs.
									</p>
									{/* <Link className="anchors" to="#">read more</Link> */}
								</div>
							</div>
						</div>
						<div className="col-sm-4">
							<div className="item">
								<div className="content">
									<div
										className="icon"
										style={{
											backgroundImage: `url(${Image2})`,
											borderRadius: "7px",
										}}
									></div>
									<h3>Quick and Easy</h3>
									<p>
										Customized bookings are serviced by our professionals at the
										convenience of your home, private as well as corporate
										settings. Providers can service you as fast as within an
										hour of booking an on-demand service.
									</p>
									{/* <Link className="anchors" to="#">Read more</Link> */}
								</div>
							</div>
						</div>
						<div className="col-sm-4">
							<div className="item">
								<div className="content">
									<div
										className="icon"
										style={{
											backgroundImage: `url(${Image3})`,
											borderRadius: "7px",
										}}
									></div>
									<h3>Safety and cleanliness</h3>
									<p>
										Making sure that our clients are safe, equipment and
										proffecionals are clean, is our top priority. We value and
										rely on your feedback, so please write to us and give
										us your feedback.
									</p>
									{/* <Link className="anchors" to="#">Read more</Link> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Profesional;
