import React, { useState, useEffect, useCallback } from "react";
import { IP } from "../../../Constant";
import CustomModal from "./Model";
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

    const fetchData = useCallback(() => {
        fetch(`${IP}/user/allbookings`, {
            headers: {
                'Authorization': token
            }
        }).then(resp => resp.json())
            .then(result => {
                setRequest(result);
                console.log("booking data data", result);
            })
            .catch(err => {
                console.log(err);
            });
    }, [token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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

    //model logic

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(true);
    };


    return (
        <>
            <div id="content">
                <div className="container-fluid">





                    <div className="row">
                        <div className="">
                            <div className="headings">
                                <h3>Events</h3>
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
                                        <option value="schedule">schedule</option>
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
                                    <div className="item_wrapper" key={index} onClick={openModal}>
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




                                        <CustomModal
                                            event={event.event}
                                            show={showModal}
                                            onHide={closeModal}
                                            title={event.service_name}
                                            address={event.address}
                                            time={event.scheduled_timing}
                                            date={event.scheduled_date}
                                            _id={event._id}
                                          
                                            status={event.service_status}
                                            getdirection={event.location}



                                            total={event.total}

                                            areasOfConcern={event.areas_of_concern}
                                            customerEmail={event.customer_email}
                                            gender={event.gender}
                                            healthConditions={event.health_conditions}
                                            locationType={event.location_type}
                                            massageBodyPart={event.massage_body_part}
                                            massageFor={event.massage_for}
                                            serviceTime={event.service_time}
                                            specialConsiderations={event.special_considerations}
                                            paymentIntentId={event.paymentIntentId}
                                            gendercheck={event.gendercheck}
                                            add_ons={event.add_ons}
                                            add_ons_details={event.add_ons_details}
                                            massage_for={event.massage_for}
                                            amount_calculation={event.amount_calculation}

                                        />

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}

export default Event;
