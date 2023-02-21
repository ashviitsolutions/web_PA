import React from 'react'
import Image1 from "../../assets/img/pexels-ivan-samkov-5659057.jpg"

function Provider() {
    return (
        <>
            <div id="provider">                  
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="heading">
                                <h3>Become a provider</h3>
                                <h2>Join our community of proffessional providers</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>
                                <button className="button" type="button">become provider</button>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="right_half">
                            <img src={Image1} alt="..." style={{borderRadius:"7px"}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Provider