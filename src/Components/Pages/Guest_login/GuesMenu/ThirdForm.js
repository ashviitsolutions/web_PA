import React, { useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice';

const ThirdForm = ({ nextStep }) => {
    const third = useSelector((state) => state.counter.formData);
    console.log("third", third);

    const [areasOfConcern, setAreasOfConcern] = useState([]);
    const [healthConditions, setHealthConditions] = useState([]);
    const [specialConsideration, setSpecialConsideration] = useState([]);
    const [massageBodyPart, setMassageBodyPart] = useState([]);
    const [massagePressure, setMassagePressure] = useState("");

    const dispatch = useDispatch();

    // Handle form submission
    const handleSubmit = () => {
        // Create an object to hold the form data
        const formData = {
            areas_of_concern: areasOfConcern,
            health_conditions: healthConditions,
            special_considerations: specialConsideration,
            massage_body_part: massageBodyPart,
            massage_pressure: massagePressure,
        };

        try {
            // Dispatch the form data to Redux if needed
            dispatch(updateInputData({ formName: 'thirdform', inputData: formData }));

            setTimeout(() => {
                nextStep();
            }, 2000)
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const areasOfConcernOptions = [
        "pain",
        "tension",
        "relaxation",
        "migraine",
        "stress",
        "muscle pain",
        "injuries",
        "inflammation",
        "fatigue",
        "anxiety",
        "insomnia",
        "numbness",
    ];

    const healthConditionsOptions = [
        "arthritis",
        "cancer",
        "digestive disorder",
        "fibromyalgia",
        "plantar fasciitis",
        "hypertension",
        "blood circulation",
        "Acne",
        "pregnancy",
        "sciatica",
        "dadisease",
        "nurological condition",
    ];

    const specialConsiderationOptions = [
        "I prefer geriatric massage",
        "I am a minor",
    ];

    const massageBodyPartsOptions = [
        "arms & hands",
        "back",
        "feet",
        "head",
        "legs",
        "neck",
        "shoulders",
        "gluteal region",
    ];

    const massagePressureOptions = ["light", "medium", "firm", "deep"];

    const handleCheckboxChange = (selectedOptions, setSelectedOptions, option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <div id="sec_wiz_3 thirdform" className="section">
            <label className="static title" htmlFor="">
                Areas of Concern
            </label>
            <ul className="selectable">
                {areasOfConcernOptions.map((option) => (
                    <li key={option}>
                        <label>
                            <input
                                type="checkbox"
                                value={option}
                                checked={areasOfConcern.includes(option)}
                                onChange={() =>
                                    handleCheckboxChange(
                                        areasOfConcern,
                                        setAreasOfConcern,
                                        option
                                    )
                                }
                            />
                            {" "} {option}
                        </label>
                    </li>
                ))}
            </ul>

            <label className="static mt-5 title" htmlFor="">
                Health Conditions
            </label>
            <ul className="selectable">
                {healthConditionsOptions.map((option) => (
                    <li key={option}>
                        <label>
                            <input
                                type="checkbox"
                                value={option}
                                checked={healthConditions.includes(option)}
                                onChange={() =>
                                    handleCheckboxChange(
                                        healthConditions,
                                        setHealthConditions,
                                        option
                                    )
                                }
                            />
                            {" "}{option}
                        </label>
                    </li>
                ))}
            </ul>

            <label className="static mt-5 title" htmlFor="">
                Special consideration
            </label>
            <ul className="selectable">
                {specialConsiderationOptions.map((option) => (
                    <li key={option}>
                        <label>
                            <input
                                type="checkbox"
                                name="specialConsideration"
                                value={option}
                                checked={specialConsideration.includes(option)}
                                onChange={() => handleCheckboxChange(specialConsideration, setSpecialConsideration, option)}
                            />
                            {" "} {option}
                        </label>
                    </li>
                ))}
            </ul>


            <label className="static mt-5 title" htmlFor="">
                Massage body part
            </label>
            <ul className="selectable">
                {massageBodyPartsOptions.map((option) => (
                    <li key={option}>
                        <label>
                            <input
                                type="checkbox"
                                value={option}
                                checked={massageBodyPart.includes(option)}
                                onChange={() =>
                                    handleCheckboxChange(
                                        massageBodyPart,
                                        setMassageBodyPart,
                                        option
                                    )
                                }
                            />
                            {" "} {option}
                        </label>
                    </li>
                ))}
            </ul>

            <label className="static mt-5 title" htmlFor="">
                Massage pressure
            </label>
            <ul id="massage_pressure" className="selectable">
                {massagePressureOptions.map((option) => (
                    <li key={option}>
                        <label>
                            <input
                                type="radio"
                                name="massagePressure"
                                value={option}
                                checked={massagePressure === option}
                                onChange={() => setMassagePressure(option)}
                            />
                            {" "}{option}
                        </label>
                    </li>
                ))}
            </ul>

            <button className="button lazy mt-5" type="button" onClick={handleSubmit}>
                Continue
            </button>
            <center>
                <a className='small' href='/'>&larr; Back to Home</a>
            </center>
        </div>
    );
};

export default ThirdForm
