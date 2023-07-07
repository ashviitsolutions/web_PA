import React from 'react'
import { Link } from 'react-router-dom'
import Image2 from "../../../../assets/img/meditate.svg"
import Image3 from "../../../../assets/img/meditation.svg"
import Image4 from "../../../../assets/img/sahasrara.svg"

function Provider() {
  return (
    <>
    <div id="about">
    <div className="container">
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
                        <div className="icon" style={{ backgroundImage: `url(${Image4})` ,borderRadius:"7px"}}>
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

export default Provider