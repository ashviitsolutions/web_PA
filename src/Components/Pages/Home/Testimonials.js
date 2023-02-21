import React from 'react'
import image1 from "../../assets/img/pexels-matheus-bertelli-1906157.jpg"
import image2 from "../../assets/img/preview16.jpg"

function Testimonials() {
  return (
    <>
    <div id="testimonials">
  <div className="container">
    <div className="row">
      <div className="heading" style={{textAlign:"center"}}>
        <h3>testimonials</h3>
        <p>people who changed their lives</p>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-6">
        <div className="item_wrapper">
          <div className="item">          
            <div className="avatar"  style={{ backgroundImage: `url(${image1})` }}>
            </div>
            <div className="content">
              <div className="inner">
                <h3>john doe</h3>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="item_wrapper">
          <div className="item right">
            <div className="avatar" style={{ backgroundImage: `url(${image2})`, backgroundPosition:"top" }}>
            </div>
            <div className="content">
              <div className="inner">
                <h3>jane doe</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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

export default Testimonials