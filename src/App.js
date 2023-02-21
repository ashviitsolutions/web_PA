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
          </Routes>
          <Footer/>
        </BrowserRouter>
        </Provider>


    </>
  );
}

export default App;
