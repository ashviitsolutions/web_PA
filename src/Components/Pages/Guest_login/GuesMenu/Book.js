import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import FirstForm from "./FirstForm";
import SecondForm from "./SeconForm";
import ThirdForm from "./ThirdForm";
import FourForm from "./FourForm";
import FifthForm from "./FifthForm";
import Conform from "./Conform";

import "./style.css"


const Book = () => {
  const [activeTab, setActiveTab] = useState(1);

  const [now, setNow] = useState(0);

  const nextStep = () => {
    setNow((prevStep) => (prevStep < 100 ? prevStep + 100 / 6 : prevStep));
    setActiveTab(activeTab + 1);
  };

  const previousStep = () => {
    setNow((prevStep) => (prevStep > 0 ? prevStep - 100 / 6 : prevStep));
  };

  const navigateToNextForm = () => {
    nextStep(); // Increment the step progress
    // You can add any additional logic here before navigating
  };



  let form;
  switch (activeTab) {
    case 1:
      form = <FirstForm step={now} previousStep={previousStep} nextStep={navigateToNextForm} />;
      break;
    case 2:
      form = <SecondForm step={now} nextStep={navigateToNextForm} previousStep={previousStep} />;
      break;
    case 3:
      form = <ThirdForm step={now} nextStep={navigateToNextForm} previousStep={previousStep} />;
      break;
    case 4:
      form = <FourForm step={now} nextStep={navigateToNextForm} previousStep={previousStep} />;
      break;
    case 5:
      form = <FifthForm step={now} nextStep={navigateToNextForm} previousStep={previousStep} />;
      break;
   {/* case 6:
      form = <Conform step={now} nextStep={navigateToNextForm} previousStep={previousStep} />;
  break;  */}
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

                members
              </li>
              <li id="tab_2" className={activeTab === 2 ? 'active' : ''} onClick={() => setActiveTab(2)}>

                service
              </li>
              <li id="tab_3" className={activeTab === 3 ? 'active' : ''} onClick={() => setActiveTab(3)}>

                customize
              </li>
              <li id="tab_4" className={activeTab === 4 ? 'active' : ''} onClick={() => setActiveTab(4)}>

                schedule
              </li>
              <li id="tab_5" className={activeTab === 5 ? 'active' : ''} onClick={() => setActiveTab(5)}>

                address
              </li>
              
              <li id="tab_6">
                 
                <span>confirm</span>
              </li>
            </ul>
          </div>
        </div>
      </div>


      <div className="progressbar_userpannel">
        <ProgressBar className="progressbarproviders mt-4" now={(activeTab) * 16.6666667} />

        {form}
      </div>
    </>
  )
}

export default Book