import React from 'react'
import { Link } from 'react-router-dom'
import image1 from "../../assets/img/treatment-finger-keep-hand-161477.jpeg"

function Banner() {
  return (
    <>
    <div id="small_banner" style={{ backgroundImage: `url(${image1})` }}>
    <div className="container">
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <div className="head" style={{textAlign: "center"}}>
            <h1>Membership Plan</h1>
            <h3>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus ratione molestias corrupti unde.</h3>
            <Link to="book">
              <button className="button" type="button" name="button">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default Banner