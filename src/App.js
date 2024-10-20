import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Navbar from './Components/Header/Navbar';
import Home from './Components/Pages/Home/Home';
import Footer from './Components/Pages/Footer/Footer';
import Service from './Components/Pages/Services/Service';
import MessageDemand from './Components/Pages/Services/Submenu/Message/MessageDemand';
import CorporateEvents from './Components/Pages/Services/Submenu/Coroporate/Corporate_Events';
import PrivateEvents from './Components/Pages/Services/Submenu/PrivateEvents/PrivateService';
import About from './Components/Pages/About/About';
import Contact from './Components/Pages/Contact/Contact';
import Login from './Components/Pages/Login/Login';
import Sinup from './Components/Pages/Sinup/Sinup';
import GuestLogin from './Components/Pages/Guest_login/GuestLogin';
import Gift from './Components/Pages/Gift/Gift';
import SelectLocation from './Components/Pages/Guest_login/GuesMenu/Location';
import Membership from './Components/Pages/Membership/Membership';
import Providers from "./Components/Pages/Provider/Provider"
import store from "./Components/Pages/Redux/store"
import { Provider } from 'react-redux';
import Select_location from './Components/Pages/Guest_login/Guest/Select_location';
import Book from './Components/Pages/Guest_login/GuesMenu/Book';
import Conform from './Components/Pages/Guest_login/GuesMenu/Conform';

import Protectuser from './Components/Pages/Protected/Protectuser';
import UserRoutes from './Components/Pages/Protected/UserRoutes';
import Corporatebooking from './Components/Pages/Services/Submenu/Coroporate/Corporatebooking';
import Privacypolicy from './Components/Pages/Policy/Privacypolicy';
import Termcondition from './Components/Pages/Policy/Termcondition';
import Agreemnet from './Components/Pages/Policy/Agreemnet';
import Reset_password from './Components/Pages/Reset_password/Reset_password';
import Servicecontract from './Components/Pages/Policy/Servicecontract';
import Serviceprovider from './Components/Pages/Policy/Serviceprovider';
import Goldmembership from './Components/Pages/Policy/Goldmembership';
import Cancelationpolicy from './Components/Pages/Policy/Cancelationpolicy';
import Silvermembership from './Components/Pages/Policy/Silvermembership';
import Chatbot from './Components/Header/Chatbot';
import Response from './Components/Pages/Profile/userProfile/Response/Response';
import Release from './Admins/Admin/PAYMENT/Release';

//profile page
import Overview from './Components/Pages/Profile/userProfile/Overview';
import userBooking from './Components/Pages/Profile/userProfile/Booking';
import userMembership from './Components/Pages/Profile/userProfile/Membership';
import Favorites from './Components/Pages/Profile/userProfile/Favorites';
import Support from './Components/Pages/Profile/userProfile/Support';

import userGift from './Components/Pages/Profile/userProfile/Gift';
import Notifications from './Components/Pages/Profile/userProfile/Notifications';
import Sidebaruser from './Components/Pages/Profile/userProfile/Sidebar';
import Profilefooter from './Components/Pages/Profile/userProfile/Profilefooter';



//Payment
import Successpayment from "./Components/Pages/Payment/Success"

//admin pannel
import Sidebar from "./Admins/Sidebar/Sidebar";
import GetGidt from "./Admins/Admin/GIFT/GetGidt";
import AddGift from "./Admins/Admin/GIFT/AddGift"
import EditGift from "./Admins/Admin/GIFT/EditGift"

import AddCoupon from './Admins/Admin/Coupon/AddCoupon ';
import GetCoupon from './Admins/Admin/Coupon/GetCoupon';
import EditCoupon from './Admins/Admin/Coupon/EditCoupon';
import Giftcard from './Admins/Admin/Alldata/Giftcard';
import Memberhsip from './Admins/Admin/Alldata/Memberhsip';
//Blogs section

import Blogs from './Admins/Admin/Blogs/Blogs';

// 1.Post section
import Addpost from './Admins/Admin/POST/Addpost';
import Editpost from './Admins/Admin/POST/Editpost';
import Getpost from './Admins/Admin/POST/Getpost';

// 2.Login section
import LoginPage from './Admins/Admin/PAGES/LOGIN/Login';
import Protect from './Admins/Admin/PAGES/Protected/Protect';
import Errorpage from './Admins/Admin/PAGES/Error404/Errorpage';

// 3.service section
import getService from './Admins/Admin/Service/GetPost';
import AddPostService from "./Admins/Admin/Service/AddPost"
import EditPostService from './Admins/Admin/Service/EditPost';

