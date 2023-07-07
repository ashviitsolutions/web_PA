import React from 'react'
import { Link } from 'react-router-dom'
import Image7 from "../../../../assets/img/works/test.svg"
import Image8 from "../../../../assets/img/works/agreement.svg"
import Image9 from "../../../../assets/img/works/move.svg"
function Worklist() {
  return (
    <>
    <div id="talent">
    <div className="container">
      <div className="row">
        <div className="col-sm-7">
          <div className="big_head">
            <h3>how <span>it works</span></h3>
            <p>if you are not very sure , you can give us a call or fill the form below and we will call back you.</p>
          </div>
        </div>
      </div>
      <div className="big_wrapper">
        <span className="line"></span>
        <div className="row">
          <div className="col-sm-6 pull-big-right">
            <div className="wrapper">
              <div className="item item_right">
                <span className="tri"></span>
                <div className="inner_wrapper">
                  <div className="content">
                    <h3> <b>01</b> Book a service</h3>
                    <p>tell us about yourself, create a profile and we book for a service.</p>
                  </div>
                </div>
                <div className="bg" style={{ backgroundImage: `url(${Image7})` ,borderRadius:"7px"}}>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="wrapper">
              <div className="item" style={{top: "70px"}}>
                <div className="inner_wrapper">
                  <div className="content">
                    <h3> <b>02</b> contractor's  check in</h3>
                    <p>get the service at comfort of your home or visit a contractor's place.</p>
                  </div>
                </div>
                <div className="bg">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 pull-big-right">
            <div className="wrapper">
              <div className="item item_right">
                <span className="tri"></span>
                <div className="inner_wrapper">
                  <div className="content">
                    <h3> <b>03</b> rejuvinate</h3>
                    <p>our service provider will provide you services that you requested.</p>
                  </div>
                </div>
                <div className="bg" style={{ backgroundImage: `url(${Image8})` ,borderRadius:"7px"}}>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="wrapper">
              <div className="item" style={{top: "70px"}}>
                <div className="inner_wrapper">
                  <div className="content">
                    <h3> <b>04</b> give us  Ratings</h3>
                    <p>provide your valuable feedback and rating for our system as well as the service provider.</p>
                  </div>
                </div>
                <div className="bg" style={{ backgroundImage: `url(${Image9})` ,borderRadius:"7px"}}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="buttons_pane">
          <Link to="sign_up.php">
            <button className="button" > get started </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default Worklist