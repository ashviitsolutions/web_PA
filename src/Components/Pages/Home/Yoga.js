import React from 'react'

import Imge1 from "../../assets/img/pexels-cottonbro-3997993.jpg"
import Imge2 from "../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg";
import Imge3 from "../../assets/img/tender-african-woman-relaxing-enjoying-healthy-spa-massage-with-oil.jpg"


function Yoga() {
    return (
        <>
            <div id="types" >
                <div className="container" >
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-1">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-4 col-xs-12">
                                        <div className="item_wrapper">
                                            <div className="item">
                                                <div className="bg" style={{ backgroundImage: `url(${Imge1})` ,borderRadius:"7px" }} >
                                                </div>
                                                <div className="content">
                                                    <h3>Massage on demand</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                                                    <button className="button small" type="button">book now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-xs-6">
                                        <div className="item_wrapper">
                                            <div className="item">
                                                <div className="bg" style={{ backgroundImage: `url(${Imge2})`,borderRadius:"7px" }} >
                                                </div>
                                                <div className="content">
                                                    <h3>Corporate Events</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                                                    <button className="button small" type="button">book now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-xs-6">
                                        <div className="item_wrapper">
                                            <div className="item">
                                                <div className="bg" style={{ backgroundImage: `url(${Imge3})` ,borderRadius:"7px"}} >

                                                </div>
                                                <div className="content">
                                                    <h3>Private Events</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                                                    <button className="button small" type="button">book now</button>
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

export default Yoga