import React, { useState, useEffect } from "react";
import "./GiftCard.css";
import { IP } from "../../../../../Constant";
import axios from "axios";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import StripeCheckout from "react-stripe-checkout";
import { useParams, useNavigate } from "react-router-dom";

function BuyCard() {
	const user_id = localStorage.getItem("userid");
	const nav = useNavigate();
	const [user, setUser] = useState([]);
	const [clientSecret, setClientSecret] = useState(null);
	const [offerId, setOfferId] = useState();
	const [oferValue, setOfferValue] = useState();
	const [ID, setID] = useState([])
	const [loading, setLoading] = useState(false);

	console.log("ID", ID)

	const closeModal = () => {
		setClientSecret(null);
	};



	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${IP}/coupon/fetch`);
				const data = await res.json();
				const filteredGiftCards = data.filter((d) => d.type === "gift_card");

				setUser(filteredGiftCards);

				// console.log("gift data dxfhdsfhsdhdhdhdsh card", filteredGiftCards);
			} catch (error) {
				// Handle errors
			}
		};

		fetchData();
	}, []);



	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = localStorage.getItem("token");
				const config = {
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				};

				const res = await fetch(`${IP}/user/my-giftCards`, config);
				const data = await res.json();

				setID(data?.data);

				// console.log("user/my-giftCards", data);
			} catch (error) {
				// Handle errors
			}
		};

		fetchData();
	}, [user]);








	console.log("gift user card", user);











	const handleSubmit = async (offerValue, giftCardId) => {
		setLoading(true);
		setOfferId(giftCardId);
		setOfferValue(offerValue)

		console.log("offer valye", offerValue)
		try {
			if (!offerValue || !giftCardId) {
				console.error("Offer value or gift card ID is missing.");
				return;
			}

			const formData = {
				amount: offerValue,
				giftCardId: giftCardId,
			};

			const token = localStorage.getItem("token");
			const url = `${IP}/payment/giftcard-payment-request`;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			};

			const res = await axios.post(url, formData, config);

			console.log("api details redux", res);

			if (res.status === 200) {
				setClientSecret(res.data.client_secret);
				setLoading(false);
			} else {
				console.error("Failed to fetch client secret from server.");
			}

			console.log("Response:", res);
		} catch (error) {
			console.error(error);
		}
	};





	const onSubmit = async (stripeToken) => {
		console.log("response payment", stripeToken);
		try {
			// Extract payment_id from the token object provided by Stripe
			const paymentId = stripeToken.id;
			console.log("token", paymentId);

			const authToken = localStorage.getItem("token");

			// Send the payment information to your server
			const paymentData = {
				paymentId: paymentId,
				userId: user_id,
				offerId: offerId,
				price: oferValue,
				status: "paid",
			};

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: authToken,
				},
			};

			const response = await axios.post(
				`${IP}/payment/add-giftcard-payment`,
				paymentData,
				config
			);

			console.log("response", response);
			if (response.status === 200) {
				nav(`/userProfile/payment/success/${paymentId}`);
			}

			console.log("Payment successful:", response.data);
		} catch (error) {
			console.error("Error processing payment:", error);
			// nav(`/userProfile/payment/failed`);
			nav(`/userProfile/payment/success/${`failed`}`);
		}
	};

	return (
		<>
			<div id="gift_card_container_main">
				{user.map((card, index) => {
					// Extracting the _id from the offerId object in the ID data
					const IDOfferId = ID.map(item => item.offerId._id);

					// Check if the current card's _id matches any IDOfferId
					const shouldRenderCard = !IDOfferId.includes(card._id);

					// Render the card only if it doesn't match any ID.offerId
					if (shouldRenderCard) {
						return (
							<div className="Gift_card_container_buy" key={index}>
								<div className="gift_card_buy_item">
									<div className="image_container_gift_card">
										<img
											src={`${IP}/file/${card.attachments}`}
											alt="..."
											width={100}
											height={150}
										/>
									</div>
									<div className="content_container_gift_card">
										<h3>{card.title}</h3>
										<div className="content_container_gift_card_dis">
											<p className="description">
												{card.description.slice(0, 60)}...
											</p>
										</div>
										<div className="content_container_gift_card_para">
											<p>Price: ${card.price}</p>

											<StripeCheckout
												amount={card.price * 100}
												clientSecret
												token={onSubmit}
												currency="USD"
												stripeKey="pk_test_51MXmewLnVrUYOeK2PN2SexCsPAi8lsw8dIt7Pw04DUCsoCsv7a0VReRlGhbUuDOKYqbp1PEDWRWklwSvEsUD0NZ400sa7PXdfg"
												key={card._id}
											>
												<button
													id="Buy_gift_card"
													onClick={() => handleSubmit(card.price, card._id)}
													disabled={loading && card._id === offerId} // Disable button if loading and card id matches offerId
												>
													{loading && card._id === offerId ? "Waiting" : "Buy Now"}
												</button>
											</StripeCheckout>

										</div>
									</div>

								</div>
							</div>
						);
					} else {
						// Return null if the card matches any ID.offerId to exclude it from rendering
						return null;
					}
				})}
			</div>


		</>
	);
}

export default BuyCard;
