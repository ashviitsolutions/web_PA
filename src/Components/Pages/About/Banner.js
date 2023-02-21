import React from 'react'
import Image1 from "../../assets/img/pexels-sergey-torbik-7365442.jpg"

function Banner() {
  return (
    <>
    <div id="small_banner" style={{ backgroundImage: `url(${Image1})` ,borderRadius:"7px"}} >
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <div className="head" >
            <h1>Private events.</h1>
            <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</h3>
          </div>
        </div>
      </div>
    </div>
  </div>


    </>
  )
}

export default Banner