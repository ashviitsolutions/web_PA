import React, { useState } from 'react';
import { ProgressBar } from "react-bootstrap";
import Image7 from "../../assets/img/gift.png"
import Image8 from "../../assets/img/gift (2).png"
import Image9 from "../../assets/img/gift (1).png"
import Image4 from "../../assets/img/gift-card.png"
import Image5 from "../../assets/img/present.png"
import Image6 from "../../assets/img/gift-card.png"
import Slider from './Slider'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Giftcard() {
  const [value, onChange] = useState(new Date());
  const [now, setNow] = useState(25);

  const nextStep = () => {
    if (now === 25) {
      setNow(50);
    } else if (now === 50) {
      setNow(75);
    } else if (now === 75) {
      setNow(100);
    }
  };

  const previousStep = () => {
    setNow(now > 26 ? now - 25 : now);
  };

  return (
    <div id="gift_card">
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <Slider />
          </div>
          <div className="col-sm-8">
            <ProgressBar className="mt-4" now={now} label={`${now}%`} onClick={previousStep} />
            {now === 25 && (
              <div id="section_group" className="section_group">
                <div id="sec_wiz_1" className="section" active="">

                  <ul id="" className="gender_holder float_wrapper" >
                    <li className="item" onClick={nextStep}>
                      <span className="icon" style={{ backgroundImage: `url(${Image4})` }}></span>
                      <span className="text">digital gift card</span>
                    </li>
                    <li className="item" onClick={nextStep}>
                      <span className="icon" style={{ backgroundImage: `url(${Image5})` }}></span>
                      <span className="text">buy in bulk</span>
                    </li>
                  </ul>
                </div>


              </div>
            )}
            {now >= 50 && now < 75 && (
              <div id="sec_wiz_2 mt-2" className="section">
                <div className="heading">
                  <h3>Recipient Location</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                </div>

                <div className="input_group search">
                  <input className="input" type="text" name="" value="" required />
                  <label htmlFor="">search location</label>
                </div>

                <button className="lazy button" type="button" onClick={nextStep}>next</button>
              </div>

            )}


            {now >= 75 && now < 100 && (
              <div id="sec_wiz_3" className="section">
                <ul id="gender_holder" className="gender_holder float_wrapper" style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <li style={{ width: "calc(25% - 10px)", marginTop: "5px" }} className="item" onClick={nextStep} >
                    <span className="icon" style={{ backgroundImage: `url(${Image6})` }}></span>
                    <span className="text big">$100</span>
                    <p>Lorem ipsum dolor sit</p>
                  </li>
                  <li style={{ width: "calc(25% - 10px)" }} className="item" onClick={nextStep}>
                    <span className="icon" style={{ backgroundImage: `url(${Image7})` }} ></span>
                    <span className="text big">$200</span>
                    <p>Lorem ipsum dolor sit</p>
                  </li>
                  <li style={{ width: "calc(25% - 10px)" }} className="item" onClick={nextStep}>
                    <span className="icon" style={{ backgroundImage: `url(${Image8})` }}></span>
                    <span className="text big">$500</span>
                    <p>Lorem ipsum dolor sit</p>
                  </li>
                  <li style={{ width: "calc(25% - 10px)" }} className="item" onClick={nextStep}>
                    <span className="icon" style={{ backgroundImage: `url(${Image9})` }}></span>
                    <span className="text big">$1000</span>
                    <p>Lorem ipsum dolor sit</p>
                  </li>
                </ul>

                <button className="lazy button" type="button" onClick={nextStep}>next</button>
              </div>
            )}




            {now === 100 && (
              <div id="sec_wiz_4" className="section">
                <htmlForm className="" action="index.html">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="input_group" style={{ textAlign: 'center' }}>
                          <label htmlFor="" className="static">date of delivery</label>

                          <div style={{ display: "inline-block", marginTop: "1rem" }} id="datepicker" ></div>
                          <Calendar onChange={onChange} value={value} />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="input_group">
                          <input className="input" type="text" name="" value="" required />
                          <label htmlFor="">Recipient name</label>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input_group">
                          <input className="input" type="text" name="" value="" required />
                          <label htmlFor="">your name</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="input_group">
                          <input className="input" type="text" name="" value="" required />
                          <label htmlFor="">Recipient email</label>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input_group">
                          <input className="input" type="text" name="" value="" required />
                          <label htmlFor="">Recipient phone</label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-12">
                        <div className="input_group">
                          <textarea className="input" name="name" rows="5" cols="80"></textarea>
                          <label htmlFor="">your message</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <button className="lazy button" type="button" name="button">add to cart </button>
                    </div>
                  </div>
                </htmlForm>
              </div>


            )}


            {now > 25 && (
              <p className="backbutton" onClick={previousStep}> 
              &laquo; Back
            </p>
            
            )}





          </div>
        </div>
      </div>
    </div>
  );
}

export default Giftcard;
