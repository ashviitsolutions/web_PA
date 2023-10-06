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
  const handleTabClick = (tabNumber) => {
    // Only update the activeTab if the clicked tab is not ahead of the current step
    if (tabNumber) {
      setActiveTab(tabNumber);
    }
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
              <li id="tab_1" className={activeTab === 1 ? 'active' : ''} onClick={() => handleTabClick(1)}>
                Members
              </li>
              <li id="tab_2" className={activeTab === 2 ? 'active' : ''} onClick={() => handleTabClick(2)}>
                Service
              </li>
              <li id="tab_3" className={activeTab === 3 ? 'active' : ''} onClick={() => handleTabClick(3)}>
                Customize
              </li>
              <li id="tab_4" className={activeTab === 4 ? 'active' : ''} onClick={() => handleTabClick(4)}>
                Schedule
              </li>
              <li id="tab_5" className={activeTab === 5 ? 'active' : ''} onClick={() => handleTabClick(5)}>
                Address
              </li>
              <li id="tab_6" className={activeTab === 6 ? 'active' : ''} onClick={() => handleTabClick(6)}>
                Confirm
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