import React, { useEffect, useState } from "react";
import Hook from "../Hook/Hook";
import "./Profile.css";
import image1 from "../../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg";
import Rating from "react-rating-stars-component";
import ReactPaginate from "react-paginate";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "./Avatar";
import { FallingLines } from "react-loader-spinner";
import axios from "../../../../axios";
import { toast } from "react-toastify";

function Booking() {
	const token = localStorage.getItem("token");
	const user_id = localStorage.getItem("user_id");
	const [data, setData] = useState(1);
	const [count, setCount] = useState(0);
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [userRating, setUserRating] = useState(0); // State for user rating
	const [userFeedback, setUserFeedback] = useState(""); // State for user feedback
	const username = localStorage.getItem("user_name");
	const [toggleStates, setToggleStates] = useState([]); // State for toggle states
	const [isModalOpen, setModalOpen] = useState(false);
	const [providerId, setProviderId] = useState();
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await Hook.getPost();
				// Filter posts where service_status is completed
				const filteredPosts = response.data.filter(booking => booking.service_status === "completed");
				setPosts(filteredPosts);
				setCount(filteredPosts.length);
				setIsLoading(false);
				// Initialize toggle state for each post to false
				setToggleStates(new Array(filteredPosts.length).fill(false));
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			}
		};

		fetchPosts();
	}, [data]);

	const handlePageClick = (data) => {
		setData(data.selected + 1);
	};

	const itemsPerPage = 10;
	const startIndex = (data - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const handleRatingChange = (newRating) => {
		setUserRating(newRating);
	};

	const handleFeedbackChange = (event) => {
		setUserFeedback(event.target.value);
	};

	const handleToggle = (index) => {
		setModalOpen(true);
		setProviderId(index)
		// Create a copy of the toggleStates array and update the state for the clicked card
		const newToggleStates = [...toggleStates];
		newToggleStates[index] = !newToggleStates[index];
		setToggleStates(newToggleStates);
	};



	const handleSubmitRating = () => {
		console.log("Booking ID:", providerId);
		console.log("User Rating:", userRating);
		console.log("User Feedback:", userFeedback);
		axios
			.post(
				`/user/addReviewToStore/${providerId}/${user_id} `,
				{
					reviewerName: username,
					rating: userRating,
					comments: userFeedback,
				},

				{ shouldAddAuth: true }
			)
			.then((res) => {
				console.log(res);

				if (res.status == 200) {
					setModalOpen(false);
					toast.error(res.data.message, {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
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
	console.log("posts", posts);
	return (
		<div className="overview" id="invoices">
			<div className="overview_container">
				<Avatar name={username} />
				{/* <div className="heading">
					<h3>{username}</h3>
				</div> */}
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
								<div
									className="overview_input"
								
								>
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


										<button onClick={() => handleToggle(booking.provider)}>
											Feedback
										</button>

									</div>
								</div>
								{toggleStates[index] && (
									<div className="rating-feedback-section">
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
										<button onClick={() => handleSubmitRating(booking.id)}>
											Submit
										</button>
									</div>
								)}
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
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									margin: 10,
								}}
							>
								<Rating
									value={userRating}
									count={5}
									onChange={handleRatingChange}
									size={24}
									activeColor="#007bff"
								/>
							</div>
							<textarea
								placeholder="Share your feedback"
								value={userFeedback}
								onChange={handleFeedbackChange}
							/>


							<button type="submit" onClick={() => handleSubmitRating()}>
								Submit
							</button>
						</div>
					</div>
				)}
			</div>

		</div>
	);
}

export default Booking;
