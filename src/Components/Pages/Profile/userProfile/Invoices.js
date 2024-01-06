import React, { useState, useEffect } from "react";
import "./Profile.css";
import img1 from "../../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg";
import Hook from "../Hook/Hook";
import Avatar from "./Avatar";

function Invoices() {
	const username = localStorage.getItem("user_name");
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	useEffect(() => {
		const fetchBooking = async () => {
			try {
				const response = await Hook.getPost();
				setPosts(response.data);
				setIsLoading(false);
				console.log("get response", response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchBooking();
	}, []);

	console.log("fetching invoices data:", posts);

	// Filter the appointments with status "pending" or "scheduled"
	const filteredAppointments = posts.filter(
		(post) => post.service_status === "completed"
	);

	// Calculate the index range for the current page
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	// Get the data for the current page
	const currentData = filteredAppointments.slice(startIndex, endIndex);
	console.log(posts);
	return (
		<div className="overview" id="invoices">
			<div className="overview_container">
				{/* <div className='heading'>
          <h3>{username}</h3>
        </div> */}
				<Avatar name={username} />
				<div className="title">
					<h3>INVOICES</h3>
				</div>
				<div className="overview_card">
					{isLoading ? (
						<h1 style={{ color: "#162b3c" }}>Loading...</h1>
					) : currentData.length === 0 ? (
						<h3 style={{ color: "#162b3c" }}>No bookings yet.</h3>
					) : (
						currentData.map((invoice, index) => (
							<div className="overview_input" key={index}>
								<div className="image_text">
									<img src={img1} width={150} height={130} alt="..." />
									<div className="text-item">
										<h3>Appointment With {username}</h3>
										<p>{invoice.service_status}</p>
										<div id="dateofpara">
											<p>{invoice.scheduled_date}</p>
											<p style={{ fontWeight: "700" }}>
												{invoice.scheduled_timing}
											</p>
										</div>
										<p id="dateofaddresswc">{invoice.address}</p>
									</div>
								</div>
								<div className="time_date">
									<h3>$70</h3>
									<p>+$15 Tip</p>
									<h3>Total = {invoice.amount_charged}</h3>
									<button>Download Invoice</button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default Invoices;
