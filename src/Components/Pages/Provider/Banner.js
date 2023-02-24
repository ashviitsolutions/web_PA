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
          <div className="head" >
         
            <h1>Be your own Boss</h1>
            <h3>Join the world’s largest network of independent wellness professionals to earn 2-3x more than industry standards, when and wherever you want.</h3>
       
            <Link to="#services_tabs">
              <button className="button" >Join Our Team</button>
            </Link>
            <Link target="_blank" to="http://45.13.132.197:8082/">
              <button className="button negative">login</button>
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