//4.clients section
import Clients from './Admins/Admin/Client/Clients';
import AddClient from './Admins/Admin/Client/AddClient';
import EditClient from './Admins/Admin/Client/EditClient';
// contractors
import Contractors from './Admins/Admin/CONTRACTORS/Contractors';
import AddContractors from './Admins/Admin/CONTRACTORS/AddContractors';
import ViewContractor from './Admins/Admin/CONTRACTORS/ViewContractor';
import ViewServices from './Admins/Admin/Client/ViewServices';

//Pyments
import Payments from './Admins/Admin/PAYMENT/Payments';
import Booking from './Admins/Admin/BOOKING/Booking';
import Event from './Admins/Admin/EVENT/Event';
import Message from './Admins/Admin/MESSAGE/Message';


import Details from './Admins/Admin/PAYMENT/Details';

//Dashboard
import Dashboard from './Admins/Admin/DASHBOARD/Dashboard';


//Provide pannel
import NavBarProvide from './PROVIDER/components/navbar';
import DashboardProvider from './PROVIDER/layouts/dashboard';
import ApplicationForm from './PROVIDER/layouts/ApplicationForm';
import Earnings from './PROVIDER/layouts/Earnings';
import Profile from './PROVIDER/layouts/Profile';
import ScheduledRequests from './PROVIDER/layouts/ScheduledEvents';
import PersonalSettings from './PROVIDER/layouts/PersonalSettings';
import Events from './PROVIDER/layouts/Events';
import Services from './PROVIDER/layouts/Services';
import SideBarprovider from './PROVIDER/components/SideBar';
import Loginprovider from './PROVIDER/components/Login/Login';
import Callstatus from './PROVIDER/layouts/Callstatus';
import Listprovider from './Components/Pages/Guest_login/Providerlocation/Listprovider';
//protected routed
import Protected from './PROVIDER/ProtectedRute/Protected';
import Logout from './PROVIDER/components/Logout';
import Notification from './PROVIDER/layouts/Notification';
// BlogDetals 
import Blogpage from './Components/Pages/Blog/Blogpage';
import Detailblog from './Components/Pages/Blog/Detailblog';
import Faq from './Components/Pages/FAQ/Faq';
import Addblog from './Admins/Admin/Blogs/Addblog';
import Editblog from './Admins/Admin/Blogs/Editblog';
import Failed from './Components/Pages/Profile/userProfile/Response/Failed';
import Setting from './Components/Pages/Profile/userProfile/Setting';
import Review from './Admins/Admin/Alldata/Review';
import Statemement from './Admins/Admin/Alldata/Statemement';
import Providerservices from './Admins/Admin/CONTRACTORS/Providerservices';
import DetailService from './Admins/Admin/CONTRACTORS/DetailService';
import ReviewPage from './Components/Pages/Profile/userProfile/Review';


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


