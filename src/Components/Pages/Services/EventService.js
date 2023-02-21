import React from 'react'
import { Link } from 'react-router-dom'
import Image1 from "../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg"
import Image2 from "../../assets/img/masseur-doing-massage-backbone-man-body-spa-salon-beauty-treatment-concept.jpg"
import Image3 from "../../assets/img/tender-african-woman-relaxing-enjoying-healthy-spa-massage-with-oil.jpg"

function EventService() {
    return (
        <>


            <div id="types" >
                <div id="classNamees">
                    <div className="container" >
                        <div className="row">
                            <div className="gutter">
                                <div className="heading">
                                    <h3>event services</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-10 col-sm-offset-1">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-4 col-xs-12">
                                            <div className="item_wrapper">
                                                <div className="item" id='servicecart'>
                                                    <div className="bg" style={{ backgroundImage: `url(${Image1})`, borderRadius: "7px" }} >
                                                    </div>
                                                    <div className="text content">
                                                        <h3>Title Goes here</h3>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                                                        <div className="text">
                                                            <Link to="#" className="anchor" id='anchors'>book now</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-xs-6">
                                            <div className="item_wrapper">
                                                <div className="item" id='servicecart'>
                                                    <div className="bg" style={{ backgroundImage: `url(${Image2})`, borderRadius: "7px" }} >
                                                    </div>
                                                    <div className="text content">
                                                        <h3>Title Goes here</h3>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                                                        <div className="text">
                                                            <Link to="#" className="anchor" id='anchors'>book now</Link>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-xs-6">
                                            <div className="item_wrapper">
                                                <div className="item" id='servicecart'>
                                                    <div className="bg" style={{ backgroundImage: `url(${Image3})`, borderRadius: "7px" }} >
                                                    </div>
                                                    <div className="text content">
                                                        <h3>Title Goes here</h3>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                                                        <div className="text">
                                                            <Link to="#" className="anchor" id='anchors'>book now</Link>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
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

export default EventService