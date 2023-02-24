import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './Components/Header/Navbar';
import Home from './Components/Pages/Home/Home';
import Footer from './Components/Pages/Footer/Footer';
import Service from './Components/Pages/Services/Service';
import MessageDemand from './Components/Pages/Services/Submenu/MessageDemand';
import CorporateEvents from './Components/Pages/Services/Submenu/CorporateEvents';
import PrivateEvents from './Components/Pages/Services/Submenu/PrivateEvents';
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



function App() {
 
  return (
    <>
    <Provider  store={store}      >
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Service />} />
            <Route path="/services/massage_on_demand" element={<MessageDemand />} />
            <Route path="/services/corporate_events" element={<CorporateEvents />} />
            <Route path="/services/private_events" element={<PrivateEvents />} />
            <Route path="/about" element={<About />} /> 
            <Route path="/contact" element={<Contact />} /> 
            <Route path="/become_member" element={<Membership />} /> 
            <Route path="/provider" element={<Providers />} /> 
            <Route path="/login" element={<Login/>} /> 
            <Route path="/sign_up" element={<Sinup/>} /> 
            <Route path="/select_location" element={<SelectLocation/>} /> 
            <Route path="/guest_login" element={<GuestLogin/>} /> 
            <Route path="/giftcard" element={<Gift/>} /> 
          </Routes>
          <Footer/>
        </BrowserRouter>
        </Provider>


    </>
  );
}

export default App;
