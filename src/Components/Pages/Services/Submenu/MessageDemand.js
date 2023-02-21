import React from 'react'
import Faq from '../../Home/Faq'
import Member from './Member'
import "./style.css"
import { Link } from 'react-router-dom'       
import Image1 from "../../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg"
import Image2 from "../../../assets/img/masseur-doing-massage-backbone-man-body-spa-salon-beauty-treatment-concept.jpg"
import Image3 from "../../../assets/img/tender-african-woman-relaxing-enjoying-healthy-spa-massage-with-oil.jpg"




function MessageDemand() {
    return (
        <>
            <div id="small_banner">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="head">
                                <h1>A commitment to keep your <span>body working</span> </h1>
                                <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</h3>
                                <button className="button" >get started</button>
                                <button className="button hollow" >services</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="alternate_post">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="bg">
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="heading">
                                <h3>Home Visit</h3>
                                <h2 style={{ fontSize: "18px" }}>at convience of your home</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>

                                <button className="button" >book now</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="heading">
                                <h3>Provider's Place</h3>
                                <h2 style={{ fontSize: "18px" }}>at provider's place , get access to more professional tools and environment</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>

                                <button className="button" type="button" name="button">book now</button>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="bg" >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="about">
            <div className="container">
              <div className="row">
                <div className="col-sm-4">
                  <div className="item">
                    <div className="content">
                      <div className="icon">
                      </div>
                      <h3>professional service providers</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                      <Link className="anchor" to="#">read more</Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="item">
                    <div className="content">
                      <div className="icon" >
                      </div>
                      <h3>rejuvenate your body</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                      <Link className="anchor" to="#">read more</Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="item">
                    <div className="content">
                      <div className="icon" >
                      </div>
                      <h3>clean environments</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                      <Link className="anchor" to="#">read more</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="types" >
          <div className="container" >
              <div className="row">
                  <div className="gutter">
                      <div className="heading">
                      <h3>services</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-sm-10 col-sm-offset-1">
                      <div className="container-fluid">
                          <div className="row">
                              <div className="col-sm-4 col-xs-12">
                                  <div className="item_wrapper">
                                      <div className="item">
                                          <div className="bg" style={{ backgroundImage: `url(${Image1})` ,borderRadius:"7px"}} >
                                          </div>
                                          <div className="text content">
                                              <h3>Title Goes here</h3>
                                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                                              <div className="text">
                                                  <Link to="#" className="anchor" id='anchors'>book now</Link>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-sm-4 col-xs-6">
                                  <div className="item_wrapper">
                                      <div className="item">
                                          <div className="bg" style={{ backgroundImage: `url(${Image2})` ,borderRadius:"7px"}} >
                                          </div>
                                          <div className="text content">
                                              <h3>Title Goes here</h3>
                                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                                              <div className="text">
                                                  <Link to="#" className="anchor" id='anchors'>book now</Link>
                                              </div>
                                          </div>

                                      </div>
                                  </div>
                              </div>
                              <div className="col-sm-4 col-xs-6">
                                  <div className="item_wrapper">
                                      <div className="item">
                                          <div className="bg" style={{ backgroundImage: `url(${Image3})` ,borderRadius:"7px"}} >
                                          </div>
                                          <div className="text content">
                                              <h3>Title Goes here</h3>
                                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                                              <div className="text">
                                                  <Link to="#" className="anchor" id='anchors'>book now</Link>
                                              </div>
                                          </div>

                                      </div>
                                  </div>
                              </div>
                              
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>


      <Member/>
      <Faq/>
        </>
    )
}

export default MessageDemand