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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import DiscountIcon from '@mui/icons-material/Discount';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PagesIcon from '@mui/icons-material/Pages';
import SpaIcon from '@mui/icons-material/Spa';

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
                        <div className="infobox_big avatar" id='avtar'>
                            <img src={images} alt="..." style={{ height: "50px" }} />
                            <div className="items" style={{ marginTop: "5px", textAlign: "center" }}>
                                <span className="title">admin</span>


                            </div>
                            <span className="toggle_sidebar close" ></span>
                        </div>
                        <div className="nav" style={{ marginTop: "30px" }}>

                        <div className="items">
                          <Link to="/admin">
                            <DashboardIcon style={{ color: "#fff" }} />
                            <span className="title">Dashboard</span>
                          </Link>
                        </div>
                        <div className="items">
                          <Link to="/admin/events">
                            <TodayIcon style={{ color: "#fff" }} />
                            <span className="title" title='view client bookings'>Completed Bookings</span>
                          </Link>
                        </div>
                        {/*  <div className="items">
                          <Link to="/admin/bookings">
                            <BeenhereIcon style={{ color: "#fff" }} />
                            <span className="title">bookings</span>
                          </Link>
              </div> */}
            
                        {/*  <div className="items">
                          <Link to="/admin/messages">
                            <MessageIcon style={{ color: "#fff" }} />
                            <span className="title">messages</span>
                          </Link>
                        </div>
                       */}
                        <div className="items">
                          <Link to="/admin/payments">
                            <AccountBalanceIcon style={{ color: "#fff" }} />
                            <span className="title" title='view statement of providers'>Provider's Statements</span>
                          </Link>
                        </div>
                        <div className="items">
                          <Link to="/admin/clients-service-details">
                            <Groups2Icon style={{ color: "#fff" }} />
                            <span className="title">Purchase History</span>
                          </Link>
                        </div>
                        <div className="items">
                          <Link to="/admin/blogs">
                            <PagesIcon style={{ color: "#fff" }} />
                            <span className="title">Blog &amp; Posts</span>
                          </Link>
                        </div>
                        <div className="items">
                          <Link to="/admin/clients">
                            <Groups2Icon style={{ color: "#fff" }} />
                            <span className="title">List of Clients</span>
                          </Link>
                        </div>
                        <div className="items">
                          <Link to="/admin/contractors">
                            <HailIcon style={{ color: "#fff" }} />
                            <span className="title">List of Providers</span>
                          </Link>
                        </div>
                        <div className="items">
                          <Link to="/admin/provider-all-services">
                            <HailIcon style={{ color: "#fff" }} />
                            <span className="title">Providers Services</span>
                          </Link>
                        </div>
                        <div className="items">
                          <Link to="/admin/gift">
                            <CardGiftcardIcon style={{ color: "#fff" }} />
                            <span className="title">Manage Gift Card</span>
                          </Link>
                        </div>
                        <div className="items">
                          <Link to="/admin/coupon ">
                            <DiscountIcon style={{ color: "#fff" }} />
                            <span className="title">Manage Coupon Codes</span>
                          </Link>
                        </div>
                        <div className="items">
                          <Link to="/admin/services">
                            <SpaIcon style={{ color: "#fff" }} />
                            <span className="title">List of Services</span>
                          </Link>
                        </div>
                        <div className="items">
                          <Link to="/admin/post">
                            <PostAddIcon style={{ color: "#fff" }} />
                            <span className="title">Manage Content</span>
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