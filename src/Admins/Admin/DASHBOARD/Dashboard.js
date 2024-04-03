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



                    <div className="row">
                        <div className="">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="gutter">
                                            <div className="card dash_card layer2">
                                                <div className="content">
                                                    <span className="head">Total Services</span>
                                                    <span className="value">100</span>
                                                </div>
                                                <span className="icon" style={{ backgroundImage: `url(${image1})` }}></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="gutter">
                                            <div className="card dash_card layer2">
                                                <div className="content">
                                                    <span className="head">Today Total payments</span>
                                                    <span className="value">{user.todays_total_payment}</span>
                                                </div>
                                                <span className="icon" style={{ backgroundImage: `url(${image2})` }}></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="gutter">
                                            <div className="card dash_card layer2">
                                                <div className="content">
                                                    <span className="head">Total Sale</span>
                                                    <span className="value">$3879</span>
                                                </div>
                                                <span className="icon" style={{ backgroundImage: `url(${image3})` }}></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="gutter">
                                            <div className="card dash_card layer2">
                                                <div className="content">
                                                    <span className="head">Net Profit</span>
                                                    <span className="value">$3879</span>
                                                </div>
                                                <span className="icon" style={{ backgroundImage: `url(${image4})` }}></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>














                    <div className="row">
                        <div className='text-center mt-3 '>
                            <h5>Registration</h5>
                        </div>
                        <div className="col-sm-12">
                            <div className="container-fluid">


                                <div className="summary_collections">
                                    <div className="container-fluid">
                                        <div className="row">
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
                                                        <span className="icon" style={{ backgroundImage: `url(${image6})` }}></span>
                                                        <h3>{user.total_bookings_today
                                                        }</h3>
                                                        <p>Total Providers</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-3">
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image7})` }}></span>
                                                        <h3>6</h3>
                                                        <p>Provides Request </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image7})` }}></span>
                                                        <h3>6</h3>
                                                        <p>Net Profit</p>
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
                                                        <span className="icon" style={{ backgroundImage: `url(${image5})` }}></span>
                                                        <h3>{user.total_completed_bookings_today}</h3>
                                                        <p>Total Request</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image6})` }}></span>
                                                        <h3>{user.total_pending_bookings
                                                        }</h3>
                                                        <p>Attended</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image7})` }}></span>
                                                        <h3>{user.total_pending_bookings_today}</h3>
                                                        <p>Unassigned</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image7})` }}></span>
                                                        <h3>{user.total_pending_bookings_today}</h3>
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
