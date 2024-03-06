import React, { useState, useEffect } from "react";
import "./Profile.css";
import Yourcard from "./Giftcard/Yourcard";
import BuyCard from "./Giftcard/BuyCard";
import Avatar from "./Avatar";
function Gift() {
	const username = localStorage.getItem("user_name");

	return (
		<>
			<div id="user_profile_page">
				<div id="gift">
					<div className="overview_container">
						{/* <div className='heading'>
	<h3>{username}</h3>
  </div> */}
						{/* <Avatar name={username} /> */}
						<p>{" "}</p>
						<div className="title">
							<h3>Your GIFT CARDS</h3>
						</div>

						<Yourcard />

						<div className="title" id="buycard">
							<h3>Gift Card Shop</h3>
						</div>
						<BuyCard />
					</div>
				</div>
			</div>

		</>
	);
}

export default Gift;
