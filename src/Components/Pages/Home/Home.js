import React from 'react'
import Banner from './Banner'
import Yoga from './Yoga'
// import Corporate from './Corporate'
import About from './About'
import Brief from './Brief'
import Download from './Download'
import Provider from './Provider'
import Testimonials from './Testimonials'
import Blog from './Blog'
import Faq from './Faq'
// import Event_services from '../Services/Submenu/Coroporate/Event_services'


function Home() {
    return (
        <>
           <Banner/>
           <Yoga/>
           <About/>
           <Brief/>
           <Download/>
           <Provider/>
           <Testimonials/>
           <Blog/>
           <Faq/>

        </>
    )
}

export default Home