import React from "react";
import "./style.css"
import { Link } from "react-router-dom";


const ThirdForm = () => {
    return (
        <>

            <div id="sec_wiz_3 thirdform" className="section">
                <label className="static" htmlFor="">Areas of Concern</label>
                <ul className="selectable">
                    <li >pain</li>
                    <li >tension</li>
                    <li >relaxation</li>
                    <li >headaches/migraines</li>
                    <li >stress</li>
                    <li >muscle pain</li>
                    <li >injuries</li>
                    <li >inflation</li>
                    <li >fatigue</li>
                    <li >anxiety</li>
                    <li >incomnia</li>
                </ul>

                <label className="static mt-5" htmlFor="">Health Conditions</label>
                <ul className="selectable">
                    <li >arthritis</li>
                    <li >cancer</li>
                    <li >digestive disorder</li>
                    <li >fibromyalgia</li>
                    <li >plantar fascilitis</li>
                    <li >pragnency</li>
                    <li >sciatic</li>
                </ul>

                <label className="static mt-5" htmlFor="">Special consideration</label>
                <ul className="selectable">
                    <li >i prefer griatric massage</li>
                    <li >i am minor</li>
                </ul>

                <label className="static mt-5" htmlFor="">Massage body part</label>
                <ul className="selectable">
                    <li >arms & hands</li>
                    <li >back</li>
                    <li >feet</li>
                    <li >head</li>
                    <li >legs</li>
                    <li >neck</li>
                    <li >shoulders</li>
                    <li >gluteal region</li>
                </ul>

                <label className="static mt-5" htmlFor="">Massage pressure</label>
                <ul id="massage_pressure" className="selectable">
                    <li >light</li>
                    <li >medium</li>
                    <li >firm</li>
                    <li >deep</li>
                </ul>


                <Link to="#">
                    <button className="button lazy mt-5" type="button" name="button">continue</button>
                </Link>
            </div>

        </>
    )
}

export default ThirdForm