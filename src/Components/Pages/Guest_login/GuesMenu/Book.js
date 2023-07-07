import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import FirstForm from "./FirstForm";
import SecondForm from "./SeconForm";
import ThirdForm from "./ThirdForm";
import FourForm from "./FourForm";
import FifthForm from "./FifthForm";

import "./style.css"
import image1 from "../../../assets/img/profile/members.png"
import image2 from "../../../assets/img/profile/members_white.png"
import image3 from "../../../assets/img/profile/service.png"
import image4 from "../../../assets/img/profile/service_white.png"
import image5 from "../../../assets/img/profile/invoice.png"
import image6 from "../../../assets/img/profile/invoice_white.png"
import image7 from "../../../assets/img/profile/calendar.png"
import image8 from "../../../assets/img/profile/calendar_white.png"
import image9 from "../../../assets/img/profile/map.png"
import image10 from "../../../assets/img/profile/map_white.png"
import image11 from "../../../assets/img/profile/check.png"
import image12 from "../../../assets/img/profile/check_white.png"

import image13 from "../../../assets/img/goodbye.png"
import image14 from "../../../assets/img/laugh.png"
import image15 from "../../../assets/img/thinking-of-someone.png"


const Book = () => {
    const [activeTab, setActiveTab] = useState(1);

  const [now, setNow] = useState(0); // Update initial now value to 0

  const nextStep = () => {
    setNow((prevStep) => (prevStep < 100 ? prevStep + 100 / 6 : prevStep)); // Update the increment value
    setActiveTab(activeTab+1)
  };

  const previousStep = () => {
    setNow((prevStep) => (prevStep > 0 ? prevStep - 100 / 6 : prevStep)); // Update the decrement value
  };

  let form;
  switch (activeTab) {
    case 1:
      form = <FirstForm step={now} nextStep={nextStep} previousStep={previousStep} />;
      break;
    case 2:
      form = <SecondForm step={now} nextStep={nextStep} previousStep={previousStep} />;
      break;
    case 3:
      form = <ThirdForm step={now} nextStep={nextStep} previousStep={previousStep} />;
      break;
    case 4:
      form = <FourForm step={now} nextStep={nextStep} previousStep={previousStep} />;
      break;
    case 5:
      form = <FifthForm step={now} nextStep={nextStep} previousStep={previousStep} />;
      break;
    case 6:
      form = <ThirdForm step={now} nextStep={nextStep} previousStep={previousStep} />;
      break;
    default:
      break;
  }

    return (
        <>
            <div className="sidebar_tabs">
                <div className="container">
                    <div className="row">
                        <ul id="tabs_control">
                            <li id="tab_1" className={activeTab === 1 ? 'active' : ''} onClick={() => setActiveTab(1)}>
                                <span className="icon" style={{ backgroundImage: `url(${image1})` }}></span>
                                <span className="icon negative" style={{ backgroundImage: `url(${image2})` }}></span>
                                members
                            </li>
                            <li id="tab_2" className={activeTab === 2 ? 'active' : ''} onClick={() => setActiveTab(2)}>
                                <span className="icon" style={{ backgroundImage: `url(${image3})` }}></span>
                                <span className="icon negative" style={{ backgroundImage: `url(${image4})` }}></span>
                                service
                            </li>
                            <li id="tab_3" className={activeTab === 3 ? 'active' : ''} onClick={() => setActiveTab(3)}>
                                <span className="icon" style={{ backgroundImage: `url(${image5})` }}></span>
                                <span className="icon negative" style={{ backgroundImage: `url(${image6})` }}></span>
                                customize
                            </li>
                            <li id="tab_4" className={activeTab === 4 ? 'active' : ''} onClick={() => setActiveTab(4)}>
                                <span className="icon" style={{ backgroundImage: `url(${image7})` }}></span>
                                <span className="icon negative" style={{ backgroundImage: `url(${image8})` }}></span>
                                schedule
                            </li>
                            <li id="tab_5" className={activeTab === 5 ? 'active' : ''} onClick={() => setActiveTab(5)}>
                                <span className="icon" style={{ backgroundImage: `url(${image9})` }}></span>
                                <span className="icon negative" style={{ backgroundImage: `url(${image10})` }}></span>
                                address
                            </li>
                            <li id="tab_6" className={activeTab === 6 ? 'active' : ''} onClick={() => setActiveTab(6)}>
                                <span className="icon" style={{ backgroundImage: `url(${image11})` }}></span>
                                <span className="icon negative" style={{ backgroundImage: `url(${image12})` }}></span>
                                confirm
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            <div className="progressbar_userpannel">
                <ProgressBar className="progressbarproviders mt-4" now={(activeTab) * 16.6666667} label={`${(activeTab) * 16.6666667}%`} />

                {form}
            </div>
        </>
    )
}

export default Book