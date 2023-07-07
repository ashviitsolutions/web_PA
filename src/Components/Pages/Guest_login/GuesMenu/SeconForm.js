import React from "react";
import "./style.css"

import image1 from "../../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg"
import image2 from "../../../assets/img/tender-african-woman-relaxing-enjoying-healthy-spa-massage-with-oil.jpg"
import image3 from "../../../assets/img/pexels-andrea-piacquadio-3764568.jpg"
import image4 from "../../../assets/img/masseur-doing-massage-backbone-man-body-spa-salon-beauty-treatment-concept.jpg"
import image5 from "../../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg"

import image6 from "../../../assets/img/masseur-doing-massage-backbone-man-body-spa-salon-beauty-treatment-concept.jpg"
import image7 from "../../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg"
const SeconForm = () => {
    return (
        <>


            <div id="sec_wiz_2" className="section">
                <div id="page_service_select">
                <span className="title">Select Service &amp; Addons</span>

                    <div id="service_collection" className="product_collector big">
                        <div id="select_service_carousel" className="owl-carousel owl-theme products">
                   

                            <div className="item_wrapper">
                                <div className="item">
                                    <div className="bg" style={{ backgroundImage: `url(${image1})` }}>
                                    </div>
                                    <div className="content">
                                        <span className="title">service name</span>

                                        <p className="excerpt">Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur adipisicing elit</p>

                                        <span className="rate"> <i>$99.39</i> <span className="colored">(20% off)</span> <b>$79.59</b>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="item_wrapper">
                                <div className="item" >
                                    <div className="bg" style={{ backgroundImage: `url(${image2})` }}>
                                    </div>
                                    <div className="content">
                                        <span className="title">service name</span>
                                        <p className="excerpt">Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur
                                            adipisicing elit</p>
                                        <span className="rate"> <i>$99.39</i> <span className="colored">(20% off)</span> <b>$79.59</b>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="item_wrapper">
                                <div className="item" >
                                    <div className="bg" style={{ backgroundImage: `url(${image3})` }}>
                                    </div>
                                    <div className="content">
                                        <span className="title">service name</span>
                                        <p className="excerpt">Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur
                                            adipisicing elit</p>
                                        <span className="rate"> <i>$99.39</i> <span className="colored">(20% off)</span> <b>$79.59</b>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="content" style={{ padding: "0 25px" }}>
                        <div className="gen_heading">
                            <h3>Gender Preference</h3>
                        </div>
                        <ul className="time_options">
                            <li id="g_male" className="gender time_option" active="">Male
                            </li>
                            <li id="g_female" className="gender time_option">
                                Female</li>
                            <li id="g_either" className="gender time_option">
                                Either</li>
                        </ul>

                        <div className="gen_heading">
                            <h3>Select Time</h3>
                        </div>
                        <ul className="time_options">
                            <li id="min_45" className="time_option">
                                60 min</li>
                            <li id="min_60" className="time_option">
                                80 min</li>
                            <li id="min_90" className="time_option">
                                90 min</li>
                        </ul>



                        <div className="gen_heading">
                            <h3>Popular options to consider</h3>
                        </div>

                        <div className="product_collector">
                            <div id="addons_carousel" className="owl-carousel owl-theme products">
                                <div className="item_wrapper">
                                    <div className="item">
                                        <div className="bg" style={{ backgroundImage: `url(${image4})` }}>
                                        </div>
                                        <div className="content">
                                            <span className="title">addon name</span>
                                            <span className="rate"> <i>$99.39</i> <span className="colored">(20% off)</span>
                                                <b>$79.59</b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item_wrapper">
                                    <div className="item">
                                        <div className="bg" style={{ backgroundImage: `url(${image5})` }}>
                                        </div>
                                        <div className="content">
                                            <span className="title">addon name</span>
                                            <span className="rate"> <i>$99.39</i> <span className="colored">(20% off)</span>
                                                <b>$79.59</b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item_wrapper">
                                    <div className="item">
                                        <div className="bg" style={{ backgroundImage: `url(${image6})` }}>
                                        </div>
                                        <div className="content">
                                            <span className="title">addon name</span>
                                            <span className="rate"> <i>$99.39</i> <span className="colored">(20% off)</span>
                                                <b>$79.59</b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item_wrapper">
                                    <div className="item">
                                        <div className="bg" style={{ backgroundImage: `url(${image7})` }}>
                                        </div>
                                        <div className="content">
                                            <span className="title">addon name</span>
                                            <span className="rate"> <i>$99.39</i> <span className="colored">(20% off)</span>
                                                <b>$79.59</b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <button className="button lazy" >next</button>


                    </div>

                </div>
            </div>


        </>
    )
}

export default SeconForm