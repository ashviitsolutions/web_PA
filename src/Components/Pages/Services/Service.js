import React from 'react'
import "./Service.css"
import Faq from '../Home/Faq'
import Banner from './Banner'
// import Demand from './Demand'
// import EventService from './EventService'
import Event_services from "./Submenu/Coroporate/Event_services"
import Services from "./Submenu/Message/Service"
import PrivateEvents from './Submenu/PrivateEvents/PrivateEvents'


function Service() {
  return (
    <>
    <Banner/>
    <Services/>
    <div className='hspace'></div>
    <Event_services/>
    <div className='hspace'></div>
    <PrivateEvents/>
    <div className='hspace'></div>
    <Faq/>
    </>
  )
}

export default Service