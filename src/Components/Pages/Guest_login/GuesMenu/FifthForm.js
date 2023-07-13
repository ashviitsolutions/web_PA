import React from "react";
import "./style.css";

const FifthForm = () => {
  const image1 =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14009.804601388554!2d77.38583598519591!3d28.616237787899024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cefbfc0af6e6f%3A0xf1bb1ef79e931eea!2sYusufpur%20Chak%20Saberi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1661391086520!5m2!1sen!2sin";
  
  return (
    <>
      <div id="sec_wiz_5" className="section">
        <div id="employees" style={{ textAlign: "center" }}>
          <label style={{ textAlign: "center", fontSize: "18px" }} className="as_title" htmlFor="">
            address details
          </label>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-7">
                <div className="inner">
                  <div className="map">
                    <iframe src={image1} style={{ border: 0, height: "360px" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  </div>
                </div>
              </div>
              <div className="col-sm-5">
                <div className="inner">
                  <h3 style={{fontSize:"18px"}}>24000 EL Toro Road</h3>
                  <p style={{fontSize:"18px"}}>Laguna Woods, CA 92653</p>
                </div>
                <div className="inner">
                  <label htmlFor="" style={{fontSize:"18px"}}>Apt / Suite / Hotel Name &amp; room</label>
                  <input className="input" type="text" name="" value="" />
                </div>
                <div className="inner">
                  <label htmlFor="" style={{fontSize:"18px"}}>Email</label>
                  <input className="input" type="text" name="" value="" />
                </div>
                <div className="inner">
                  <label htmlFor="" style={{fontSize:"18px"}}>Arrival Instructions</label>
                  <textarea className="input" name="name" rows="5"></textarea>
                </div>
                <div className="inner" style={{fontSize:"18px"}}></div>
              </div>
              <button className="button" type="button" name="button">
                review
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FifthForm;
