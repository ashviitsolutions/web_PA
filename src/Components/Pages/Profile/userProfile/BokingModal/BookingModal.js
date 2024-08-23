import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { ToastContainer } from "react-toastify";
import BookingList from './BookingList';
import Pagination from './Pagination';
import "./Style.css";

function BookingModal({ bookings, title, rating, favrate }) {
	const dispatch = useDispatch();
	const [eventStates, setEventStates] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const toggleEvent = (id) => {
		setEventStates(prevState => ({
			...prevState,
			[id]: !prevState[id],
		}));
	};

	const isEventOpen = (id) => eventStates[id] || false;

	const filterBookings = (status) => bookings.filter(post => post.service_status === status);

	const pendingAppointments = filterBookings("pending");
	const scheduledAppointments = filterBookings("scheduled");
	const completedAppointments = filterBookings("completed");

	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedPendingAppointments = pendingAppointments.slice(startIndex, startIndex + itemsPerPage);
	const paginatedScheduledAppointments = scheduledAppointments.slice(startIndex, startIndex + itemsPerPage);
	const paginatedCompletedAppointments = completedAppointments.slice(startIndex, startIndex + itemsPerPage);

	const totalAppointments = pendingAppointments.length + scheduledAppointments.length + completedAppointments.length;

	return (
		<div className="booking-modal-container">
			<div id="booking-card-content">
				<h1>{title}</h1>
			</div>

			<div className="booking-modal-inner">
				<div className="booking-modal-content">
					{totalAppointments === 0 ? (
						<div id="booking-card-content">
							<h3>No bookings yet.</h3>
						</div>
					) : (
						<>
							{pendingAppointments.length > 0 && (
								<BookingList
									bookings={paginatedPendingAppointments}
									toggleEvent={toggleEvent}
									isEventOpen={isEventOpen}
									status="pending"
								/>
							)}
							{scheduledAppointments.length > 0 && (
								<BookingList
									bookings={paginatedScheduledAppointments}
									toggleEvent={toggleEvent}
									isEventOpen={isEventOpen}
									status="scheduled"
								/>
							)}
							{completedAppointments.length > 0 && (
								<BookingList
									bookings={paginatedCompletedAppointments}
									toggleEvent={toggleEvent}
									isEventOpen={isEventOpen}
									status="completed"
									rating={rating}
									favrate={favrate}
								/>
							)}
						</>
					)}
				</div>
				<Pagination
					totalItems={totalAppointments}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			</div>

			<ToastContainer />
		</div>
	);
}

export default BookingModal;
