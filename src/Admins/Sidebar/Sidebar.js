import React from 'react'
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
import images from "../../Components/assets/img/logo_home_navbar.png"

// import { useNavigate } from 'react-router-dom';
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
import Mobile from './Mobile';

function Sidebar() {


  const logout = () => {
    localStorage.clear()
  }
  return (
    <>
      <Mobile />
      <div id="sidebar" className='active'>
        <div className="card layer">

          <div className="infobox_big avatar" id='avtar'>
            <img src={images} alt="..." style={{ height: "50px" }} />
            <div className="items" style={{ marginTop: "5px", textAlign: "center" }}>
              <span className="title">admin</span>


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
                <span className="title">Bookings</span>
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
                <PaidIcon style={{ color: "#fff" }} />
                <span className="title">Statement</span>
              </Link>
            </div>
            <div className="items">
              <Link to="/admin/gift">
                <PaidIcon style={{ color: "#fff" }} />
                <span className="title">Gift Card</span>
              </Link>
            </div>
            <div className="items">
              <Link to="/admin/coupon ">
                <PaidIcon style={{ color: "#fff" }} />
                <span className="title">Coupon</span>
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
              <Link to="/admin/blogs">
                <MedicalServicesIcon style={{ color: "#fff" }} />
                <span className="title">Blogs</span>
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

    </>
  )
}

export default Sidebar