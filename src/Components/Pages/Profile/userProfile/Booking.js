import React, { useEffect, useState } from "react";
import Hook from "../Hook/Hook";
import "./Profile.css";
import image1 from "../../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg";
import Rating from "react-rating-stars-component";
import { FallingLines } from "react-loader-spinner";
import { IP } from "../../../../Constant";
import axios from "../../../../axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function Booking() {
	const nav = useNavigate()
	const token = localStorage.getItem("token");
	const user_id = localStorage.getItem("userid");
	const [data, setData] = useState(1);
	const [count, setCount] = useState(0);
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [userRating, setUserRating] = useState(0);
	const [userFeedback, setUserFeedback] = useState("");
	const username = localStorage.getItem("user_name");
	const [toggleStates, setToggleStates] = useState([]);
	const [isModalOpen, setModalOpen] = useState(false);
	const [profile, setProfile] = useState()
	const [providerId, setProviderId] = useState();
	const [booking_id, setBookingData] = useState(null); // State to store the current booking data
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await Hook.getPost();
				const filteredPosts = response.data.filter(booking => booking.service_status === "completed");
				setPosts(filteredPosts);
				setCount(filteredPosts.length);
				setIsLoading(false);
				setToggleStates(new Array(filteredPosts.length).fill(false));
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			}
		};

		fetchPosts();
	}, [data]);





	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await Hook.getProfile();



				setProfile(response.data.favorites);



			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			}
		};

		fetchPosts();
	}, []);


	console.log("profile page", profile)


	console.log("posts", posts)

	const handlePageClick = (data) => {
		setData(data.selected + 1);
	};

	const handleRatingChange = (newRating) => {
		setUserRating(newRating);
	};

	const handleFeedbackChange = (event) => {
		setUserFeedback(event.target.value);
	};

	const handleToggle = (booking) => {
		setModalOpen(true);
		setProviderId(booking.provider);
		setBookingData(booking._id);
		const newToggleStates = [...toggleStates];
		newToggleStates[booking.provider] = !newToggleStates[booking.provider];
		setToggleStates(newToggleStates);
	};



	const handleSubmitRating = () => {

		setLoading(true)
		// console.log("booking_id", booking_id)
		axios
			.post(`${IP}/user/addReviewToStore/${providerId}/${user_id}`, {
				reviewerName: username,
				rating: userRating,
				comments: userFeedback,
				booking_id: booking_id
			}, { shouldAddAuth: true })
			.then((res) => {
				if (res.status === 200) {
					setModalOpen(false);
					setLoading(false)
					toast.success("Your Review Successfully", {
						position: "top-right",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
						onClose: () => {
							nav("/userProfile")
						},
					});
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.response.data.message, {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			});
	};


	//add to favrate

	const addToFavorite = (id) => {
		console.log("provider id add to favrate", id)
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		};

		axios
			.post(`${IP}/user/addTofavorites/${id}/${user_id}`, {}, config)
			.then((res) => {
				console.log(res);
				toast.success(res.data.message, {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					onClose: () => {
						nav("/userProfile")
					},
				});
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.response.data.message, {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			});
	};

	return (
		<div className="overview" id="invoices">
			<div className="overview_container">
				<div className="title">
					<h3>BOOKING HISTORY</h3>
				</div>
				<div className="overview__containerMain">
					{isLoading ? (
						<FallingLines
							color="#03a9f4"
							width="150"
							visible={true}
							ariaLabel="falling-circles-loading"
						/>
					) : posts.length > 0 ? (
						posts.map((booking, index) => (
							<div className="overview_card" key={index}>
								<div className="overview_input">
									<div className="image_text">
										<img src={image1} width={150} height={130} alt="..." />
										<div className="text-item">
											<h3>Appointment With {username}</h3>
											<p>{booking.service_status}</p>
											<p>{booking.address}</p>
										</div>
									</div>
									<div className="time_date">
										<p>{booking.scheduled_date}</p>
										<h3>{booking.scheduled_timing}</h3>
										{
											profile.some((providerid) => providerid === booking.provider) ? (
												<div style={{ cursor: "pointer", fontSize: "30px" }}>❤️‍</div>

											) : (
												<button onClick={() => addToFavorite(booking.provider)} style={{ cursor: "pointer" }}>Add to Favorites</button>
											)
										}


										{
											!booking.ratings[0] ? <button onClick={() => handleToggle(booking)}>Feedback</button> : <Rating
												value={booking.ratings[0]}
												count={5}

												size={24}
												activeColor="#007bff"
											/>
										}

									</div>
								</div>

							</div>
						))
					) : (
						<h3 style={{ color: "#162b3c" }}>No bookings yet.</h3>
					)}
				</div>
				{isModalOpen && (
					<div className="modal_send_gift_card">
						<div className="modal-content">
							<span className="close" onClick={() => setModalOpen(false)}>
								&times;
							</span>
							<h3>Rate your experience</h3>
							<Rating
								value={userRating}
								count={5}
								onChange={handleRatingChange}
								size={24}
								activeColor="#007bff"
							/>
							<textarea
								placeholder="Share your feedback"
								value={userFeedback}
								onChange={handleFeedbackChange}
							/>
							<button type="submit" onClick={handleSubmitRating}>
								{loading ? "Loading..." : "Submit"}
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Booking;
