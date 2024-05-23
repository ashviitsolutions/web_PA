import React, { useState, useEffect } from "react";
import "./GiftCard.css";
import { IP } from "../../../../../Constant";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from "../../../Redux/counterSlice";

function BuyCard() {
	const user_id = localStorage.getItem("userid");
	const nav = useNavigate();
	// const [user, setUser] = useState([]);
	const [clientSecret, setClientSecret] = useState(null);
	const [offerId, setOfferId] = useState(null);
	const [prices, setPrices] = useState(null);
	const [ID, setID] = useState([]);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const formData = useSelector((state) => state?.counter?.formData);
	const user = formData.list_giftcard && formData.list_giftcard[0] ? formData.list_giftcard[0] : "";
	const mygifcart = formData.my_giftcard && formData.my_giftcard[0] ? formData.my_giftcard[0] : "";
	const imgs = formData.about_team_image && formData.about_team_image[0] ? formData.about_team_image[0] : "";

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${IP}/coupon/fetch`);
				const data = await res.json();
				console.log("giftcard filter data", data)
				const filteredGiftCards = data?.coupons?.filter((d) => d.type === "gift_card");
				// setUser(filteredGiftCards);
				dispatch(updateInputData({ formName: 'list_giftcard', inputData: filteredGiftCards }));
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
				dispatch(updateInputData({ formName: 'my_giftcard', inputData: data?.data }));
			} catch (error) {
				console.error("Error fetching user gift cards:", error);
			}
		};
		fetchData();
	}, [user]);



	console.log("user gioftc card", user)









	const handleSubmit = async (priceValue, giftCardId) => {
		setLoading(true);
		try {
			if (!priceValue || !giftCardId) {
				console.error("Offer value or gift card ID is missing.");
				return;
			}

			setOfferId(giftCardId);
			setPrices(priceValue);

			// Store offerId and prices in localStorage
			localStorage.setItem('offerId', giftCardId);
			localStorage.setItem('prices', priceValue);

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
		try {
			const paymentId = stripeToken.id;

			// Retrieve offerId and prices from localStorage
			const offerIds = localStorage.getItem('offerId');
			const prices = localStorage.getItem('prices');

			const paymentData = {
				paymentId: paymentId,
				userId: user_id,
				offerId: offerIds,
				price: prices,
				status: "paid",
			};
			const authToken = localStorage.getItem("token");
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: authToken,
				},
			};
			const response = await axios.post(`${IP}/payment/add-giftcard-payment`, paymentData, config);
			if (response.status === 200) {
				nav(`/userProfile`);
			}
			console.log("Payment successful:", response.data);
		} catch (error) {
			console.error("Error processing payment:", error);
			nav(`/userProfile`);
		}
	};


	return (
		<>
			<div id="gift_card_container_main">
				{Array.isArray(user) && user.length > 0 && user.map((card, index) => {
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
											<p className="description">{card.description}</p>
										</div>
										<div className="content_container_gift_card_para">
											<div className="d-block">
												{/* <p>Price: ${card.price}</p> */}
												<p>Card Value: ${card.offerValue}</p>
											</div>
											<StripeCheckout
												amount={card.price * 100}
												token={onSubmit}
												currency="USD"
												stripeKey="pk_test_51MXmewLnVrUYOeK2PN2SexCsPAi8lsw8dIt7Pw04DUCsoCsv7a0VReRlGhbUuDOKYqbp1PEDWRWklwSvEsUD0NZ400sa7PXdfg"
											>
												<button
													id="Buy_gift_card"
													className=""
													onClick={(event) => {
														event.preventDefault();
														handleSubmit(card.price, card._id);
													}}
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
