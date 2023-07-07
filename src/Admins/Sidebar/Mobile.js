import React, { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import TodayIcon from '@mui/icons-material/Today';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import MessageIcon from '@mui/icons-material/Message';
import PaidIcon from '@mui/icons-material/Paid';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Groups2Icon from '@mui/icons-material/Groups2';
import LogoutIcon from '@mui/icons-material/Logout';
import HailIcon from '@mui/icons-material/Hail';
import images from "../img/logo.png"
// import { useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Mobile() {
    const [IsOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!IsOpen);


    const logout = () => {
        localStorage.clear()
    }
    return (
        <>
            <div className='mobilemenu'>
                <div className="nav-iconss" >
                    {

                        IsOpen ? <CloseIcon onClick={toggle} /> :
                            <MenuIcon onClick={toggle} />

                    }

                </div>

                <div id="sidebar" className={IsOpen ? "active" : "is_active"} style={{ display: "block" }}>
                    <div className={IsOpen ? "card layer1" : null}>
                        <div className="nav-icon" style={{ color: "#ffff" }}>
                            <CloseIcon onClick={toggle} />
                        </div>
                        <div className="infobox_big avatar" id={IsOpen ? 'avtar' : null}>
                            <img src={images} alt="..." style={{ height: "50px", marginTop: "10px" }} />
                            <div className="items" style={{ marginTop: "5px" }}>
                                <span className="title">admin</span>
                                <span className="excerpt">7654171126</span>

                            </div>
                            <span className="toggle_sidebar close" ></span>
                        </div>
                        <div className="nav" style={{ marginTop: "10px" }}>

                            <div className="items">
                                <Link to="/admin/dashboard">
                                    <DashboardIcon style={{ color: "#fff" }} />
                                    <span className="title">dashboard</span>
                                </Link>
                            </div>
                            <div className="items">
                                <Link to="/admin/events">
                                    <TodayIcon style={{ color: "#fff" }} />
                                    <span className="title">Events</span>
                                </Link>
                            </div>
                            <div className="items">
                                <Link to="/admin/bookings">
                                    <BeenhereIcon style={{ color: "#fff" }} />
                                    <span className="title">bookings</span>
                                </Link>
                            </div>
                            <div className="items">
                                <Link to="/admin/messages">
                                    <MessageIcon style={{ color: "#fff" }} />
                                    <span className="title">messages</span>
                                </Link>
                            </div>
                            <div className="items">
                                <Link to="/admin/payments">
                                    <PaidIcon style={{ color: "#fff" }} />
                                    <span className="title">payemtns</span>
                                </Link>
                            </div>
                            <div className="items">
                                <Link to="/admin/services">
                                    <MedicalServicesIcon style={{ color: "#fff" }} />
                                    <span className="title">services</span>
                                </Link>
                            </div>
                            <div className="items">
                                <Link to="/admin/post">
                                    <MedicalServicesIcon style={{ color: "#fff" }} />
                                    <span className="title">posts</span>
                                </Link>
                            </div>
                            <div className="items">
                                <Link to="/admin/contractors">
                                    <HailIcon style={{ color: "#fff" }} />
                                    <span className="title">contractors</span>
                                </Link>
                            </div>
                            <div className="items">
                                <Link to="/admin/clients">
                                    <Groups2Icon style={{ color: "#fff" }} />
                                    <span className="title">clients</span>
                                </Link>
                            </div>
                            <div className="items">
                                <Link to="/admin/login">
                                    <LogoutIcon style={{ color: "#fff" }} />
                                    <span className="title" onClick={logout}>logout</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Mobile