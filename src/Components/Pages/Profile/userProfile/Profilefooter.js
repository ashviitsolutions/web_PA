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


const Profilefooter = () => {
    const [activeTab, setActiveTab] = useState(1);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    const nav = useNavigate();




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


        <div id="user_profile_page">


            <div className="">

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
            </div>
        </div>

    );
};

export default Profilefooter;
