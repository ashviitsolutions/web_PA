import React from 'react'
const image="https://techy.co.in/projects/new_dash/admin/decor/img/uploads/photo-1508908324153-d1a219719814.jfif"
function ViewContractor() {
  return (
    <>
    <div id="content">
    <div className="container-fluid">
    <div className="row">
        <div className="">
            <div className="headings float_wrapper">
                <div className="gutter pull-left" style={{paddingLeft:"0"}}>
                    <h3>View Contractor</h3>
                </div>
                <span className="toggle_sidebar" ></span>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col-sm-6">
            <div className="gutter">
                <div id="about_user_card" className="card layer2">
                    <div className="avatar_wrap">
                        <div className="avatar" style={{ backgroundImage: `url(${image})` }}>
                        </div>
                        <span className="name">John Doe</span>
                    </div>
                    <h3 className="inner_title">Contact Info</h3>
                    <ul className="true">
                        <li><b>phone:</b> 9876354125</li>
                        <li><b>email:</b> johndoe@yahoo.co.in</li>
                        <li><b>working city:</b> zagreb</li>
                    </ul>
                    <h3 className="inner_title">Experience</h3>
                    <div className="education_wrap">
                        <div className="education">
                            <span className="time"> <b>2018 - 2019</b> </span>
                            <p> <b>some service in some company,</b> metropolitian university , hungary </p>
                        </div>
                        <div className="education">
                            <span className="time"> <b>2014 - 2018</b> </span>
                            <p> <b>other service in other company ,</b> metropolitian university , hungary </p>
                        </div>
                    </div>
                    <h3 className="inner_title">Tax Form</h3>
                    <div id="post_attachments" className="input_group float_wrapper">
                        <div className="attachment_wrapper">
                            <input type="file" className="hidden" id="select_file_html"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
            <div className="card layer1 padded">
                <h3 className="inner_title">Delivery History</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>user's name</th>
                            <th>booking date &amp; time</th>
                            <th>tips earned</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <span className="name">sayam arora</span>
                            </td>
                            <td>12-08-2019 || 04:00 am</td>
                            <td>$ 1</td>
                            <td>open</td>
                        </tr>
                        <tr>
                            <td><span className="name">rahul</span></td>
                            <td>12-08-2019 || 04:00 am</td>
                            <td>$ 0</td>
                            <td>delivered</td>
                        </tr>
                        <tr>
                            <td><span className="name">shivani</span></td>
                            <td>12-08-2019 || 04:00 am</td>
                            <td>$ 0</td>
                            <td>delivered</td>
                        </tr>
                        <tr>
                            <td><span className="name">vishal</span></td>
                            <td>12-08-2019 || 04:00 am</td>
                            <td>$ 2</td>
                            <td>delivered</td>
                        </tr>
                        <tr>
                            <td><span className="name">mayank</span></td>
                            <td>12-08-2019 || 04:00 am</td>
                            <td>$ 8</td>
                            <td>cancelled</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>

       
    </div>
    </div>

    </>
  )
}

export default ViewContractor