import React from 'react'
import image1 from "../../assets/img/pexels-cottonbro-3997993.jpg"
import image2 from "../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg"
import image3 from "../../assets/img/tender-african-woman-relaxing-enjoying-healthy-spa-massage-with-oil.jpg"

function Blog() {
  return (
    <>                     
    <div id="blog">
    <div className="container">
        <div className="row">
            <div className="heading content">
                <h3 className="dancing">Latest Blog</h3>
                <p>Lorem ipsum dolor sit amet</p>
                <span className="eff"></span>
            </div>
        </div>
        <div className="row">
            <div id="types">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-1">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="item_wrapper">
                                            <div className="item">
                                                <div className="bg" style={{ backgroundImage: `url(${image1})` ,borderRadius:"7px"}}>
                                                </div>
                                                <div className="content">
                                                    <h3>some blog title here</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                                                    <button className="button small" type="button">read more</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="item_wrapper">
                                            <div className="item">
                                                <div className="bg" style={{ backgroundImage: `url(${image2})` ,borderRadius:"7px"}}>
                                                </div>
                                                <div className="content">
                                                    <h3>Got Sprain ? 5 types of remedies for you.</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                                                    <button className="button small" type="button">read more</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="item_wrapper">
                                            <div className="item">
                                                <div className="bg" style={{ backgroundImage: `url(${image3})` ,borderRadius:"7px"}}>
                                                </div>
                                                <div className="content">
                                                    <h3>7 ways to feel lighter when you wake up.</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                                                    <button className="button small" type="button" >read more</button>
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
</div>
    </>
  )
}

export default Blog