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
import Worklist from '../Services/Submenu/Coroporate/Worklist'
// import Event_services from '../Services/Submenu/Coroporate/Event_services'


function Home() {
    return (
        <>
            <Banner />
            <div className='mt-5'>
                <Yoga />
            </div>

            <div className='mt-5'>
                <Worklist />
            </div>
            <div className='mt-5'>
                <About />
            </div>
            <div className='mt-5'>
                <Brief />
            </div>
            <div className='mt-5'>
                <Download />
            </div>

            <div className=''>
                <Provider />
            </div>

            <div className='mt-5'>
                <Testimonials />
            </div>

            <div className='mt-5'>
                <Blog />
            </div>

            <div className='mt-5'>
                <Faq />
            </div>






        </>
    )
}

export default Home