import React, { useState } from "react";
import FirstForm from "./Overview";
import SecondForm from "./Booking";
import ThirdForm from "./Invoices";
import FourForm from "./Event";
import FifthForm from "./Gift";
import Conform from "./Setting";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import bookingimage from "../../../img/plus.png";
import Membership from "./Membership";

import "./Profile.css";
import image1 from "../../../assets/img/profile/dashboard.png";
import image2 from "../../../assets/img/profile/calendar.png";
import image3 from "../../../assets/img/profile/invoice.png";
import image4 from "../../../assets/img/profile/election-event-on-a-calendar-with-star-symbol.png";
import image5 from "../../../assets/img/profile/gift-card.png";

import image6 from "../../../assets/img/profile/settings.png";
import image7 from "../../../assets/img/profile/exit.png";
import menuimage from "../../../assets/img/close.png";
import menucross from "../../../assets/img/menu.png";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRightFromBracket,
	faBell,
	faBorderAll,
	faCalendarDays,
	faFileContract,
	faGift,
	faHeart,
	faIdBadge,
	faMoneyCheckDollar,
	faRectangleXmark,
	faSpa,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
	const [activeTab, setActiveTab] = useState(1);
	const [now, setNow] = useState(0);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const nextStep = () => {
		setNow((prevStep) => (prevStep < 100 ? prevStep + 100 / 7 : prevStep));
		setActiveTab(activeTab + 1);
	};

	const previousStep = () => {
		setNow((prevStep) => (prevStep > 0 ? prevStep - 100 / 7 : prevStep));
	};

	const nav = useNavigate();

	const handleLogout = () => {
		localStorage.clear();
		nav("/");
	};

	let form;
	switch (activeTab) {
		case 1:
			form = (
				<FirstForm step={now} nextStep={nextStep} previousStep={previousStep} />
			);
			break;
		case 2:
			form = (
				<SecondForm
					step={now}
					nextStep={nextStep}
					previousStep={previousStep}
				/>
			);
			break;
		case 3:
			form = (
				<ThirdForm step={now} nextStep={nextStep} previousStep={previousStep} />
			);
			break;
		case 4:
			form = (
				<Membership
					step={now}
					nextStep={nextStep}
					previousStep={previousStep}
				/>
			);
			break;
		case 5:
			form = (
				<FifthForm step={now} nextStep={nextStep} previousStep={previousStep} />
			);
			break;
		case 6:
			form = (
				<Conform step={now} nextStep={nextStep} previousStep={previousStep} />
			);
			break;
		case 7:
			form = (
				<Logout step={now} nextStep={nextStep} previousStep={previousStep} />
			);
			break;
		default:
			break;
	}

	const handleSidebarToggle = () => {
		setIsSidebarOpen((prevState) => !prevState);
	};
	// const toggleLinks = () => {
	//   setIsActive((prevState) => !prevState);
	// };
	const handleBook = () => {
		nav("/select_location");
	};

	return (
		<div className="parent">
			{/* <div className={`sidebar_tab ${isSidebarOpen ? "mobile-view" : ""}`}>
			 */}
			<div className={`sidebar_tab ${isSidebarOpen && "mobile-view"}`}>
				<div className="">
					<ul id="tabs_control">
						<li
							id="tab_1"
							className={activeTab === 1 && "active"}
							onClick={() => setActiveTab(1)}
						>
							<div className="item">
								{/* <img
								src={image1}
								width={15}
								height={15}
								alt="..."
								className={`${activeTab == 1 && "active__Img"}`}
							/> */}
								<FontAwesomeIcon
									icon={faBorderAll}
									style={{ marginRight: 10 }}
								/>
								Overview
							</div>
						</li>
						<li
							id="tab_2"
							className={activeTab === 2 ? "active" : ""}
							onClick={() => setActiveTab(2)}
						>
							<div className="item">
								{/* <img src={image2} width={15} height={15} alt="..." /> */}
								<FontAwesomeIcon
									icon={faCalendarDays}
									style={{ marginRight: 10 }}
								/>
								Bookings
							</div>
						</li>
						{/* <li id="tab_3" className={activeTab === 3 ? 'active' : ''} onClick={() => setActiveTab(3)}>
            <div className="item">
              <img src={image3} width={15} height={15} alt="..." />
              Invoices
            </div>
          </li> */}
						<li
							id="tab_4"
							className={activeTab === 4 ? "active" : ""}
							onClick={() => setActiveTab(4)}
						>
							<div className="item">
								{/* <img src={image4} width={15} height={15} alt="..." /> */}
								<FontAwesomeIcon
									icon={faMoneyCheckDollar}
									style={{ marginRight: 10 }}
								/>
								Membership
							</div>
						</li>
						<li
							id="tab_5"
							className={activeTab === 5 ? "active" : ""}
							onClick={() => setActiveTab(5)}
						>
							<div className="item">
								{/* <img src={image5} width={15} height={15} alt="..." /> */}
								<FontAwesomeIcon
									icon={faGift}
									size={15}
									style={{ marginRight: 10 }}
								/>
								Gift Card
							</div>
						</li>
						<li
							id="tab_6"
							className={activeTab === 6 ? "active" : ""}
							onClick={() => setActiveTab(6)}
						>
							<div className="item">
								{/* <img src={image6} width={15} height={15} alt="..." />
								 */}
								<FontAwesomeIcon icon={faIdBadge} style={{ marginRight: 10 }} />
								Profile
							</div>
						</li>
						<li id="" className={activeTab === 8 ? "active" : ""}>
							<div className="item">
								{/* <img src={image7} width={15} height={15} alt="..." /> */}
								<FontAwesomeIcon icon={faBell} style={{ marginRight: 10 }} />
								Notifications
							</div>
						</li>
						<li id="" className={activeTab === 9 ? "active" : ""}>
							<div className="item">
								{/* <img src={image7} width={15} height={15} alt="..." /> */}
								<FontAwesomeIcon icon={faHeart} style={{ marginRight: 10 }} />
								Favourites
							</div>
						</li>
						<li id="tab_7" className={activeTab === 7 ? "active" : ""}>
							<div className="item" onClick={handleLogout}>
								{/* <img src={image7} width={15} height={15} alt="..." /> */}
								<FontAwesomeIcon
									icon={faArrowRightFromBracket}
									style={{ marginRight: 10 }}
								/>
								Logout
							</div>
						</li>

						<div className="userbooking">
							<li id="tab_7">
								<div className="item" onClick={handleBook}>
									{/* <img src={image7} width={15} height={15} alt="..." /> */}
									<FontAwesomeIcon icon={faSpa} style={{ marginRight: 10 }} />
									Book now
								</div>
							</li>
						</div>
					</ul>
					<div id="navigationuser">
						<div className="toggle_buttons" onClick={handleSidebarToggle}>
							{isSidebarOpen ? (
								<img src={menuimage} alt="Close" className="toggleimages" />
							) : (
								<img src={menucross} alt="Menu" className="toggleimages" />
							)}
						</div>
					</div>
				</div>
				<div
					className="
        "
				>
					<ul id="tabs_control">
						<li id="" className={activeTab === 8 ? "active" : ""}>
							<div className="item" style={{ fontSize: 10 }}>
								{/* <img src={image7} width={15} height={15} alt="..." /> */}
								<FontAwesomeIcon
									icon={faFileContract}
									style={{ marginRight: 10 }}
								/>
								Terms and Conditions
							</div>
						</li>

						<li id="" className={activeTab === 9 ? "active" : ""}>
							<div className="item" style={{ fontSize: 10 }}>
								{/* <img src={image7} width={15} height={15} alt="..." /> */}
								<FontAwesomeIcon
									icon={faRectangleXmark}
									style={{ marginRight: 10 }}
								/>
								Cancellation Policy
							</div>
						</li>
					</ul>
				</div>
			</div>

			{/*Booking Image */}

			<div id="imagebooking">
				<img
					width={40}
					height={40}
					src={bookingimage}
					alt=""
					style={{
						borderRadius: "100%",
						display: "block",
						boxShadow: "4px 4px 4px 0px lightgray", // Correct syntax
					}}
					className="profileiconimage"
					onClick={() => nav("/guest_login")}
				/>
			</div>
			{/* Toggle button for mobile view */}

			<div className="progressbar_userpannel">
				{form}
				<div className="user_profile_footer">
					<div className="footer_container">
						<div className="footer_warapper">
							<p>Copyright © 2021 productive alliance, All Rights Reserved.</p>
						</div>
						<div className="footer_warapper">
							<p id="ashvi_design">A design by Ashvi IT solution</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
