import React from 'react'
import { Link } from 'react-router-dom'
import Image1 from "../../assets/img/download-google-play.png"
import Image2 from "../../assets/img/download-app-store.png"
import Image3 from "../../assets/img/app copy1.png"
import ModalCard from '../Modal/ModalCard'

function Download() {
    return (
        <>
            <ModalCard
                title="Try our app"
                h2="Download Productive Alliance App on Google Play or Apple App Store"
                p="Book your desired on demand service using our app in less than 5 minutes . Your provider can be at your door as quick as within an hour!"
                // description={users.description}
                dowonload1={Image1}
                dowonload2={Image2}
                srcImage={Image3}
                classImage="service-image-card"
                redirect1="https://play.google.com/store/apps"
                redirect2="https://play.google.com/store/apps"
                // id="donwload_page_container"

            />


        </>
    )
}

export default Download