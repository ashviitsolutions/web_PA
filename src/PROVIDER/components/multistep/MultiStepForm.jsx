
import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import FirstForm from "./FirstForm";
import SecondForm from "./SecondForm";
import ThirdForm from "./ThirdForm";
import FourthForm from "./FourthForm";
import Satatuspage from "./Satatuspage";
import { IP } from "../../../Constant";
import { useSelector } from 'react-redux';

const MultiStepForm = () => {
  const formData = useSelector((state) => state?.counter?.formData);
  const user = formData.provider_profile && formData.provider_profile[0] ? formData.provider_profile[0] : "";
  const [now, setnow] = useState(25);

  // const [user, setUser] = useState({});
  const token = localStorage.getItem("providertoken");
  useEffect(() => {
    if (user.application_status === 0) {
      setnow(25);
    } else if (user.application_status === 1) {
      setnow(50);
    } else if (user.application_status === 2) {
      setnow(75);
    } else if (user.application_status === 3) {
      setnow(100);
    }
  }, [token]);



  console.log("application_status id", user)
  let nextStep = () => {
    setnow(now < 100 ? now + 25 : now);
  };
  let previousStep = () => {
    setnow(now > 26 ? now - 25 : now);
  };
  let form;
  switch (now) {
    case 25:
      form = <FirstForm step={now} nextStep={nextStep} previousStep={previousStep} />;

      break;
    case 50:
      form = <SecondForm step={now} nextStep={nextStep} previousStep={previousStep} />;
      break;

    case 75:
      form = <ThirdForm step={now} nextStep={nextStep} previousStep={previousStep} />;
      break;
    case 100:
      form = <FourthForm step={now} nextStep={nextStep} previousStep={previousStep} />;
      break;
    case 100:
      if (user === 4) {
        form = <Satatuspage />;

      }
      break;
    default:
      break;
  }

  return (
    <>
      <ProgressBar className="progressbarproviders mt-4" now={now} label={`${now}%`} />
      {form}
    </>
  );
};

export default MultiStepForm;
