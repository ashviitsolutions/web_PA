import React, { useState, useEffect } from "react";
import "./Profile.css";
import img1 from "../../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg";
import Hook from "../Hook/Hook";
import { FaMedal } from "react-icons/fa";
import Membership from "./Membership";
import moment from "moment";
import Avatar from "./Avatar";
import { FallingLines } from "react-loader-spinner";
import { IconButton, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { IP } from "../../../../Constant";
import { ToastContainer, toast } from "react-toastify";

function Overview() {
	const username = localStorage.getItem("user_name");
	const token = localStorage.getItem("token");
	const user_id = localStorage.getItem("userid");
	const [membershipLevel, setMembershipLevel] = useState("silver");
	const [membership, setMembership] = useState(null);
	const [name, setName] = useState("");
	const [posts, setPosts] = useState([]);
	const [eventStates, setEventStates] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [completedBookings, setCompletedBookings] = useState([]);
	const itemsPerPage = 10;

	const handleToggle = (id) => {
		setEventStates((prevState) => ({
			...prevState,
			[id]: !prevState[id],
		}));
	};

	const isEventOpen = (id) => {
		return eventStates[id] || false;
	};

	useEffect(() => {
		const fetchBooking = async () => {
			try {
				const response = await Hook.getPost();
				setPosts(response.data);
				setIsLoading(false);
				console.log("get response", response.data);
				const randomIndex = Math.floor(Math.random() * response.data.length);

				// Get the random object
				const randomObject = response.data[randomIndex];

				// Push the object to the destination array
				setCompletedBookings([
					{ ...randomObject, provider_id: "658c0477d46d859aa893a4da" },
				]);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		const fetchPosts = async () => {
			try {
				const response = await Hook.getProfile();
				console.log("profile image", response);
				if (response.data.name) {
					setName(response.data.name);
					localStorage.setItem("user_name", response.data.name);
				} else {
					const fullName = `${response.data.first_name} ${response.data.last_name}`;
					setName(fullName);
					localStorage.setItem("user_name", fullName);
				}
				localStorage.setItem("user_email", response.data.email);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchBooking();
		fetchPosts();
	}, []);

	// console.log("fetching overview data:", posts);

	// Filter the appointments with status "pending" or "scheduled"
	const filteredAppointments = posts.filter(
		(post) =>
			post.service_status === "pending" || post.service_status === "scheduled"
	);
	const filteredSchudule = posts.filter(
		(post) => post.service_status === "scheduled"
	);
	const filteredPending = posts.filter(
		(post) => post.service_status === "pending"
	);

	// Calculate the index range for the current page
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	// Get the data for the current page
	const fullAppointment = filteredAppointments.slice(startIndex, endIndex);
	const currentPending = filteredPending.slice(startIndex, endIndex);
	const currenSchudule = filteredSchudule.slice(startIndex, endIndex);

	const handlemembersh = () => {
		navigator("/");
	};
	const addToFavorite = (id) => {
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
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			})
			.catch((err) => {
				console.log(err);
				toast.success(
					err.response.data.msg
						? err.response.data.msg
						: err.response.data.message,
					{
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					}
				);
			});
	};


	console.log("schedule from overview", currenSchudule);
	console.log("completed posts", currentPending);
	return (
		<>
			<div className="inner">
				<Avatar name={username} />
				{/* <div className="gutter">
					<h3 className="profile_heading">{name || username}</h3>
				</div> */}
				<div className="gutter">
					<h3 className="small_heading">UPCOMING BOOKINGS</h3>
				</div>

				<div id="my_appointments">
					{isLoading ? (
						<FallingLines
							color="#03a9f4"
							width="150"
							visible={true}
							ariaLabel="falling-circles-loading"
						/>
					) : (
						<div className="container-fluid">
							{fullAppointment.length === 0 ? (
								<h3 style={{ color: "#162b3c" }}>No bookings yet.</h3>
							) : (
								<>
									<div className="row" id="overview_page_container">
										<div className="status_booking">
											<h3>Pending Booking</h3>
										</div>
										{currentPending.length === 0 ? (
											<h3 style={{ color: "#162b3c" }}>
												No pending bookings found.
											</h3>
										) : (
											currentPending.map((post, index) => (
												<div className="col-sm-5" key={index}>
													<div className="gutter">
														<div
															className="appointment card"
															onClick={() => handleToggle(`app${index + 1}`)}
														>
															<span className="ripple"></span>
															<div className="relative_time float_wrapper">
																<h3 className="pull-left">
																	{post.scheduled_timing}
																</h3>
																<h4 className="pull-right">

																	{post.scheduled_date}


																</h4>
															</div>
															{/* <div className="absolute_time float_wrapper">
																<h4 className="pull-left">
																	{post.scheduled_date}
																</h4>
															</div> */}
															<div className="profile">
																<div className="">
																	<span className="avatar">
																		<img
																			src={img1}
																			width={60}
																			height={60}
																			alt="Avatar"
																		/>
																	</span>
																	<div className="text">
																		<h3>{post?.service_id?.title}</h3>
																		<p>{post.service_time}</p>
																	</div>
																</div>
															</div>
															{isEventOpen(`app${index + 1}`) && (
																<div className="more_detail">
																	<div className="address float_wrap">
																		<p>{post.address}</p>
																		{post.location_type === "provider" && (
																			<button className="button_direction">
																				Get Directions
																			</button>
																		)}
																	</div>
																	<hr />
																	<div className="host">
																		<div className="avatar"></div>
																		{post.service_status === "pending" ? (
																			<p>
																				Your booking is yet to be Accepted by
																				one of Our Providers!
																			</p>
																		) : (
																			<p>
																				Appointment with <b>{post.host}</b>
																			</p>
																		)}
																	</div>
																	<div className="billing float_wrapper">
																		<p className="pull-left">
																			$ {post?.amount_charged}
																		</p>
																		<p className="paid pull-right">
																			{post.service_status}
																		</p>
																	</div>
																</div>
															)}
														</div>
													</div>
												</div>
											))
										)}
									</div>

									<div className="row mt-3" id="overview_page_container">
										<div className="status_booking">
											<h3>Scheduled Booking</h3>
										</div>
										{currenSchudule.length === 0 ? (
											<h3 style={{ color: "#162b3c", fontSize: "15px" }}>
												No Scheduled bookings found.
											</h3>
										) : (
											currenSchudule.map((post, index) => (
												<div className="col-sm-5" key={index}>
													<div className="gutter">
														<div
															className="appointment card"
															onClick={() => handleToggle(`app${index + 1}`)}
														>
															<span className="ripple"></span>
															<div className="relative_time float_wrapper">
																<h3 className="pull-left">
																	{post.scheduled_timing}
																</h3>
																<h4 className="pull-right">1 day 20 hours</h4>
															</div>
															<div className="absolute_time float_wrapper">
																<h4 className="pull-left">
																	{post.scheduled_date}
																</h4>
															</div>
															<div className="profile">
																<span className="avatar">
																	<img
																		src={img1}
																		width={60}
																		height={60}
																		alt="Avatar"
																	/>
																</span>
																<div className="text">
																	<h3>{post?.service_id?.title}</h3>
																	<p>{post.service_time}</p>
																</div>
															</div>
															{isEventOpen(`app${index + 1}`) && (
																<div className="more_detail">
																	<div className="address float_wrap">
																		<p>{post.address}</p>
																		{post.location_type === "provider" && (
																			<button className="button_direction">
																				Get Directions
																			</button>
																		)}
																	</div>
																	<hr />
																	<div className="host">
																		<div className="avatar"></div>
																		{post.service_status === "pending" ? (
																			<p>
																				Your booking is yet to be Accepted by
																				one of Our Providers!
																			</p>
																		) : (
																			<p>
																				Appointment with <b>{post?.providerInfo?.first_name} {post?.providerInfo?.last_name}</b>
																			</p>
																		)}
																	</div>
																	<div className="billing float_wrapper">
																		<p className="pull-left">
																			$ {post?.amount_charged}
																		</p>
																		<p className="paid pull-right">
																			{post.service_status}
																		</p>
																	</div>
																</div>
															)}
														</div>
													</div>
												</div>
											))
										)}
									</div>
									{/*	<div className="row mt-3" id="overview_page_container">
										<div className="status_booking">
											<h3>Completed Bookings</h3>
										</div>
										{completedBookings.length === 0 ? (
											<h3 style={{ color: "#162b3c", fontSize: "15px" }}>
												No Completed bookings found.
											</h3>
										) : (
											completedBookings.map((post, index) => (
												<div className="col-sm-5" key={index}>
													<div className="gutter">
														<div
															className="appointment card"
														// onClick={() => handleToggle(`app${index + 1}`)}
														>
															<span className="ripple"></span>
															<div className="relative_time float_wrapper">
																<h3 className="pull-left">
																	{post.scheduled_timing}
																</h3>
																<h4 className="pull-right">1 day 20 hours</h4>
															</div>
															<div className="absolute_time float_wrapper">
																<h4 className="pull-left">
																	{post.scheduled_date}
																</h4>
															</div>
															<div
																className="profile"
																style={{
																	display: "flex",
																	justifyContent: "space-between",
																}}
															>
																<div className="">
																	<span className="avatar">
																		<img
																			src={img1}
																			width={60}
																			height={60}
																			alt="Avatar"
																		/>
																	</span>
																	<div className="text">
																		<h3>{post?.service_id?.title}</h3>
																		<p>{post.service_time}</p>
																	</div>
																</div>

																<div style={{ alignSelf: "flex-end" }}>
																	<Tooltip
																		title="Add To Favorites"
																		placement="top"
																	>
																		<IconButton
																			onClick={() =>
																				addToFavorite(post.provider_id)
																			}
																		>
																			<FavoriteBorderIcon
																				sx={{ width: 30, height: 30 }}
																			/>
																		</IconButton>
																	</Tooltip>
																</div>
															</div>
														</div>
													</div>
												</div>
											))
										)}
																		</div> */}
								</>
							)}
						</div>
					)}
				</div>
				<ToastContainer />
			</div>

			{/* Pagination controls */}
			<div className="overview_user_page_pagination">
				{Array.from(
					{ length: Math.ceil(filteredAppointments.length / itemsPerPage) },
					(_, i) => (
						<button
							key={i}
							onClick={() => setCurrentPage(i + 1)}
							className={currentPage === i + 1 ? "active" : ""}
						>
							{i + 1}
						</button>
					)
				)}
			</div>
		</>
	);
}

export default Overview;
