import React from 'react'
import { Link } from 'react-router-dom'


function Provider() {
  return (
    <>
    <div id="about">
    <div className="container">
        <div className="row">
            <div className="col-sm-4">
                <div className="item">
                    <div className="content">
                        <div className="icon">
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
                        <div className="icon" >
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
                        <div className="icon" >
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