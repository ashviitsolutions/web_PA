import React from 'react'
import { Link } from 'react-router-dom'

function Contact() {
    return (
        <>

            <div id="contact_us">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card_wrapper">
                                <div className="heading">
                                    <h3>Any  Questions ?</h3>
                                    <p>fill this form and our expert will be in touch with you soon.</p>
                                </div>
                                <div className="content">
                                    <div className="">
                                        <p>you can call us on </p>
                                        <Link to="tel: 9876543210"><span className="phone">9876543210</span></Link>
                                    </div>
                                    <div className="">
                                        <p>or write to us on </p>
                                        <Link to="mailto:info@productivealliance.com"><span className="phone">info@productivealliance.com</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-sm-5 col-sm-offset-1">
                            <div className="card_wrapper">
                                <form className="card layer1" action="sendemail" method="post">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="input_group">
                                                    <Field
                                                        className="input"
                                                        name="title"
                                                        type="text"
                                                        placeholder="Title"
                                                    />
                                                    {errors.title && touched.title ? (
                                                        <div>{errors.title}</div>
                                                    ) : null}
                                                    <label for="">your name</label>
                                                    <span className="highlight"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="input_group">
                                                    <input className="input" type="text" name="contact_number" value="" required="" placeholder="" />
                                                    <label for="">your contact number</label>
                                                    <span className="highlight"></span>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="input_group">
                                                    <input className="input" type="text" name="email" value="" required="" placeholder="" />
                                                    <label for="">your email</label>
                                                    <span className="highlight"></span>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="input_group">
                                                    <label className="static" for="">your query</label>
                                                    <textarea className="input" name="message" rows="3" cols="80"></textarea>
                                                    <span className="highlight"></span>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="input_group">
                                                    <button style={{ width: "100%" }} className="button" type="submit" name="button">send</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Contact