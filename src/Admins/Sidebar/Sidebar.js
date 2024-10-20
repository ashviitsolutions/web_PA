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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import DiscountIcon from '@mui/icons-material/Discount';
import SpaIcon from '@mui/icons-material/Spa';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PagesIcon from '@mui/icons-material/Pages';

// import { useNavigate } from 'react-router-dom';
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
import Mobile from './Mobile';

function Sidebar() {


  const logout = () => {
    localStorage.removeItem("tokenadmin");
    // localStorage.clear()
  }
  return (
    <>
      <Mobile />
      <div id="sidebar" className='active'>
        <div className="card layer">

          <div className="infobox_big avatar" id='avtar'>
            <img src={images} alt="..." style={{ width: "80%" }} />
            {/* <div className="items" title='' style={{ marginTop: "5px", textAlign: "center" }}>
              <span className="title"></span>


            </div> */}
            <span className="toggle_sidebar close" ></span>
          </div>
          <div className="nav" style={{ marginTop: "30px" }}>

            <div className="items" title='Back to Dashboard'>
              <Link to="/admin">
                <DashboardIcon style={{ color: "#fff" }} />
                <span className="title">Dashboard</span>
              </Link>
            </div>
            <div className="items" title='View the list of completed bookings'>
              <Link to="/admin/events">
                <TodayIcon style={{ color: "#fff" }} />
                <span className="title">Booking Data</span>
              </Link>
            </div>
            {/*  <div className="items" title=''>
              <Link to="/admin/bookings">
                <BeenhereIcon style={{ color: "#fff" }} />
                <span className="title">bookings</span>
              </Link>
  </div> */}

            {/*  <div className="items" title=''>
              <Link to="/admin/messages">
                <MessageIcon style={{ color: "#fff" }} />
                <span className="title">messages</span>
              </Link>
            </div>
           */}
            <div className="items" title='View statement of providers services and their commission'>
              <Link to="/admin/payments">
                <AccountBalanceIcon style={{ color: "#fff" }} />
                <span className="title">Provider's Commission</span>
              </Link>
            </div>
            <div className="items" title='View client purchase history'>
              <Link to="/admin/clients-service-details">
                <Groups2Icon style={{ color: "#fff" }} />
                <span className="title">Purchase History</span>
              </Link>
            </div>
            <div className="items" title='manage blog posts on website'>
              <Link to="/admin/blogs">
                <PagesIcon style={{ color: "#fff" }} />
                <span className="title">Blog &amp; Posts</span>
              </Link>
            </div>
            <div className="items" title='Manage clients'>
              <Link to="/admin/clients">
                <Groups2Icon style={{ color: "#fff" }} />
                <span className="title">List of Clients</span>
              </Link>
            </div>
            <div className="items" title='Manage providers'>
              <Link to="/admin/contractors">
                <HailIcon style={{ color: "#fff" }} />
                <span className="title">List of Providers</span>
              </Link>
            </div>
            <div className="items" title='View history of services served by provider'>
              <Link to="/admin/provider-all-services">
                <HailIcon style={{ color: "#fff" }} />
                <span className="title">Providers Services</span>
              </Link>
            </div>
            <div className="items" title='Manage gift cards'>
              <Link to="/admin/gift">
                <CardGiftcardIcon style={{ color: "#fff" }} />
                <span className="title">Manage Gift Card</span>
              </Link>
            </div>
            <div className="items" title='Manage coupon codes'>
              <Link to="/admin/coupon ">
                <DiscountIcon style={{ color: "#fff" }} />
                <span className="title">Manage Coupon Codes</span>
              </Link>
            </div>
            <div className="items" title='Manage Services'>
              <Link to="/admin/services">
                <SpaIcon style={{ color: "#fff" }} />
                <span className="title">List of Services</span>
              </Link>
            </div>
            <div className="items" title='Manage content on website'>
              <Link to="/admin/post">
                <PostAddIcon style={{ color: "#fff" }} />
                <span className="title">Manage Content</span>
              </Link>
            </div>
            <div className="items" title='click to logout'>
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