import React from 'react'
import { Link } from 'react-router-dom'   
import Image1 from "../../assets/img/treatment-finger-keep-hand-161477.jpeg"
import Image2 from "../../assets/img/meditate.svg"
import Image3 from "../../assets/img/meditation.svg"
import Image4 from "../../assets/img/sahasrara.svg"



function About() {
    return (                      
        <>
        
        <div id="about">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="left_half">
                <img className="img-responsive" src={Image1} alt="..." style={{borderRadius:"12px" , height:"50vh",paddingLeft:"10vh"}}/>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="about_content">
                <span>Lorem ipsum dolor...</span>
                <h3>about productive alliance</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..</p>
                <button className="button primary" type="button">get started</button>
                <button className="button ghost" type="button">see services</button>
               
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-sm-4">
              <div className="item">
                <div className="content">
                  <div className="icon" style={{ backgroundImage: `url(${Image2})` ,borderRadius:"7px"}}>
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
                  <div className="icon" style={{ backgroundImage: `url(${Image3})` ,borderRadius:"7px"}}>
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
                  <div className="icon"  style={{ backgroundImage: `url(${Image4})` ,borderRadius:"7px"}}>
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
        </>
    )
}

export default About