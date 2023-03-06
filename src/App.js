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
import Addpost from './Admins/Admin/POST/Addpost';
import Editpost from './Admins/Admin/POST/Editpost';
import Getpost from './Admins/Admin/POST/Getpost';
import LoginPage from './Admins/Admin/PAGES/LOGIN/Login';
import Protect from './Admins/Admin/PAGES/Protected/Protect';
import Errorpage from './Admins/Admin/PAGES/Error404/Errorpage';
import getService from './Admins/Admin/Service/GetPost';
import AddPostService from "./Admins/Admin/Service/AddPost"
import EditPostService from './Admins/Admin/Service/EditPost';



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
            <Protect Component={Getpost} />
          </>} />
          <Route path="/admin/post/addpost" element={<>
            <Protect Component={Addpost} />
          </>} />
          <Route path="/admin/post/editpage/:id" element={<>
            <Protect Component={Editpost} />
          </>} />
          <Route path="/admin/login" element={<>
            <Protect Component={LoginPage} />
          </>} />
          <Route path="/admin/*" element={<>
            <Protect Component={Errorpage} />
          </>} />

          <Route path="/admin/services" element={<>
            <Protect Component={getService} />
          </>} />
          <Route path="/admin/services/add_service" element={<>
            <Protect Component={AddPostService} />
          </>} />
          <Route path="/admin/services/edit_post/:id" element={<>
            <Protect Component={EditPostService} />
          </>} />










        </Routes>

      </Provider>


    </>
  );
}

export default App;
