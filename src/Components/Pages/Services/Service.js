import React from 'react'
import "./Service.css"
import Faq from '../Home/Faq'
import Banner from './Banner'
import Demand from './Demand'
import EventService from './EventService'
import Event_services from "./Submenu/Coroporate/Event_services"



function Service() {
  return (
    <>
    <Banner/>
    <Demand/>
    <EventService/>
    <Event_services/>
   
  <Faq/>
    </>
  )
}

export default Service