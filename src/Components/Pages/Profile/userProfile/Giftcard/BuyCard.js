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
	const [images, setImageObjectURL] = useState([]);
	const [clientSecret, setClientSecret] = useState(null);
	const [offerId, setOfferId] = useState();
	const [oferValue, setOfferValue] = useState();

	const closeModal = () => {
		setClientSecret(null);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${IP}/coupon/fetch`);
				const data = await res.json();
				const giftCards = data.filter((d) => d.type === "gift_card");
				setUser(giftCards);
				// setUser(data);
				// setOfferValue(data.offerValue)
				// setGiftCardId(data._id)
				console.log("gift data data card", giftCards);
			} catch (error) {
				// Handle errors
			}
		};

		fetchData();
	}, []);

	// useEffect(() => {
	// 	const fetchImages = async () => {
	// 		const imagePromises = user.map((card) => {
	// 			return fetch(`${IP}/file/${card.attachments}`)
	// 				.then((res) => res.blob())
	// 				.then((imageBlob) => URL.createObjectURL(imageBlob))
	// 				.catch((error) => {
	// 					console.error("Error loading image:", error);
	// 					return null; // Return null for images that couldn't be loaded
	// 				});
	// 		});

	// 		Promise.all(imagePromises).then((imageUrls) => {
	// 			setImageObjectURL(imageUrls);
	// 		});
	// 	};

	// 	fetchImages();
	// }, [user]);

	const handleSubmit = async (offerValue, giftCardId) => {
		setOfferId(giftCardId);
		try {
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
				setOfferValue(res.data.offerValue);
			} else {
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
				{user.map((card, index) => (
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
									<p
										className="description"
										// dangerouslySetInnerHTML={{
										// 	__html: card.description && card.description.slice(0, 60),
										// }}
									>
										{card.description.slice(0, 60)}...
									</p>
								</div>
								<div className="content_container_gift_card_para">
									<p>Price: ${card.price}</p>
									{/* <p>Value: ${card.offerValue}</p> */}
									<button
										id="Buy_gift_card"
										onClick={() => handleSubmit(card.offerValue, card._id)}
									>
										Buy Now
									</button>
								</div>
							</div>
							{clientSecret && (
								<StripeCheckout
									amount={card.offerValue * 100}
									clientSecret
									token={onSubmit}
									currency="USD"
									stripeKey="pk_test_51MXmewLnVrUYOeK2PN2SexCsPAi8lsw8dIt7Pw04DUCsoCsv7a0VReRlGhbUuDOKYqbp1PEDWRWklwSvEsUD0NZ400sa7PXdfg"
								>
									<div style={{ textAlign: "center" }}>
										{/* Modal for sending gift card */}

										<div className="modal_send_gift_card">
											<div className="modal-content">
												<span className="close" onClick={closeModal}>
													&times;
												</span>
												<h2>{card.title}</h2>
												<p
													className="description"
													dangerouslySetInnerHTML={{
														__html:
															card.description && card.description.slice(0, 60),
													}}
												/>
												<button className="button">
													Proceed to Pay {card.offerValue}
												</button>
											</div>
										</div>
									</div>
								</StripeCheckout>
							)}
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default BuyCard;
