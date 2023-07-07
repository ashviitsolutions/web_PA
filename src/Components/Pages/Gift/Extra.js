import React from 'react'
// import Image1 from "../../assets/img/6099962.jpg"
// import Image2 from "../../assets/img/6212029.jpg"
// import Image3 from "../../assets/img/Wavy_B&F-01_Single-03.jpg"
import Image4 from "../../assets/img/gift-card.png"
import Image5 from "../../assets/img/present.png"             
import Image6 from "../../assets/img/gift-card.png"

import Image7 from "../../assets/img/gift.png"
import Image8 from "../../assets/img/gift (2).png"             
import Image9 from "../../assets/img/gift (1).png"
import Slider from './Slider'

function Giftcard() {
  return (
    <>
    <div id="gift_card">
    <div className="container">
      <div className="row">
        <div className="col-sm-4">
        <Slider/>
        </div>


        <div className="col-sm-8">
          <ul id="progressPills" className="pills">
            <li  id="prP_1" hold>
            </li>
            <li  id="prP_2">
            </li>
            <li  id="prP_3">
            </li>
            <li  id="prP_4">
            </li>
          </ul>
     
          <div id="section_group" className="section_group">
            <div id="sec_wiz_1" className="section" active="">
      
              <ul id="" className="gender_holder float_wrapper">
                <li  className="item">
                  <span className="icon" style={{ backgroundImage: `url(${Image4})` }}></span>
                  <span className="text">digital gift card</span>
                </li>
                <li  className="item">
                  <span className="icon" style={{ backgroundImage: `url(${Image5})` }}></span>
                  <span className="text">buy in bulk</span>
                </li>
              </ul>
            </div>
            <div id="sec_wiz_2" className="section">
              <div className="heading">
                <h3>Recipient Location</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
              </div>
        
              <div className="input_group search">
                <input className="input" type="text" name="" value="" required />
                <label htmlFor="">search location</label>
              </div>
       
              <button className="lazy button" type="button" >next</button>
            </div>
            <div id="sec_wiz_3" className="section">
     
              <ul id="gender_holder" className="gender_holder float_wrapper">
                <li style={{width:"calc(25% - 10px)"}}  className="item">
                  <span className="icon" style={{ backgroundImage: `url(${Image6})` }}></span>
                  <span className="text big">$100</span>
                  <p>Lorem ipsum dolor sit</p>
                </li>
                <li style={{width:"calc(25% - 10px)"}}  className="item">
                  <span className="icon" style={{ backgroundImage: `url(${Image7})`}} ></span>
                  <span className="text big">$200</span>
                  <p>Lorem ipsum dolor sit</p>
                </li>
                <li style={{width:"calc(25% - 10px)"}}  className="item">
                  <span className="icon" style={{ backgroundImage: `url(${Image8})`}}></span>
                  <span className="text big">$500</span>
                  <p>Lorem ipsum dolor sit</p>
                </li>
                <li style={{width:"calc(25% - 10px)"}}  className="item">
                  <span className="icon" style={{ backgroundImage: `url(${Image9})`}}></span>
                  <span className="text big">$1000</span>
                  <p>Lorem ipsum dolor sit</p>
                </li>
              </ul>
    
              <button  className="lazy button" type="button" name="button">next</button>
            </div>
            <div id="sec_wiz_4" className="section">
              <htmlForm className="" action="index.html" method="post">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="input_group" style={{textAlign:'center'}}>
                        <label htmlFor="" className="static">date of delivery</label>
              
                        <div style={{display:"inline-block"}} id="datepicker" data-date="17/09/2022"></div>
                        <input type="hidden" id="my_hidden_input" />
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
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default Giftcard