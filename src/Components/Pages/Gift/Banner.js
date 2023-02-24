import React from 'react'
import { Link } from 'react-router-dom'
import Image1 from "../../assets/img/treatment-finger-keep-hand-161477.jpeg"

function Banner() {
  return (
    <>
    <div id="small_banner" style={{ backgroundImage: `url(${Image1})` }}>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="head">
              <h1>The best gift <span>to relax someone.</span> </h1>
              <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</h3>
              <Link to="#gift_card"><button className="button" type="button" name="button">get started</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Banner