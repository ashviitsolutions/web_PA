import React from 'react'
import { Link } from 'react-router-dom'
// import Image1 from "../../assets/img/treatment-finger-keep-hand-161477.jpeg"
import Imge1 from "../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg"
import Imge2 from "../../assets/img/masseur-doing-massage-backbone-man-body-spa-salon-beauty-treatment-concept.jpg"
import Imge3 from "../../assets/img/tender-african-woman-relaxing-enjoying-healthy-spa-massage-with-oil.jpg"

import Imge4 from "../../assets/img/pexels-cottonbro-3997983.jpg"
import Imge5 from "../../assets/img/pexels-ivan-samkov-5659057.jpg"
import Imge6 from "../../assets/img/pexels-cottonbro-3997993.jpg"

function Demand() {
  return (
    <>
      <div id="types" >
        <div id="classNamees">
          <div className="container" >
            <div className="row">
              <div className="gutter">
                <div className="heading">
                  <h3>On demand Services</h3>
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
                        <div className="item" id='servicecart'>
                          <div className="bg" style={{ backgroundImage: `url(${Imge1})`, borderRadius: "7px" }} >
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
                        <div className="item" id='servicecart'>
                          <div className="bg" style={{ backgroundImage: `url(${Imge2})`, borderRadius: "7px" }} >
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
                        <div className="item" id='servicecart'>
                          <div className="bg" style={{ backgroundImage: `url(${Imge3})`, borderRadius: "7px" }} >
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
                        <div className="item" id='servicecart'>
                          <div className="bg" style={{ backgroundImage: `url(${Imge4})`, borderRadius: "7px" }} >
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
                        <div className="item" id='servicecart'>
                          <div className="bg" style={{ backgroundImage: `url(${Imge5})`, borderRadius: "7px" }} >
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
                        <div className="item" id='servicecart'>
                          <div className="bg" style={{ backgroundImage: `url(${Imge6})`, borderRadius: "7px" }} >
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
      </div>



    </>
  )
}

export default Demand