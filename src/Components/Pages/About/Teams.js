import React from 'react'
import Member from '../Services/Submenu/Member'
import Image1 from "../../assets/img/istockphoto-1300512215-612x612.jpg"
import Image2 from "../../assets/img/template_3.jpg"
import Image3 from "../../assets/img/photo-1480455624313-e29b44bbfde1.jfif"
function Teams() {
  return (
    <>
    <div id='types'>
    <div id="classNamees">
    <div className="container">
      <div className="row">
        <div className="gutter">
          <div className="heading">
            <h3 >Our Team</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center" >
        <div className="col-sm-4">
          <div className="item_wrapper" >
            <div className="className_brief item card layer1">
              <div className="bg" style={{ backgroundImage: `url(${Image1})` ,borderRadius:"7px"}}>
              </div>
              <div className="text float_wrapper">
              </div>
              <div className="text content">
                <h3>Name Goes here</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
              </div>
              <div className="text">
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="item_wrapper">
            <div className="className_brief item card layer1">
              <div className="bg" style={{ backgroundImage: `url(${Image2})` ,borderRadius:"7px"}}>
              </div>
              <div className="text float_wrapper">
              </div>
              <div className="text content">
                <h3>Name Goes here</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
              </div>
              <div className="text">
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="item_wrapper">
            <div className="className_brief item card layer1">
              <div className="bg" style={{ backgroundImage: `url(${Image3})` ,borderRadius:"7px"}}>
              </div>
              <div className="text float_wrapper">
              </div>
              <div className="text content">
                <h3>Name Goes here</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
              </div>
              <div className="text">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
 
  <Member/>
    </>
  )
}

export default Teams