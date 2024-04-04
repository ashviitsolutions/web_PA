import React, { useEffect, useState, useMemo } from 'react'
import { IP } from '../../../Constant';
import image1 from "../../img/massage.png"
import image2 from "../../img/calendar (1).png"
import image3 from "../../img/clock.png"
import image4 from "../../img/pending.png"
import image5 from "../../img/rating.png"
import image6 from "../../img/customer-service.png"
import image7 from "../../img/no-data.png"

function Dashboard() {
    const [user, setUser] = useState([]);
    const [data, setData] = useState([]);

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
    const token = localStorage.getItem("tokenadmin");
    console.log(token)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${IP}/admin/dashboard`, {
                    method: 'GET',
                    headers: {
                        // 'Authorization': `Bearer ${token}`
                        Authorization: token
                    }
                });
                const data = await res.json();
                setUser(data);
                setData(data.recent_pending_bookings)
                console.log("dashboard data", data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    console.log(data)

    return (
        <>
            <div id='content'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="">
                            <div className="headings">
                                <h3>Dashboard</h3>
                                <span className="toggle_sidebar" ></span>
                            </div>
                        </div>
                    </div>

                    {/*   <div class="row mb-5">
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

                            </div>
                        </div>
                    </div>
    */}

                    <div className="row">

                        <div className="header_dashbord">
                            <div className='content_dashboard'>
                                <h5>Finance</h5>
                            </div>
                            <div className='content_dashboard'>
                                <h5>Registration</h5>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="container-fluid">


                                <div className="summary_collections">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image4})` }}></span>

                                                        <h3>{user.totalAdminPrice ? user.totalAdminPrice.toFixed(2) : 0}$</h3>

                                                        <p>Total Sale</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image4})` }}></span>
                                                        <h3>{user.ProfitAmount ? user.ProfitAmount.toFixed(2) : 0}$</h3>

                                                        <p>Net Profit</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-3">
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image5})` }}></span>
                                                        <h3>{user.total_clients}</h3>
                                                        <p>Total Clients</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image5})` }}></span>
                                                        <h3>{user.total_providers}</h3>
                                                        <p>New Providers</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>




                                        <div className="row">
                                            <div className='text-center mt-3 '>
                                                <h5>Services</h5>
                                            </div>

                                            <div className="col-sm-3">
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image1})` }}></span>
                                                        <h3>{user.total_pending_bookings}</h3>
                                                        <p>Total Request</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image3})` }}></span>
                                                        <h3>{user.total_scheduled_bookings
                                                        }</h3>
                                                        <p>Attended</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image2})` }}></span>
                                                        <h3>{user.total_bookings}</h3>
                                                        <p>Total Bookings</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image7})` }}></span>
                                                        <h3>{user.total_completed_bookings}</h3>
                                                        <p>Checkout</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>




                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard
