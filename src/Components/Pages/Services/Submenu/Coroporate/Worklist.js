import React from 'react'
import { Link } from 'react-router-dom'
import Image7 from "../../../../assets/img/works/test.svg"
import Image8 from "../../../../assets/img/works/yoga.png"
import Image9 from "../../../../assets/img/works/move.svg"
import Image1 from "../../../../assets/img/download-google-play.png"
import Image2 from "../../../../assets/img/download-app-store.png"
function Worklist() {
  return (
    <>
      <div id="talent">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="big_head text-center">
                <h3>how <span>it works</span></h3>
                <p>If you have any questions please feel free to to reach out to us, are here to assist you.
                </p>
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
                        <p>Create an account or login as a guest and customize your desired service .</p>
                      </div>
                    </div>
                    <div className="bg" style={{ backgroundImage: `url(${Image7})`, borderRadius: "7px" }}>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="wrapper">
                  <div className="item" style={{ top: "70px" }}>
                    <div className="inner_wrapper">
                      <div className="content">
                        <h3> <b>02</b> contractor's  check in</h3>
                        <p>Once your service is submitted, your provider will check in with you and keep you informed
                        </p>
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
                        <p>We hope you enjoyed  your service.
                        </p>
                      </div>
                    </div>
                    <div className="bg" style={{ backgroundImage: `url(${Image8})`, borderRadius: "7px" }}>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="wrapper">
                  <div className="item" style={{ top: "70px" }}>
                    <div className="inner_wrapper">
                      <div className="content">
                        <h3> <b>04</b> Rate us</h3>
                        <p>Write to us and give us your feedback</p>
                      </div>
                    </div>
                    <div className="bg" style={{ backgroundImage: `url(${Image9})`, borderRadius: "7px" }}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-1">
            <div className="buttons_pane">
              <Link to="https://play.google.com/store/apps" target="_blank"><img id='downloadimage' style={{ maxWidth: "180px", margin: "2px" }} src={Image1} alt="" /></Link>
              <Link to="https://play.google.com/store/apps" target="_blank"><img id='downloadimage' style={{ maxWidth: "161px", margin: "2px" }} src={Image2} alt="" /></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Worklist