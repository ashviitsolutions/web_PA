import React, { useState, useEffect, useMemo } from "react";
import { FallingLines } from "react-loader-spinner";
import moment from "moment";
import { useLocation, useNavigate } from 'react-router-dom';
import CustomModal from "./Model";
import { IP } from "../../../Constant";
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from "../../../Components/Pages/Redux/counterSlice";

function Event() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const formData = useSelector((state) => state?.counter?.formData);
    const request = formData.admin_booking_data && formData.admin_booking_data[0] ? formData.admin_booking_data[0] : [];
    const location = useLocation();
    const event_status = location.state ? location.state.event_status : "";
    const startDates = location.state ? location.state.startDate : "";
    const endDates = location.state ? location.state.endDate : "";
    const Startdate = localStorage.getItem("startDate");
    const Enddate = localStorage.getItem("endDate");

    const [startDate, setStartDate] = useState(startDates || Startdate || moment().subtract(7, 'day').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(endDates || Enddate || moment().format('YYYY-MM-DD'));

    const token = localStorage.getItem("tokenadmin");

    const [status, setStatus] = useState(event_status);
    const [searchText, setSearchText] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedEventData, setSelectedEventData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const nextDay = new Date(endDate);
            nextDay.setDate(nextDay.getDate() + 1);

            const res = await fetch(`${IP}/bookings/allbookings?service_status=${status}&startDate=${startDate}&endDate=${nextDay.toISOString().split('T')[0]}`, {
                method: 'GET',
                headers: {
                    Authorization: token
                }
            });
            const data = await res.json();
            dispatch(updateInputData({ formName: 'admin_booking_data', inputData: data }));
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false); // Ensure loading state is cleared on error
        }
    };

    useEffect(() => {
        fetchData();
    }, [status,event_status, startDate, endDate, token]);

    useEffect(() => {
        localStorage.setItem("startDate", startDate);
        localStorage.setItem("endDate", endDate);
    }, [startDate, endDate]);

    useEffect(() => {
        // const today = moment().format('YYYY-MM-DD');
        // setStartDate(moment(today).subtract(7, 'day').format('YYYY-MM-DD'));
        // setEndDate(today);
        setStatus(event_status);
    }, [event_status]);


    const openModal = (eventData) => {
        setSelectedEventData(eventData);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleRowClick = (client) => {
        nav(`/admin/clients/edit_client/${client._id}`, { state: { client } });
    };

    const handleProvider = (client) => {
        nav(`/admin/contractors/view_contractor/${client.provider_id}`, { state: { client } });
    };

    const filteredTransactions = useMemo(() =>
        request?.filter((event) =>
            event?.service_name?.toLowerCase().includes(searchText.toLowerCase())
            // Add more filtering conditions if needed
        ), [request, searchText]);

    console.log("filteredTransactions", filteredTransactions);

    return (
        <>
            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="">
                            <div className="headings">
                                <h3><span className='cursor title backarrow' onClick={() => nav(-1)}>&larr;</span> Events</h3>
                                <div className="gutter pull-right">
                                    <small className='sub'>
                                        <p>* Click on client name to view/edit client details</p>
                                        <p>* Click on service name to view details</p>
                                        <p>* Click on provider name to view/edit provider details</p>
                                    </small>
                                </div>
                                <span className="toggle_sidebar"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="gutter">
                            <div className="card layer1 filters">
                                <span className="highlight"> from </span>
                                <div className="input_group">
                                    <input type="date" className="input" placeholder="Start Date" onChange={e => setStartDate(e.target.value)} value={startDate} />
                                    <span className="highlight"></span>
                                </div>
                                <span className="highlight"> to </span>
                                <div className="input_group">
                                    <input type="date" className="input" placeholder="End Date" onChange={e => setEndDate(e.target.value)} value={endDate} />
                                    <span className="highlight"></span>
                                </div>
                                <div className="input_group">
                                    <select className="input" onChange={e => setStatus(e.target.value)} value={status}>
                                        <option value="">All Booking</option>
                                        <option value="pending">pending</option>
                                        <option value="completed">completed</option>
                                        <option value="scheduled">scheduled</option>
                                        <option value="incompleted">Incompleted</option>
                                    </select>
                                    <span className="highlight"></span>
                                </div>
                                <div className="input_group pull-right" style={{ maxWidth: "20%" }}>
                                    <input type="text" className="input" placeholder="search here.." onChange={e => setSearchText(e.target.value)} value={searchText} />
                                    <span className="highlight"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="gutter">
                            <div className="bookings">
                                {filteredTransactions?.length > 0 ? (
                                    filteredTransactions?.map((event, index) => (
                                        <div className="item_wrapper" key={index}>
                                            <div className="item card layer2">
                                                <div className="first_half">
                                                    <h3 className="link title" onClick={() => handleRowClick(event.userInfo[0])}>
                                                        {event.userInfo[0]?.first_name && event.userInfo[0]?.last_name ? (
                                                            <span className="link title">
                                                                {`${event.userInfo[0].first_name} ${event.userInfo[0].last_name}`}
                                                            </span>
                                                        ) : null}
                                                    </h3>
                                                    <h3 className="link" onClick={() => openModal(event)}>
                                                        {`${event.service_name} ${event.service_time} - ${event.massage_for}`}
                                                    </h3>
                                                    <span className="address">{event.address}</span>
                                                    <span className="address"><b></b>{event.scheduled_date}</span>
                                                    <span className="address"><b></b>{event.scheduled_timing}</span>
                                                    <span className="tag">
                                                        <b>Booking status: </b>
                                                        {event.service_status}
                                                        {event.providerInfo[0]?.first_name && event.providerInfo[0]?.last_name ? (
                                                            <span className="link title" onClick={() => handleProvider(event.providerInfo[0])}>
                                                                {` by ${event.providerInfo[0].first_name} ${event.providerInfo[0].last_name}`}
                                                            </span>
                                                        ) : null}
                                                    </span>
                                                    <span className="tag">
                                                        <b></b> {event.instructions !== '' ? <><strong className="mt-1">Instructions : </strong> {event.instructions} </> : ''}
                                                    </span>
                                                </div>
                                                <div className="second_half">
                                                    <span>Date: {moment(event.createdAt).format("MMMM Do YYYY")}, Time: {moment(event.createdAt).format("LT")}</span>
                                                    <span className="colored">Total = {event.user_amount_calculation?.totalAmountWithTax.toFixed(2)}</span>
                                                    {event.service_status === "pending" && (
                                                        <button className="button primary square" onClick={() => openModal(event)}>Assign Event</button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No bookings found.</p>
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

            {/* Modal component */}
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
                    massage_pressure={selectedEventData.massage_pressure}
                    amount_calculation={selectedEventData.user_amount_calculation}
                />
            )}
        </>
    );
}

export default Event;
