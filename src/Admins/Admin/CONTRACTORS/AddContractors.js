import React from 'react'

function AddContractors() {
    return (
        <>
            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="">
                            <div className="headings float_wrapper">
                                <div className="gutter pull-left" style={{ paddingLeft: "0" }}>
                                    <h3>Add Contractor</h3>
                                </div>
                                <span className="toggle_sidebar" ></span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="gutter">
                                <div className="card layer1">
                                    <div className="inner">
                                        <label className="card_label" htmFor="">Personal InhtmFormation</label>

                                        <div className="input_group">
                                            <input className="input" type="text" name="title" value="" required="" />
                                            <label htmFor="">Name</label>
                                            <span className="highlight"></span>
                                        </div>

                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <div className="input_group">
                                                        <input className="input" type="text" name="title" value="" required="" />
                                                        <label htmFor="">Email</label>
                                                        <span className="highlight"></span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="input_group">
                                                        <input className="input" type="text" name="title" value="" required="" />
                                                        <label htmFor="">Phone</label>
                                                        <span className="highlight"></span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="input_group">
                                                        <select name="" id="" className="input">
                                                            <option value="">select gender</option>
                                                            <option value="">male</option>
                                                            <option value="">female</option>
                                                        </select>
                                                        <label htmFor="">gender</label>
                                                        <span className="highlight"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">

                                                <label className="card_label" htmFor="">City You would like to work in</label>

                                                <div className="col-sm-6">
                                                    <div className="input_group">
                                                        <input className="input" type="text" name="title" value="" required="" />
                                                        <label htmFor="">Zip Code</label>
                                                        <span className="highlight"></span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="input_group">
                                                        <input className="input" type="text" name="title" value="" required="" />
                                                        <label htmFor="">City</label>
                                                        <span className="highlight"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="input_group">
                                            <label htmFor="" className="static">Select Service</label>
                                            <textarea id="ckeditorIdDescription" className="input" name="excerpt" rows="6"></textarea>
                                        </div>
                                        <div id="post_attachments" className="input_group float_wrapper">
                                            <div className="attachment_wrapper">
                                                <input type="file" className="hidden" id="select_file_html" />
                                   
                                            </div>
                                        </div>
                                        <div className="input_group">
                                            <button className="button primary square lazy">Save Contractor</button>
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

export default AddContractors