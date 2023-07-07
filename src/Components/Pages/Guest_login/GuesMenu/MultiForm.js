import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import FirstForm from "./FirstForm";
import SecondForm from "./SeconForm";
import ThirdForm from "./ThirdForm";
// import FourthForm from "./FourthForm";
// import FifthForm from "./FifthForm"; // Uncomment and import if available

const MultiForm = () => {
    const [now, setNow] = useState(25);

    const nextStep = () => {
        setNow((prevStep) => (prevStep < 100 ? prevStep + 25 : prevStep));
    };

    const previousStep = () => {
        setNow((prevStep) => (prevStep > 25 ? prevStep - 25 : prevStep));
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
            form = <ThirdForm step={now} nextStep={nextStep} previousStep={previousStep} />;
            break;
        // case 100:
        //   form = <FifthForm step={now} nextStep={nextStep} previousStep={previousStep} />;
        //   break;
        default:
            break;
    }

    return (
        <>
            <div className="progressbar_userpannel">
                <ProgressBar className="progressbarproviders mt-4" now={now} label={`${now}%`} />
                {form}
            </div>

        </>
    );
};

export default MultiForm;