function App() {
  const nav = useNavigate()
  const token = localStorage.getItem("token")
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [nav]);

  // // Get the current time in milliseconds
  // const currentTime = new Date().getTime();

  // // Check if a time stamp already exists in localStorage
  // const storedTime = localStorage.getItem('storedTime');

  // if (storedTime) {
  //   // If a time stamp exists, check if it's been 20 hours
  //   const timeDifference = currentTime - parseInt(storedTime);
  //   const hoursDifference = timeDifference / (1000 * 60 * 60);

  //   if (hoursDifference >= 12) {
  //     // If 20 hours have passed, clear localStorage and set a new time stamp
  //     // localStorage.clear();
  //     localStorage.setItem('storedTime', currentTime.toString());
  //   }
  // } else {
  //   // If no time stamp exists, set one
  //   localStorage.setItem('storedTime', currentTime.toString());
  // }

  // Redirect if no token
  useEffect(() => {
    if (!token) {
      nav("/");  // Redirect to login/homepage
    }
  }, [token]); // Run only when token or nav changes

  useEffect(() => {
    const logOutUser = () => {
      localStorage.clear(); // Clear local storage
      nav("/"); // Redirect to login/homepage
      alert("User logged out due to inactivity");
      console.log("User logged out due to inactivity");
    };

    // Set timeout for 30 minutes
    let timeoutId = setTimeout(logOutUser, 30 * 60 * 1000);

    // Reset the timeout on user activity
    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(logOutUser, 30 * 60 * 1000); // Reset the timeout to 30 minutes
    };

    // Add event listeners to track user activity
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keypress", resetTimeout);
    window.addEventListener("click", resetTimeout);
    window.addEventListener("scroll", resetTimeout);

    // Cleanup function to remove the timeout and event listeners
    return () => {
      clearTimeout(timeoutId); // Clear the timeout on component unmount
      window.removeEventListener("mousemove", resetTimeout);
      window.removeEventListener("keypress", resetTimeout);
      window.removeEventListener("click", resetTimeout);
      window.removeEventListener("scroll", resetTimeout);
    };
  }, [nav]); // Dependency on nav ensures it updates correctly if navigation changes

  return (
    <>

      <Provider store={store}>
        <ScrollToTop />
        <Routes>

          <Route path="/" element={<>
            <Chatbot />
            <Navbar />
            <Home />
            <Footer />
          </>} />
          <Route path="/privacypolicy" element={<>

            <Privacypolicy />

          </>} />

          <Route path="/goldmembership" element={<>

            <Goldmembership />

          </>} />

          <Route path="/silvermembership" element={<>

            <Silvermembership />

          </>} />
          <Route path="/cancelationpolicy" element={<>

            <Cancelationpolicy />

          </>} />

          <Route path="/termcondition" element={<>

            <Termcondition />

          </>} />

          <Route path="/reset_password/:tokenid" element={<>
            <Navbar />
            <Reset_password />
            <Footer />
          </>} />

          <Route path="/agreemnet" element={<>

            <Agreemnet />

          </>} />

          <Route path="/servicecontract" element={<>

            <Servicecontract />

          </>} />
          <Route path="/serviceprovider" element={<>

            <Serviceprovider />

          </>} />

          <Route path="/services" element={<>
            <Navbar />
            <Service />
            <Footer />
          </>} />
          <Route path="/services/massage_on_demand" element={<>
            <Navbar />
            <MessageDemand />
            <Footer />
          </>} />
          <Route path="/services/corporate_events" element={<>
            <Navbar />
            <CorporateEvents />
            <Footer />
          </>} />
          <Route path="/services/corporate_events/booking/:service_id" element={<>
            <Navbar />
            <Corporatebooking />
            <Footer />
          </>} />
          <Route path="/services/private_events" element={<>
            <Navbar />
            <PrivateEvents />
            <Footer />
          </>} />
          <Route path="/about" element={<>
            <Navbar />
            <About />
            <Footer />
          </>} />
          <Route path="/contact" element={<>
            <Navbar />
            <Contact />
            <Footer />
          </>} />
          <Route path="/become_member" element={<>
            <Navbar />
            <Membership />
            <Footer />
          </>} />
          <Route path="/become_provider" element={<>
            <Navbar />
            <Providers />
            <Footer />
          </>} />
          <Route path="/login" element={<>
            <Navbar />
            <Login />
            <Footer />
          </>} />
          <Route path="/sign_up" element={<>
            <Navbar />
            <Sinup />
            <Footer />
          </>} />
          <Route path="/select_location" element={<>

            <Protectuser Component={SelectLocation} />


          </>} />
          <Route path="/guest_login" element={<>
            <Navbar />
            <GuestLogin />
            <Footer />
          </>} />

          <Route path="/select_location_type" element={<>

            <Select_location />


          </>} />

          //user profile


          <Route path="/userProfile" element={<>
            <Navbar />
            <Sidebaruser />
            <UserRoutes Component={Overview} />
            <Profilefooter />

          </>} />
          <Route path="/userProfile/notification" element={<>
            <Navbar />
            <Sidebaruser />
            <UserRoutes Component={Notifications} />
            <Profilefooter />

          </>} />
          <Route path="/userProfile/profile" element={<>
            <Navbar />
            <Sidebaruser />
            <UserRoutes Component={Setting} />
            <Profilefooter />

          </>} />
          <Route path="/userProfile/bookinghistory" element={<>
            <Navbar />
            <Sidebaruser />
            <UserRoutes Component={userBooking} />
            <Profilefooter />

          </>} />
          <Route path="/userProfile/membership" element={<>
            <Navbar />
            <Sidebaruser />
            <UserRoutes Component={userMembership} />
            <Profilefooter />

          </>} />
          <Route path="/userProfile/favorites" element={<>
            <Navbar />
            <Sidebaruser />
            <UserRoutes Component={Favorites} />
            <Profilefooter />

          </>} />
          <Route path="/userProfile/support" element={<>
            <Navbar />
            <Sidebaruser />
            <UserRoutes Component={Support} />
            <Profilefooter />

          </>} />
          <Route path="/userProfile/usergift" element={<>
            <Navbar />
            <Sidebaruser />
            <UserRoutes Component={userGift} />
            <Profilefooter />

          </>} />

          <Route path="/Book" element={<>

            <Book />

          </>} />

          <Route path="/book/:provider_id" element={<>
            <Navbar />
            <Book />
            <Footer />
          </>} />
          <Route path="/Book/:userId/:totalPrice" element={<>
            <Navbar />
            <Conform />
            <Footer />
          </>} />
          <Route path="/userProfile/payment/success" element={<>
            <Successpayment />
          </>} />



          <Route path="/giftcard" element={<>
            <Navbar />
            <Gift />
            <Footer />
          </>} />


          <Route path="/blogpage/:id" element={<>
            <Navbar />
            <Blogpage />
            <Footer />
          </>} />

          <Route path="/blogpage" element={<>
            <Navbar />
            <Blogpage />
            <Footer />
          </>} />
          <Route path="/detailblog/:id" element={<>
            <Navbar />
            <Detailblog />
            <Footer />
          </>} />


          <Route path="/faqpage" element={<>
            <Navbar />
            <Faq />
            <Footer />
          </>} />

          <Route path="/listofprovider" element={<>

            <Navbar />
            <Listprovider />
            <Footer />

          </>} />

          <Route
            // path="/membership/:userId/:membershipType/:renewalDate"
            path="/membership"
            element={
              <>
                <Navbar />
                <Response />
                <Footer />
              </>
            }
          />


          <Route
            path="/userProfile/payment/cancel"
            element={
              <>
                <Navbar />
                <Failed />
                <Footer />
              </>
            }
          />


          <Route
            path="/userProfile/review"
            element={
              <>
                <Navbar />
                <ReviewPage />


              </>
            }
          />




          <Route path="/admin" element={<>
            <Sidebar />
            <Protect Component={Dashboard} />
          </>} />
          <Route path="/admin/clients-service-details" element={<>
            <Sidebar />
            <Protect Component={ViewServices} />
          </>} />
          <Route path="/admin/provider-all-services" element={<>
            <Sidebar />
            <Protect Component={Providerservices} />
          </>} />

          <Route path="/admin/provider-service-details/:id" element={<>
            <Sidebar />
            <Protect Component={DetailService} />
          </>} />

          <Route path="/admin/blogs" element={<>
            <Sidebar />
            <Protect Component={Blogs} />
          </>} />


          <Route path="/admin/gift-all" element={<>
            <Sidebar />
            <Protect Component={Giftcard} />
          </>} />

          <Route path="/admin/memberhsip-all" element={<>
            <Sidebar />
            <Protect Component={Memberhsip} />
          </>} />


          <Route path="/admin/review" element={<>
            <Sidebar />
            <Protect Component={Review} />
          </>} />

          <Route path="/admin/all-statement" element={<>
            <Sidebar />
            <Protect Component={Statemement} />
          </>} />


          <Route path="/admin/blog/addblogs" element={<>
            <Sidebar />
            <Protect Component={Addblog} />
          </>} />

          <Route path="/admin/blog/editblogs/:id" element={<>
            <Sidebar />
            <Protect Component={Editblog} />
          </>} />


          <Route path="/admin/gift" element={<>
            <Sidebar />
            <Protect Component={GetGidt} />
          </>} />
          <Route path="/admin/gift/addgift" element={<>
            <Sidebar />
            <Protect Component={AddGift} />
          </>} />
          <Route path="/admin/gift/editgift/:id" element={<>
            <Sidebar />
            <Protect Component={EditGift} />
          </>} />



          <Route path="/admin/coupon" element={<>
            <Sidebar />
            <Protect Component={GetCoupon} />
          </>} />
          <Route path="/admin/coupon/addcoupon" element={<>
            <Sidebar />
            <Protect Component={AddCoupon} />
          </>} />
          <Route path="/admin/coupon/editcoupon/:id" element={<>
            <Sidebar />
            <Protect Component={EditCoupon} />
          </>} />










          <Route path="/admin/post" element={<>
            <Sidebar />
            <Protect Component={Getpost} />
          </>} />
          <Route path="/admin/post/addpost" element={<>
            <Sidebar />
            <Protect Component={Addpost} />
          </>} />
          <Route path="/admin/post/editpage/:id" element={<>
            <Sidebar />
            <Protect Component={Editpost} />
          </>} />
          <Route path="/admin/login" element={<>
            <Protect Component={LoginPage} />
          </>} />
          <Route path="/admin/*" element={<>
            <Sidebar />
            <Protect Component={Errorpage} />
          </>} />

          <Route path="/admin/services" element={<>
            <Sidebar />
            <Protect Component={getService} />
          </>} />
          <Route path="/admin/services/add_service" element={<>
            <Sidebar />
            <Protect Component={AddPostService} />
          </>} />
          <Route path="/admin/services/edit_post/:id" element={<>
            <Sidebar />
            <Protect Component={EditPostService} />
          </>} />
          <Route path="/admin/clients" element={<>
            <Sidebar />
            <Protect Component={Clients} />
          </>} />

          <Route path="/admin/clients/add_client" element={<>
            <Sidebar />
            <Protect Component={AddClient} />
          </>} />
          <Route path="/admin/clients/edit_client/:id" element={<>
            <Sidebar />
            <Protect Component={EditClient} />
          </>} />
          <Route path="/admin/contractors" element={<>
            <Sidebar />
            <Protect Component={Contractors} />
          </>} />

          <Route path="/admin/contractors/add_contractor" element={<>
            <Sidebar />
            <Protect Component={AddContractors} />
          </>} />
          <Route path="/admin/contractors/view_contractor/:id" element={<>
            <Sidebar />
            <Protect Component={ViewContractor} />
          </>} />
          <Route path="/admin/payments" element={<>
            <Sidebar />
            <Protect Component={Payments} />
          </>} />
          <Route path="/admin/payments/details/:id" element={<>
            <Sidebar />
            <Protect Component={Details} />
          </>} />

          <Route path="/admin/payments/details/Release/:providerId/:amount" element={<>
            <Sidebar />
            <Protect Component={Release} />
          </>} />



          <Route path="/admin/bookings" element={<>
            <Sidebar />
            <Protect Component={Booking} />
          </>} />

          <Route path="/admin/events" element={<>
            <Sidebar />
            <Protect Component={Event} />
          </>} />

          <Route path="/admin/messages" element={<>
            <Sidebar />
            <Protect Component={Message} />
          </>} />














          <Route path="/providers" element={<>
            {/* <div className='profileSpace panelHeight'> */}
            {/* <Chatbot /> */}
            <SideBarprovider />
            <NavBarProvide />
            <Protected Component={DashboardProvider} />
            {/* </div> */}
          </>} />
          <Route path="/providers/scheduled-requests" element={<>
            <SideBarprovider />
            <NavBarProvide />
            <Protected Component={ScheduledRequests} />

          </>} />
          <Route path="/providers/notification" element={<>
            <SideBarprovider />
            <NavBarProvide />
            <Protected Component={Notification} />

          </>} />


          <Route path="/providers/events" element={<>
            <SideBarprovider />
            <NavBarProvide />
            <Protected Component={Events} />
          </>} />

          <Route path="/providers/services" element={<>
            <SideBarprovider />
            <NavBarProvide />
            <Protected Component={Services} />
          </>} />
          <Route path="/providers/earnings" element={<>
            <SideBarprovider />
            <NavBarProvide />
            <Protected Component={Earnings} />
          </>} />
          <Route path="/providers/application-form" element={<>
            <SideBarprovider />
            <NavBarProvide />
            <Protected Component={ApplicationForm} />
          </>} />


          <Route path="/providers/bookings" element={<>
            <SideBarprovider />
            <NavBarProvide />
            <Protected Component={Booking} />
          </>} />

          <Route path="/providers/events" element={<>
            <SideBarprovider />
            <NavBarProvide />
            <Protected Component={Event} />
          </>} />

          <Route path="/providers/messages" element={<>
            <SideBarprovider />
            <NavBarProvide />
            <Protected Component={Message} />
          </>} />
          <Route path="/providers/dashboard" element={<>
            <SideBarprovider />
            <NavBarProvide />
            <Protected Component={DashboardProvider} />
          </>} />


          <Route path="/providers/profile" element={<>
            <SideBarprovider />
            <NavBarProvide />
            <Protected Component={Profile} />
          </>} />

          <Route path="/providers/personal-settings" element={<>
            <SideBarprovider />
            <NavBarProvide />
            <Protected Component={PersonalSettings} />
          </>} />

          <Route path="/providers/waiting" element={<>
            <SideBarprovider />
            <NavBarProvide />
            <Protected Component={Callstatus} />
          </>} />
          <Route path="/providers/login" element={<>
            <Protected Component={Loginprovider} />
          </>} />


          <Route path="/providers/logout" element={<>
            <Protected Component={Logout} />
          </>} />



        </Routes>

      </Provider >


    </>
  );
}

export default App;