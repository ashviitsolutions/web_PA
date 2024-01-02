import React from 'react'
import { Link } from "react-router-dom"
import Image1 from "../../assets/img/meditate.svg"
import Image2 from "../../assets/img/meditation.svg"
import Image3 from "../../assets/img/sahasrara.svg"
function Profesional() {
  return (
    <>
      <div id="about">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="item">
                <div className="content">
                  <div className="icon" style={{ backgroundImage: `url(${Image1})`, borderRadius: "7px" }}>
                  </div>
                  <h3>professional service providers</h3>
                  <p>
                    Professional service providers offer specialized expertise in areas like law, accounting, and consulting. They deliver professional advice and solutions to businesses and individuals, leveraging their specific knowledge and skills</p>
                  <Link className="anchors" to="#">read more</Link>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="item">
                <div className="content">
                  <div className="icon" style={{ backgroundImage: `url(${Image2})`, borderRadius: "7px" }}>
                  </div>
                  <h3>rejuvenate your body</h3>
                  <p>Revitalize your body with rejuvenating practices. Incorporate exercise, balanced nutrition, and sufficient rest to enhance overall well-being. Prioritize self-care to boost energy levels, reduce stress, and promote a healthier, more vibrant you.</p>
                  <Link className="anchors" to="#">Read more</Link>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="item">
                <div className="content">
                  <div className="icon" style={{ backgroundImage: `url(${Image3})`, borderRadius: "7px" }}>
                  </div>
                  <h3>clean environments</h3>
                  <p>
                    Create clean environments for optimal well-being. Ensure spaces are tidy, well-ventilated, and free of pollutants. Embrace sustainable practices to promote a healthier planet and enhance the quality of life for yourself and those around you.</p>
                  <Link className="anchors" to="#">Read more</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>





    </>
  )
}

export default Profesional