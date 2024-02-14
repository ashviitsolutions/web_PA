import React, { useState, useEffect } from "react";
import "./GiftCard.css";
import { IP } from "../../../../../Constant";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

function BuyCard() {
	const user_id = localStorage.getItem("userid");
	const nav = useNavigate();
	const [user, setUser] = useState([]);
	const [clientSecret, setClientSecret] = useState(null);
	const [offerId, setOfferId] = useState(null);
	const [prices, setPrices] = useState(null);
	const [ID, setID] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${IP}/coupon/fetch`);
				const data = await res.json();
				const filteredGiftCards = data.filter((d) => d.type === "gift_card");
				setUser(filteredGiftCards);
			} catch (error) {
				console.error("Error fetching gift cards:", error);
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
			} catch (error) {
				console.error("Error fetching user gift cards:", error);
			}
		};
		fetchData();
	}, [user]);

	const closeModal = () => {
		setClientSecret(null);
	};

	const handleSubmit = async (priceValue, giftCardId) => {
		setLoading(true);
		setOfferId(giftCardId);
		setPrices(priceValue);
		console.log("client secrate", priceValue)
		try {
			if (!priceValue || !giftCardId) {
				console.error("Offer value or gift card ID is missing.");
				return;
			}
			const formData = {
				amount: priceValue,
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
			if (res.status === 200) {
				setClientSecret(res.data.client_secret);
				setLoading(false);
			} else {
				console.error("Failed to fetch client secret from server.");
			}
		} catch (error) {
			console.error("Error processing payment request:", error);
		}
	};




	const onSubmit = async (stripeToken) => {

		console.log("token payment", stripeToken)
		try {
			const paymentId = stripeToken.id;
			const authToken = localStorage.getItem("token");
			const paymentData = {
				paymentId: paymentId,
				userId: user_id,
				offerId: offerId,
				price: prices,
				status: "paid",
			};
			console.log("Payment data:", paymentData); // Log payment data to check its format
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: authToken,
				},
			};
			const response = await axios.post(`${IP}/payment/add-giftcard-payment`, paymentData, config);
			console.log("Response from server:", response); // Log server response
			if (response.status === 200) {
				nav(`/userProfile/payment/success/${paymentId}`);
			}
			console.log("Payment successful:", response.data);
		} catch (error) {
			console.error("Error processing payment:", error);
			nav(`/userProfile/payment/success/${`failed`}`);
		}
	};


	return (
		<>
			<div id="gift_card_container_main">
				{user.map((card, index) => {
					const IDOfferId = ID.map(item => item.offerId._id);
					const shouldRenderCard = !IDOfferId.includes(card._id);
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
											<p className="description">{card.description.slice(0, 60)}...</p>
										</div>
										<div className="content_container_gift_card_para">
											<div className="d-block">
												<p>Price: ${card.price}</p>
												<p>Offer Value: ${card.offerValue}</p>
											</div>
											<StripeCheckout
												amount={card.price * 100}
												clientSecret={clientSecret}
												token={onSubmit}
												currency="USD"
												stripeKey="your_stripe_publishable_key"
												key={card._id}
											>
												<button
													id="Buy_gift_card"
													onClick={() => handleSubmit(card.price, card._id)}

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
						return null;
					}
				})}
			</div>
		</>
	);
}

export default BuyCard;
