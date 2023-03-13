import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import FirstForm from "./FirstForm";
import SecondForm from "./SecondForm";
import ThirdForm from "./ThirdForm";
import FourthForm from "./FourthForm";

const MultiStepForm = () => {
  const [now, setnow] = useState(25);
  let nextStep = () => {
    setnow(now < 100 ? now + 25 : now);
  };
  let previousStep = () => {
    setnow(now > 26 ? now - 25 : now);
  };
  let form;
  switch (now) {
    case 25:
      form = <FirstForm step={now} nextStep={nextStep} />;
      break;
    case 50:
      form = <SecondForm step={now} nextStep={nextStep} previousStep={previousStep}/>;
      break;
    case 75:
      form = <ThirdForm step={now} nextStep={nextStep} previousStep={previousStep}/>;
      break;
    case 100:
      form = <FourthForm step={now} nextStep={nextStep} previousStep={previousStep}/>;
      break;

    default:
      break;
  }

  return (
    <>
      <ProgressBar className="mt-4" now={now} label={`${now}%`} />
      {form}
    </>
  );
  // return (
  //   <>
  //     <ProgressBar now={now} label={`${now}%`} />
  //     <FirstForm step={now} nextStep={nextStep}/>
  //   </>
  // );
};

export default MultiStepForm;
