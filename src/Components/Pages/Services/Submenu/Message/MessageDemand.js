import React from 'react'
import Banner from './Banner'
import Visit from './Visit/Visit'
import Provider from './Provider'
import Service from './Service'
import Member from '../Member'
import Faq from '../../../Home/Faq'
import Worklins from '../../Submenu/Coroporate/Worklist'

function MessageDemand() {
  return (
    <>
    <Banner/>
    <Visit/>
    <Service/>
    <Worklins/>
    <Member/>
    <Faq/>
    </>
  )
}

export default MessageDemand