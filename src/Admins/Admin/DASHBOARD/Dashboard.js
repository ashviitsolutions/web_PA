import React, { useEffect, useState, useMemo } from 'react'
import { IP } from '../../../Constant';
import image1 from "../../img/massage.png"
import image2 from "../../img/calendar (1).png"
import image3 from "../../img/clock.png"
import image4 from "../../img/pending.png"
import image5 from "../../img/rating.png"
import image6 from "../../img/customer-service.png"
import image7 from "../../img/no-data.png"
import image8 from "../../img/icons8-gift-card-50.png"
import image9 from "../../img/icons8-membership-50.png"
import image10 from "../../img/icons8-feedback-50.png"
import money from "../../img/earn-money.png"
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';



function Dashboard() {
    const nav = useNavigate();
    const [user, setUser] = useState([]);
    const [data, setData] = useState([]);

    const [request, setRequest] = useState([]);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

    const [loading, setLoading] = useState(null);
    const token = localStorage.getItem("tokenadmin");
    console.log(token)



    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                // Add one day to the endDate
                const nextDay = new Date(endDate);
                nextDay.setDate(nextDay.getDate() + 1);

                const res = await fetch(`${IP}/admin/dashboard?startDate=${startDate}&endDate=${nextDay.toISOString().split('T')[0]}`, {
                    method: 'GET',
                    headers: {
                        Authorization: token
                    }
                });
                const data = await res.json();
                setUser(data);
                setData(data);
                setLoading(false)
                console.log("dashboard data", data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [startDate, endDate, token]);



    console.log(data)

    const handleCardClick = (event_status) => {

        nav(`/admin/events`, { state: { event_status, startDate, endDate } });

    };

    const handleVender = (vender_status) => {

        nav(`/admin/contractors`, { state: { vender_status, startDate, endDate } });

    };

    const handleClient = () => {

        nav(`/admin/clients`, { state: { startDate, endDate } });

    };


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

                    <div class="row mb-5">
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
                                                        <span className="icon" style={{ backgroundImage: `url(${money})` }}></span>
                                                        <h3>{user.ProfitAmount ? user.ProfitAmount.toFixed(2) : 0}$</h3>

                                                        <p>Net Profit</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-3" onClick={handleClient} >
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image5})` }}></span>
                                                        <h3>{user.total_clients}</h3>
                                                        <p>New Clients</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3" onClick={() => handleVender('Newly registered')}>
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

                                            <div className="col-sm-3" onClick={() => handleCardClick('pending')}>
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image1})` }}></span>
                                                        <h3>{user.total_pending_bookings}</h3>
                                                        <p>New Request</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3" onClick={() => handleCardClick('scheduled')}>
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image3})` }}></span>
                                                        <h3>{user.total_scheduled_bookings
                                                        }</h3>
                                                        <p>Attended</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3" onClick={() => handleCardClick('completed')}>
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image2})` }}></span>
                                                        <h3>{user.total_bookings}</h3>
                                                        <p>Total Bookings</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3" onClick={() => handleCardClick('completed')}>
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image7})` }}></span>
                                                        <h3>{user.total_completed_bookings}</h3>
                                                        <p>Checkout</p>
                                                    </div>
                                                </div>
                                            </div>






                                            <div className="col-sm-4" onClick={handleClient}>
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image8})` }}></span>
                                                        <h3>{user.total_pending_bookings}</h3>
                                                        <p>New Gift card</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4" onClick={handleClient}>
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image9})` }}></span>
                                                        <h3>{user.total_scheduled_bookings
                                                        }</h3>
                                                        <p>New memberhsip</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4" onClick={handleClient}>
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image10})` }}></span>
                                                        <h3>{user.total_bookings}</h3>
                                                        <p>New Feedbacks</p>
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

        </>
    )
}

export default Dashboard
