import React, { useEffect, useState, useMemo } from 'react'
import { IP } from '../../../Constant';
import image1 from "../../img/massage.png"
import image2 from "../../img/calendar (1).png"
import image3 from "../../img/clock.png"
import image4 from "../../img/pending.png"
import image5 from "../../img/rating.png"
import image7 from "../../img/no-data.png"
import image8 from "../../img/gift-card.png"
import image9 from "../../img/member-card.png"
import image10 from "../../img/feedback.png"
import money from "../../img/earn-money.png"
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from "../../../Components/Pages/Redux/counterSlice";



function Dashboard() {

    const Startdate = localStorage.getItem("startDate")
    const Enddate = localStorage.getItem("endDate")

    const [startDate, setStartDate] = useState(Startdate || moment().subtract(7, 'day').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(Enddate || moment().format('YYYY-MM-DD'));


    const nav = useNavigate();
    // const [admin_wallet, setadmin_wallet] = useState([]);
    const dispatch = useDispatch();
    const formData = useSelector((state) => state?.counter?.formData);
    const admin_wallet = formData.admin_finance && formData.admin_finance[0] ? formData.admin_finance[0] : "";


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
                console.log("data dashbaord", data)
                dispatch(updateInputData({ formName: 'admin_finance', inputData: data }));
                setLoading(false)
                console.log("dashboard data", data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [startDate, endDate, token]);

    console.log("dashboard full data", admin_wallet)




    useEffect(() => {
        localStorage.setItem("startDate", startDate);
        localStorage.setItem("endDate", endDate);
    }, [startDate, endDate]);

    useEffect(() => {
        const today = moment().format('YYYY-MM-DD');
        setStartDate(moment(today).subtract(7, 'day').format('YYYY-MM-DD'));
        setEndDate(today);

    }, []); // Empty dependency array means this effect will only run once after the initial render



    const handleCardClick = (event_status) => {

        nav(`/admin/events`, { state: { event_status, startDate, endDate } });

    };


    const handleCardClient = (event_status) => {

        // nav(`/admin/${event_status},{ state: {startDate, endDate } }`);
        nav(`/admin/${event_status}`, { state: { startDate, endDate } });

    };

    const handleVender = (vender_status) => {

        nav(`/admin/contractors`, { state: { vender_status, startDate, endDate } });

    };

    const handleClient = () => {

        nav(`/admin/clients`, { state: { startDate, endDate } });

    };

    useEffect(() => {

        setStartDate(startDate);
        setEndDate(endDate);
    }, [startDate, endDate]);





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
                                            <div className="col-sm-3 link" onClick={() => handleCardClient('all-statement')}>
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image4})` }}></span>

                                                        <h3>{(admin_wallet?.totalSellAmount)?.toFixed(2)}$</h3>

                                                        <p>Total Sale</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3 link" onClick={() => handleCardClient('all-statement')}>
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${money})` }}></span>
                                                        <h3>{(admin_wallet?.ProfitAmount)?.toFixed(2)}$</h3>

                                                        <p>Net Profit</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-3 link" onClick={handleClient} >
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image5})` }}></span>
                                                        <h3>{admin_wallet.total_clients}</h3>
                                                        <p>New Clients</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3 link" onClick={() => handleVender('Newly registered')}>
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image5})` }}></span>
                                                        <h3>{admin_wallet.total_providers}</h3>
                                                        <p>New Providers</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>




                                        <div className="row">
                                            <div className='text-center mt-3 '>
                                                <h5>Services</h5>
                                            </div>

                                            <div className="col-sm-3 link" onClick={() => handleCardClick('pending')}>
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image1})` }}></span>
                                                        <h3>{admin_wallet.total_pending_bookings}</h3>
                                                        <p>New Request</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3 link" onClick={() => handleCardClick('scheduled')}>
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image3})` }}></span>
                                                        <h3>{admin_wallet.total_scheduled_bookings
                                                        }</h3>
                                                        <p>Scheduled</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3 link" onClick={() => handleCardClick('')}>
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image2})` }}></span>
                                                        <h3>{admin_wallet.total_bookings}</h3>
                                                        <p>Total Bookings</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3 link" onClick={() => handleCardClick('completed')}>
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image7})` }}></span>
                                                        <h3>{admin_wallet.total_completed_bookings}</h3>
                                                        <p>completed</p>
                                                        <p>Total Profit: {admin_wallet?.totalBookingProfit}$</p>
                                                    </div>
                                                </div>
                                            </div>






                                            <div className="col-sm-4 link" onClick={() => handleCardClient('gift-all')}>
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image8})` }}></span>
                                                        <p>New Gift card</p>
                                                        <p>Total Profit: {admin_wallet?.total_giftcards}</p>
                                                        <p>Total Profit: {admin_wallet?.total_giftcard_amount}$</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 link" onClick={() => handleCardClient('memberhsip-all')}>
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image9})` }}></span>
                                                        <h3>{admin_wallet.total_memberships}</h3>
                                                        <p>New Memberhsips</p>
                                                        <p>Total Profit: {admin_wallet?.total_membership_amount}$</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 link" onClick={() => handleCardClient('review')}>
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image10})` }}></span>
                                                        <h3>{admin_wallet.providerReviewsCount}</h3>
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
