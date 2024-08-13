import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import bookingimage from "../../../img/plus.png";


import "./Profile.css";

import menuimage from "../../../assets/img/close.png";
import menucross from "../../../assets/img/menu.png";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightFromBracket,
    faBell,
    faBorderAll,
    faCalendarDays,
    faFileContract,
    faGift,
    faHeadset,
    faHeart,
    faIdBadge,
    faMoneyCheckDollar,
    faRectangleXmark,
    faSpa,
} from "@fortawesome/free-solid-svg-icons";


const Sidebar = () => {
    const [activeTab, setActiveTab] = useState(1);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    const nav = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        // localStorage.clear();
        nav("/");
    };



    const handleSidebarToggle = () => {
        setIsSidebarOpen((prevState) => !prevState);
    };
    // const toggleLinks = () => {
    //   setIsActive((prevState) => !prevState);
    // };
    const handleBook = () => {
        nav("/select_location");
    };
    const navigate = useNavigate();
    return (
        <div className="parent">
            <div className={`sidebar_tab ${isSidebarOpen && "mobile-view"}`}>
                <div className="">
                    <ul id="tabs_control">
                        <Link to="/userProfile">
                            <li
                                id="tab_1"
                                className={activeTab === 1 && "active"}
                                onClick={() => setActiveTab(1)}
                            >

                                <div className="item" onClick={handleSidebarToggle}>

                                    <FontAwesomeIcon
                                        icon={faBorderAll}
                                        style={{ marginRight: 10 }}
                                    />
                                    Overview
                                </div>


                            </li>
                        </Link>
                        <Link to="/userProfile/bookinghistory">
                            <li
                                id="tab_2"
                                className={activeTab === 2 ? "active" : ""}
                                onClick={() => setActiveTab(2)}
                            >
                                <div className="item" onClick={handleSidebarToggle}>

                                    <FontAwesomeIcon
                                        icon={faCalendarDays}
                                        style={{ marginRight: 10 }}
                                    />
                                    Reservations
                                </div>
                            </li>
                        </Link>
                        <Link to="/userProfile/membership">
                            <li
                                id="tab_4"
                                className={activeTab === 4 ? "active" : ""}
                                onClick={() => setActiveTab(4)}
                            >
                                <div className="item" onClick={handleSidebarToggle}>

                                    <FontAwesomeIcon
                                        icon={faMoneyCheckDollar}
                                        style={{ marginRight: 10 }}
                                    />
                                    Membership
                                </div>
                            </li>
                        </Link>
                        <Link to="/userProfile/usergift">
                            <li
                                id="tab_5"
                                className={activeTab === 5 ? "active" : ""}
                                onClick={() => setActiveTab(5)}
                            >
                                <div className="item" onClick={handleSidebarToggle}>

                                    <FontAwesomeIcon
                                        icon={faGift}
                                        size={15}
                                        style={{ marginRight: 10 }}
                                    />
                                    Gift Card
                                </div>
                            </li>
                        </Link>
                        <Link to="/userProfile/profile">
                            <li
                                id="tab_6"
                                className={activeTab === 6 ? "active" : ""}
                                onClick={() => setActiveTab(6)}
                            >
                                <div className="item" onClick={handleSidebarToggle}>

                                    <FontAwesomeIcon icon={faIdBadge} style={{ marginRight: 10 }} />
                                    Profile
                                </div>
                            </li>
                        </Link>
                        <Link to="/userProfile/notification">
                            <li
                                id=""
                                className={activeTab === 8 ? "active" : ""}
                                onClick={() => setActiveTab(8)}
                            >
                                <div className="item" onClick={handleSidebarToggle}>

                                    <FontAwesomeIcon icon={faBell} style={{ marginRight: 10 }} />
                                    Notifications
                                </div>
                            </li>
                        </Link>
                        <Link to="/userProfile/favorites">
                            <li
                                id=""
                                className={activeTab === 9 ? "active" : ""}
                                onClick={() => setActiveTab(9)}
                            >
                                <div className="item" onClick={handleSidebarToggle}>

                                    <FontAwesomeIcon icon={faHeart} style={{ marginRight: 10 }} />
                                    Favorites
                                </div>
                            </li>
                        </Link>
                        <Link to="/userProfile/support">
                            <li
                                id=""
                                className={activeTab === 10 ? "active" : ""}
                                onClick={() => setActiveTab(10)}
                            >
                                <div className="item" onClick={handleSidebarToggle}>

                                    <FontAwesomeIcon icon={faHeadset} style={{ marginRight: 10 }} />
                                    Support
                                </div>
                            </li>
                        </Link>
                        <li id="tab_7" className={activeTab === 7 ? "active" : ""}>
                            <div className="item" onClick={handleLogout}>

                                <FontAwesomeIcon
                                    icon={faArrowRightFromBracket}
                                    style={{ marginRight: 10 }}
                                />
                                Logout
                            </div>
                        </li>

                        <div className="userbooking">
                            <li id="tab_7">
                                <div className="item" onClick={handleBook}>

                                    <FontAwesomeIcon icon={faSpa} style={{ marginRight: 10 }} />
                                    Book now
                                </div>
                            </li>
                        </div>
                    </ul>
                    <div id="navigationuser">
                        <div className="toggle_buttons" onClick={handleSidebarToggle}>
                            {isSidebarOpen ? (
                                <img src={menuimage} alt="Close" className="toggleimages" />
                            ) : (
                                <img src={menucross} alt="Menu" className="toggleimages" />
                            )}
                        </div>
                    </div>
                </div>
                <div
                    className="
        "
                >

                </div>
            </div>

            {/*Booking Image */}

            <div id="imagebooking">
                <img
                    width={40}
                    height={40}
                    src={bookingimage}
                    alt=""
                    style={{
                        borderRadius: "100%",
                        display: "block",
                        boxShadow: "4px 4px 4px 0px rgb(6 77 109)", // Correct syntax
                    }}
                    className="profileiconimage"
                    onClick={() => nav("/guest_login")}
                />
            </div>
            {/* Toggle button for mobile view */}

            {/*  <div className="progressbar_userpannel profileSpace">

                <div className="user_profile_footer">
                    <div className="footer_container">
                        <div className="footer_warapper">
                            <p className="vsmall">Copyright © 2021 productive alliance, All Rights Reserved. <span className="cursor" onClick={() => navigate("/cancelationpolicy")}>Cancellation Policy.</span> <span className="cursor" onClick={() => navigate("/termcondition")}>Terms and conditions.</span></p>
                        </div>
                        <div className="footer_warapper">
                            <p id="ashvi_design" className="vsmall">A design by Ashvi IT solution</p>
                        </div>
                    </div>
                </div>
                </div> */}
        </div>
    );
};

export default Sidebar;
