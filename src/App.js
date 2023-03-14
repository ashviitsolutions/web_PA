import React from 'react';
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
import SelectLocation from './Components/Pages/Book/SelectLocation';
import Membership from './Components/Pages/Membership/Membership';
import Providers from "./Components/Pages/Provider/Provider"
import store from "./Components/Pages/Redux/store"
import { Provider } from 'react-redux';

//admin pannel
import Sidebar from "./Admins/Sidebar/Sidebar"

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

//Pyments
import Payments from './Admins/Admin/PAYMENT/Payments';
import Booking from './Admins/Admin/BOOKING/Booking';
import Event from './Admins/Admin/EVENT/Event';
import Message from './Admins/Admin/MESSAGE/Message';

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


function App() {

  return (
    <>
      <Provider store={store}      >

        <Routes>
          <Route path="/" element={<>
            <Navbar />
            <Home />
            <Footer />
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
          <Route path="/provider" element={<>
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
            <Navbar />
            <SelectLocation />
            <Footer />
          </>} />
          <Route path="/guest_login" element={<>
            <Navbar />
            <GuestLogin />
            <Footer />
          </>} />
          <Route path="/giftcard" element={<>
            <Navbar />
            <Gift />
            <Footer />
          </>} />











          <Route path="/admin" element={<>
       
            <Protect Component={Sidebar} />
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
          <Route path="/admin/clients/edit_client" element={<>
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
          <Route path="/admin/contractors/view_contractor" element={<>
            <Sidebar />
            <Protect Component={ViewContractor} />
          </>} />
          <Route path="/admin/payments" element={<>
            <Sidebar />
            <Protect Component={Payments} />
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
          <Route path="/admin/dashboard" element={<>
            <Sidebar />
            <Protect Component={Dashboard} />
          </>} />













          <Route path="/providers" element={<>
            <NavBarProvide />
            <SideBarprovider />
            <Protect Component={DashboardProvider} />
          </>} />
          <Route path="/providers/scheduled-requests" element={<>
            <NavBarProvide />
            <SideBarprovider />
            <Protect Component={ScheduledRequests} />
          </>} />
          <Route path="/providers/events" element={<>
            <NavBarProvide />
            <SideBarprovider />
            <Protect Component={Events} />
          </>} />

          <Route path="/providers/services" element={<>
            <NavBarProvide />
            <SideBarprovider />
            <Protect Component={Services} />
          </>} />
          <Route path="/providers/earnings" element={<>
            <NavBarProvide />
            <SideBarprovider />
            <Protect Component={Earnings} />
          </>} />
          <Route path="/providers/application-form" element={<>
            <NavBarProvide />
            <SideBarprovider />
            <Protect Component={ApplicationForm} />
          </>} />


          <Route path="/providers/bookings" element={<>
            <NavBarProvide />
            <SideBarprovider />
            <Protect Component={Booking} />
          </>} />

          <Route path="/providers/events" element={<>
            <NavBarProvide />
            <SideBarprovider />
            <Protect Component={Event} />
          </>} />

          <Route path="/providers/messages" element={<>
            <NavBarProvide />
            <SideBarprovider />
            <Protect Component={Message} />
          </>} />
          <Route path="/providers/dashboard" element={<>
            <NavBarProvide />
            <SideBarprovider />
            <Protect Component={DashboardProvider} />
          </>} />


          <Route path="/providers/profiles" element={<>
            <NavBarProvide />
            <SideBarprovider />
            <Protect Component={Profile} />
          </>} />

          <Route path="/providers/personal-settings" element={<>
            <NavBarProvide />
            <SideBarprovider />
            <Protect Component={PersonalSettings} />
          </>} />
        </Routes>

      </Provider>


    </>
  );
}

export default App;
