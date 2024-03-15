import React, { useState, useEffect, useCallback } from "react";
import { IP } from "../../../Constant";
import CustomModal from "./Model";
import { FallingLines } from "react-loader-spinner";
import moment from "moment";

function Event() {
    const token = localStorage.getItem("providertoken");
    const [request, setRequest] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("");
    const [searchText, setSearchText] = useState("");

    const [display, setDisplay] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedEventData, setSelectedEventData] = useState(null); // New state to store selected event data
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(null);




    const fetchData = useCallback(() => {
        setLoading(true);
        fetch(`${IP}/user/allbookings?page=${pageNumber}&limit=5`, {
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
    }, [pageNumber, token]);

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
        // Filter data based on selected dates, status, and search text
        const filteredData = request.filter(event => {
            const eventDate = moment(event.scheduled_date);
            const isWithinDateRange = (!startDate || eventDate.isSameOrAfter(startDate)) &&
                (!endDate || eventDate.isSameOrBefore(endDate));
            const isStatusMatched = !status || event.service_status === status;
            const isSearched = !searchText || event.service_name.toLowerCase().includes(searchText.toLowerCase());
            return isWithinDateRange && isStatusMatched && isSearched;
        });
        return filteredData;
    };

    const filteredRequest = handleFilter();

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
                                <div class="input_group">
                                    <input type="date" class="input" placeholder="Start Date" onChange={e => setStartDate(e.target.value)} value={startDate} />
                                    <span class="highlight"></span>
                                </div>
                                <span class="highlight"> From </span>
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
                                {filteredRequest.map((event, index) => (
                                    <div className="item_wrapper" key={index} onClick={() => openModal(event)}>
                                        <div className="item card layer2">
                                            <div className="first_half">
                                                <h3>{event.service_name} {event.service_time} - {event.massage_for}</h3>
                                                <span className="address">{event.address}</span>
                                                <span className="address"><b></b>{event.scheduled_date}</span>
                                                <span className="address"><b></b>{event.scheduled_timing}</span>
                                                <span className="tag"><b>Booking status: </b>{event.service_status}</span>
                                                <span className="tag"><b></b> {event.instructions !== '' ? <><strong className="mt-1">Instructions : </strong> {event.instructions} </> : ''}</span>
                                            </div>
                                            <div className="second_half">
                                                <span>Date: {moment(event.createdAt).format("MMMM Do YYYY")}, Time: {moment(event.createdAt).format("LT")}</span>

                                                <span className="colored">Total = {event?.amount_calculation?.amount_widthout_tax.toFixed(2)}</span>
                                                {
                                                    event.service_status === "pending" && (
                                                        <button className="button primary square">Assign Event</button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}

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
                    amount_calculation={selectedEventData.amount_calculation}
                />
            )}
        </>
    );
}

export default Event;
