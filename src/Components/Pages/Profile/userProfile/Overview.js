import React, { useState, useEffect } from "react";
import "./Profile.css";
import img1 from "../../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg";
import Hook from "../Hook/Hook";
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice';
import { FallingLines } from "react-loader-spinner";
import { IconButton, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { IP } from "../../../../Constant";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function Overview() {
	const nav = useNavigate()
	const dispatch = useDispatch();
	const selector = useSelector((state) => state.counter.formData);
	const posts = Array.isArray(selector?.bookingdata) && selector.bookingdata.length > 0 ? selector.bookingdata[0] : [];

	const [name, setName] = useState("");
	// const [posts, setPosts] = useState([]);
	const [eventStates, setEventStates] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	console.log("postspostspostsposts", posts)

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
				// setPosts(response.data);
				dispatch(updateInputData({ formName: 'bookingdata', inputData: response.data }));


			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		const fetchPosts = async () => {
			try {
				const response = await Hook.getProfile();
				console.log("profile image", response);
				dispatch(updateInputData({ formName: 'profiledata', inputData: response.data }));
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
	}, [dispatch]);


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


	console.log("booking data",posts)


	return (
		<>
			<div className="progressbar_userpannel profileSpace">
				<div className="inner">

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

																		
																		{moment(post.scheduled_date).format("Do MMMM YYYY")}


																	</h4>
																</div>

																<div className="profile">
																	<div className="">
																		<span className="avatar">
																			<img
																				src={`${IP}/file/${post?.attachments}`}
																				width={60}
																				height={60}
																				alt="Avatar"
																			/>
																		</span>
																		<div style={{ display: "flex", justifyContent: "space-between" }}>
																			<div className="text" id="service_name_text">
																				<h3>{post?.service_name}</h3>
																				<p>{post.service_time}</p>
																			</div>
																			<div className="" id="addons_text">
																				<h3>Add-ons:</h3>
																					{post.add_ons_details.map((addon, index) => (
																						<p key={index} style={{ margin: '4px 0' }}>{addon.title}</p>
																					))}
																			</div>
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
																					Your request is being reviewed by our service providers, once accepted we will notify you!
																				</p>
																			) : (
																				<p>
																					Appointment with <b>{post.host}</b>
																				</p>
																			)}
																		</div>
																		<div className="billing float_wrapper">
																			<p className="pull-left">
																				$ {post?.user_amount_calculation?.totalAmountWithTax?.toFixed(2)}
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
																	<h4 className="pull-right">{moment(post.scheduled_date).format("Do MMMM YYYY")}</h4>
																</div>
															
																<div className="profile">
																	<span className="avatar">
																		<img
																			src={`${IP}/file/${post?.attachments}`}
																			width={60}
																			height={60}
																			alt="Avatar"
																		/>
																	</span>
																	<div style={{ display: "flex", justifyContent: "space-between" }}>
																		<div className="text">
																			<h3>{post?.service_name}</h3>
																			<p>{post.service_time}</p>
																		</div>
																		<div className="text">
																			<h3>Add-ons:</h3>
																				{post.add_ons_details.map((addon, index) => (
																					<p key={index} style={{ margin: '4px 0' }}>{addon.title}</p>
																				))}
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
																					Your request is being reviewed by our service providers, once accepted we will notify you!
																				</p>
																			) : (
																				<p>
																					Appointment with <b>{post?.providerInfo[0]?.first_name} {post?.providerInfo[0]?.last_name}</b>
																				</p>
																			)}
																		</div>
																		<div className="billing float_wrapper">
																			<p className="pull-left">
																				$ {post?.user_amount_calculation?.totalAmountWithTax?.toFixed(2)}
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
			</div>

		</>
	);
}

export default Overview;
