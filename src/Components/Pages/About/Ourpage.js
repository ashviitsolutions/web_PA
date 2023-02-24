import React from 'react'
import Image1 from "../../assets/img/pexels-cottonbro-3997983.jpg"

function Ourpage() {
  return (
    <>
    <div id="alternate_post">
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <div className="bg">
          </div>
        </div>
        <div className="col-sm-6" >
          <div className="heading" >
            <h3>our story</h3>
            <p id='storypara'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <div className="heading">
            <h3>Our Culture</h3>
            <p id='storypara'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>

            <ul className="true">
              <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, </li>
              <li>sed do eiusmod tempor incididunt ut labore</li>
              <li>ea commodo consequat. Duis aute irure dolor in reprehenderit </li>
            </ul>

          </div> 
        </div>
        <div className="col-sm-6">
          <div className="bg" style={{ backgroundImage: `url(${Image1})` ,borderRadius:"7px"}}>
          </div>
        </div>
      </div>
    </div>
  </div>

    </>
  )
}

export default Ourpage