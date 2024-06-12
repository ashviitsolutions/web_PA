import React, { useState, useEffect, useCallback } from "react";
import { IP } from "../../../Constant";
import CustomModal from "./Model";
import { FallingLines } from "react-loader-spinner";
import moment from "moment";
import { useLocation } from 'react-router-dom';

function Event() {

    const location = useLocation();
    const event_status = location.state ? location.state.event_status : "";
    // const endDates = location.state.endDate;
    // const startDates = location.state.startDate
    const startDates = location.state ? location.state.startDate : "";
    const endDates = location.state ? location.state.endDate : "";
    const Startdate = localStorage.getItem("startDate")
    const Enddate = localStorage.getItem("endDate")
    const token = localStorage.getItem("tokenadmin");
    const [request, setRequest] = useState([]);
    // const [startDate, setStartDate] = useState("");
    // const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("");
    const [searchText, setSearchText] = useState("");

    const [display, setDisplay] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedEventData, setSelectedEventData] = useState(null); // New state to store selected event data
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(null);
    const [startDate, setStartDate] = useState(startDates || Startdate);
    const [endDate, setEndDate] = useState(endDates || Enddate);

    useEffect(() => {
        setStatus(event_status)
        setStartDate(Startdate);
        setEndDate(Enddate);
    }, [event_status, endDates, endDates]);







    const fetchData = useCallback(() => {
        setLoading(true);
        fetch(`${IP}/bookings/allbookings`, {
            headers: {
                'Authorization': token
            }
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            })
            .then(result => {
                setRequest(prevData => [...prevData, ...result]);
                console.log("booking data data", result);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            }
            ).finally(() => {
                setLoading(false); // Set loading to false after fetching data
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);




    const handleInfiniteScroll = async () => {
        try {

            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight
            ) {
                setPageNumber((prev) => prev + 1);
                setLoading(true)
            }

        } catch (error) {

        }
    }


    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        return () => window.removeEventListener("scroll", handleInfiniteScroll)
    }, [])














    const handleFilter = () => {
        console.log("Filtering with status:", status);
        const filteredData = request.filter(event => {
            console.log("Event status:", event.service_status);

            const eventDate = moment(event.createdAt);
            const isWithinDateRange = (!startDate || eventDate.isSameOrAfter(startDate)) &&
                (!endDate || eventDate.isSameOrBefore(endDate));
            const isStatusMatched = !status || event.service_status === status;
            const isSearched = !searchText || event.service_name.toLowerCase().includes(searchText.toLowerCase());
            return isWithinDateRange && isStatusMatched && isSearched;
        });
        return filteredData;
    };


    const filteredRequest = handleFilter();

    console.log("user booking data", filteredRequest)

    // Model logic

    const openModal = (eventData) => { // Modified openModal to accept eventData
        setSelectedEventData(eventData); // Set the selected event data
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false); // Close modal
    };

    return (
        <>

            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="">
                            <div className="headings">
                                <h3 >Events</h3>
                                <span className="toggle_sidebar" ></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="gutter">
                            <div class="card layer1 filters">
                                <span class="highlight"> from </span>
                                <div class="input_group">
                                    <input type="date" class="input" placeholder="Start Date" onChange={e => setStartDate(e.target.value)} value={startDate} />
                                    <span class="highlight"></span>
                                </div>
                                <span class="highlight"> to </span>
                                <div class="input_group">
                                    <input type="date" class="input" placeholder="End Date" onChange={e => setEndDate(e.target.value)} value={endDate} />
                                    <span class="highlight"></span>
                                </div>
                                <div class="input_group">
                                    <select name="" id="" class="input" onChange={e => setStatus(e.target.value)} value={status}>
                                        <option value="">status</option>
                                        <option value="pending">pending</option>
                                        <option value="completed">completed</option>
                                        <option value="scheduled">scheduled</option>
                                    </select>
                                    <span class="highlight"></span>
                                </div>

                                <div class="input_group pull-right" style={{ maxWidth: "20%" }}>
                                    <input type="text" class="input" placeholder="search here.." onChange={e => setSearchText(e.target.value)} value={searchText} />
                                    <span class="highlight"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="gutter">
                            <div className="bookings">
                                {filteredRequest.length === 0 ? (
                                    <p>No bookings found.</p>
                                ) : (
                                    filteredRequest.map((event, index) => (
                                        <div className="item_wrapper" key={index} onClick={() => openModal(event)}>
                                            <div className="item card layer2">
                                                <div className="first_half">
                                                    <h3>{event?.user?.first_name} {event?.user?.last_name}</h3>
                                                    <h3>{event.service_name} {event.service_time} - {event.massage_for}</h3>
                                                    <span className="address">{event.address}</span>
                                                    <span className="address"><b></b>{event.scheduled_date}</span>
                                                    <span className="address"><b></b>{event.scheduled_timing}</span>
                                                    <span className="tag">
                                                        <b>Booking status: </b>
                                                        {event.service_status}
                                                        {event?.provider?.first_name && event?.provider?.last_name ? (
                                                            <> by {event.provider.first_name} {event.provider.last_name}</>
                                                        ) : null}
                                                    </span>

                                                    <span className="tag"><b></b> {event.instructions !== '' ? <><strong className="mt-1">Instructions : </strong> {event.instructions} </> : ''}</span>
                                                </div>
                                                <div className="second_half">
                                                    <span>Date: {moment(event.createdAt).format("MMMM Do YYYY")}, Time: {moment(event.createdAt).format("LT")}</span>

                                                    <span className="colored">Total = {event?.provider_amount_calculation?.total_amount.toFixed(2)}</span>
                                                    {
                                                        event.service_status === "pending" && (
                                                            <button className="button primary square">Assign Event</button>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {loading && (
                                <div style={{ textAlign: "center" }}>
                                    <FallingLines
                                        color="#03a9f4"
                                        width="150"
                                        visible={true}
                                        ariaLabel="falling-circles-loading"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {selectedEventData && (
                <CustomModal
                    startDate={startDate}
                    endDate={endDate}
                    booking_status={selectedEventData.service_status}
                    event={selectedEventData.event}
                    show={showModal}
                    onHide={closeModal}
                    title={selectedEventData.service_name}
                    address={selectedEventData.address}
                    time={selectedEventData.scheduled_timing}
                    date={selectedEventData.scheduled_date}
                    _id={selectedEventData._id}
                    status={selectedEventData.service_status}
                    getdirection={selectedEventData.location}
                    total={selectedEventData.total}
                    areasOfConcern={selectedEventData.areas_of_concern}
                    customerEmail={selectedEventData.customer_email}
                    gender={selectedEventData.gender}
                    healthConditions={selectedEventData.health_conditions}
                    locationType={selectedEventData.location_type}
                    massageBodyPart={selectedEventData.massage_body_part}
                    massageFor={selectedEventData.massage_for}
                    serviceTime={selectedEventData.service_time}
                    specialConsiderations={selectedEventData.special_considerations}
                    paymentIntentId={selectedEventData.paymentIntentId}
                    gendercheck={selectedEventData.gendercheck}
                    add_ons={selectedEventData.add_ons}
                    add_ons_details={selectedEventData.add_ons_details}
                    massage_for={selectedEventData.massage_for}
                    amount_calculation={selectedEventData.provider_amount_calculation}
                />
            )}
        </>
    );
}

export default Event;
