import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { IP } from "../../../../Constant";

import gold from "../../../assets/img/membership_gold2.png";
import Activegold from "../../../assets/img/active_gold2.png";
import Activesilver from "../../../assets/img/active_silver2.png";
import silver from "../../../assets/img/membeship_silver21.png";
import {
	faClock,
	faTags,
	faUniversalAccess,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "./Avatar";

function Membership() {
	const username = localStorage.getItem("user_name");

	const [status, setStatus] = useState()
	const [loading, setLoading] = useState(null);

	const membershipOptions = [
		{
			id: "price_1OAn62LnVrUYOeK2Y2M7l0Cj",
			name: "Silver",
			price: 119,
			savings: "5% saving off regular rate",
			commitment: "3 months commitment",
			GOLD: silver,
			active: Activesilver,
			title1: "Membership Flexibility",
			para1: "5% discount on every service. Quaterly Subscription.",
			title2: "One 60-minute massage each month.",
			para2:
				"You are billed for one massage a month at the member rate, no initiation fee. Credits roll over and never expire.",
			title3: "Preffered rate on all bookings",
			para3:
				"Book as many appointments as you like at the membership rate. Get a massage anywhere Productive Alliance is available.",
		},
		{
			id: "price_1OMYiBLnVrUYOeK2LPEbMEvW",
			name: "Gold",
			price: 119,
			savings: "10% saving off regular rate",
			commitment: "12 months commitment",
			GOLD: gold,
			active: Activegold,
			title1: "Membership Flexibility",
			para1: "Annual Membership. 10% discount on all member services. Prioritize and select your favorite therapist.",
			title2: "One 60-minute massage each month.",
			para2:
				"You are billed for one massage a month at the member rate, no initiation fee. Credits roll over and never expire.",
			title3: "Preffered rate on all bookings",
			para3:
				"Book as many appointments as you like at the membership rate. Get a massage anywhere Productive Alliance is available.",
		},
		// Add more membership options as needed
	];

	const [url, setUrl] = useState(null);
	const [showModal, setShowModal] = useState(
		Array(membershipOptions.length).fill(false)
	);
	const [selectedMembership, setSelectedMembership] = useState(null);
	const [membershipLevel, setMembershipLevel] = useState();
	const [membershipEndDate, setMembershipEndDate] = useState();

	const handleToggleModal = (index) => {

		setShowModal((prevShowModal) => {
			const newShowModal = [...prevShowModal];
			newShowModal[index] = !newShowModal[index];
			return newShowModal;
		});
		setSelectedMembership(membershipOptions[index]);
	};

	const closeModal = () => {
		setShowModal(Array(membershipOptions.length).fill(false));
		setSelectedMembership(null);
	};


	const handleSubmit = async (membership_id, index) => {
		setLoading(index);
		try {
			const user_id = localStorage.getItem("userid");
			const token = localStorage.getItem("token");
			const url = `${IP}/payment/create-checkout-session?membership=${membership_id}&userId=${user_id}`;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			};

			const res = await axios.get(url, config);
			console.log("Stripe Redirect URL:", res.config.url);
			setUrl(res.config.url);
			console.log("API Response:", res);

			if (res.config.url) {
				window.location.href = res.config.url;
			} else {
				console.error("Invalid response from the server:", res);
			}
		} catch (error) {
			console.error("API Error:", error);
		}
		finally {
			if (loading === index) {
				setLoading(null); // Reset loading state only if it matches the index
			}
		}
	};


	useEffect(() => {
		const getUserMembership = async () => {
			const token = localStorage.getItem("token");

			try {
				const response = await fetch(`${IP}/user/membership-details`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': token,
					},
				});

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const data = await response.json();

				console.log("membership", data);
				setMembershipLevel(data.membershipType);
				localStorage.setItem("membership", data.membershipType)
				setStatus(data.status)

				const daysToAdd = data.renewalDays;
				const result = new Date(data.lastRenewalPaymentDate);
				result.setDate(result.getDate() + daysToAdd);
				setMembershipEndDate(result);
			} catch (error) {
				console.error("Error:", error);
			}
		};

		getUserMembership();
	}, [membershipLevel]);




	console.log(membershipLevel, membershipEndDate);




	return (
		<div className="overview" id="invoices">
			<div className="overview_container">

				{/* <Avatar name={username} /> */}
				<div className="title">
					<h3>Membership Level</h3>
					<h3
						style={{ fontSize: 30 }}
						className={`${membershipLevel == "gold" ? "gold__text" : "silver__text"
							}`}
					>
						{membershipLevel}
					</h3>
					<p>Become a Member/Your Membership</p>
				</div>
				<div className="memberships">
					{membershipOptions.map((option, index) => (
						<div className="membership_containers" key={index}>

							<div className="image_membership">
								<img src={option.GOLD} alt="..." />

								{index == 1 && membershipLevel == "Gold" && (
									<div className="active_membership_icons">
										<img src={option.active} alt="..." />
									</div>
								)}

								{index == 0 && membershipLevel == "Silver" && (
									<div className="active_membership_icons">
										<img src={option.active} alt="..." />
									</div>
								)}
							</div>




							<div className="membership_buttons">
								{membershipLevel === "Gold" && index === 1 ? (
									<p>Valid till {moment(option.renewalDays).format("MMM Do YYYY")}</p>
								) : membershipLevel === "Silver" && index === 0 ? (
									<p>Valid till {moment(option.renewalDays).format("MMM Do YYYY")}</p>
								) : status !== "active" && (
									<button onClick={() => handleToggleModal(index)}>
										Join now
									</button>
								)}
							</div>

							{showModal[index] && (
								<div className="model_card_gift_container">
									<span className="close" onClick={closeModal}>
										&times;
									</span>
									<div className="model_card_gift">
										<h3>{option.name}</h3>
										<div className="membership_model_item">
											<FontAwesomeIcon
												icon={faUniversalAccess}
												color="#03a9f4"
												size="2xl"
											/>
											<div>
												<p>
													<strong>{option.title1}</strong>
												</p>
												<p>{option.para1}</p>
											</div>
										</div>
										<div className="membership_model_item">
											<FontAwesomeIcon
												icon={faClock}
												color="#03a9f4"
												size="2xl"
											/>
											<div>
												<p>
													<strong>{option.title2}</strong>
												</p>
												<p>{option.para2}</p>
											</div>
										</div>
										<div className="membership_model_item">
											<FontAwesomeIcon
												icon={faTags}
												color="#03a9f4"
												size="2xl"
											/>
											<div>
												<p>
													<strong>{option.title3}</strong>
												</p>
												<p>{option.para3}</p>
											</div>
										</div>
									</div>
									<div className="membership_update_button">
										<button
											className="button"
											onClick={() => handleSubmit(selectedMembership.id, index)}
										>
											{loading === index ? "Loading..." : "Join now"}
										</button>

									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Membership;
