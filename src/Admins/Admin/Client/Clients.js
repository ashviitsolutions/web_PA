import React from 'react'
import { Link } from 'react-router-dom'
import "./style.css"



function Clients() {
    return (
        <>

            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="">
                            <div className="headings float_wrapper" id='clientget'>
                            <div className="gutter pull-left" >
                                    <h3>All Clients</h3>
                                    <p>list of all Clients</p>
                                </div>
                                <div className="gutter pull-left">
                                    <Link to="/admin/clients/add_client">
                                        <button  className="button small primary" type="button" >Add Client</button>
                                    </Link>
                                </div>
                                <span className="toggle_sidebar" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="gutter">
                            <div className="card layer1 filters">
                                <div className="input_group">
                                    <select name="" id="" className="input">
                                        <option value="">status</option>
                                        <option value="">active</option>
                                        <option value="">banned</option>
                                        <option value="">trashed</option>
                                    </select>
                                    <span className="highlight"></span>
                                </div>
                                <div className="input_group">
                                    <input type="date" className="input" placeholder="Created At" />
                                    <span className="highlight"></span>
                                </div>
                                <div className="input_group pull-right" style={{ maxWidth: "20%" }}>
                                    <input type="text" className="input" placeholder="search here.." />
                                    <span className="highlight"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="gutter">
                            <table className="table-responsive ultra_responsive">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="md-checkbox">
                                                <input id="i3" type="checkbox" />
                                                <label for="i3"></label>
                                            </div>
                                        </th>
                                        <th>Title</th>
                                        <th>about</th>
                                        <th>Created at</th>
                                        <th>Created by</th>
                                    </tr>
                                </thead>
                                <tbody id="post_container">
                                    <tr className="wrapper" id="tr_post_77">
                                        <td>
                                            <div className="md-checkbox">
                                                <input id="i3" type="checkbox" />
                                                <label for="i3"></label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="content">
                                                <Link to="/admin/clients/edit_client">
                                                    <span className="title">john doe</span>
                                                </Link>
                                                <div className="controls">
                                                    <Link className="trash_btn anchor_lite" to="#">trash</Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td>Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit</td>
                                        <td>2022-11-08 01:08:20</td>
                                        <td>admin</td>
                                    </tr>
                                    <tr className="wrapper" id="tr_post_76">
                                        <td>
                                            <div className="md-checkbox">
                                                <input id="i3" type="checkbox" />
                                                <label for="i3"></label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="content">
                                                <Link to="/admin/clients/edit_client">
                                                    <span className="title">john doe</span>
                                                </Link>
                                                <div className="controls">
                                                    <Link className="trash_btn anchor_lite" to="#">trash</Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td>Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit</td>
                                        <td>2022-11-08 01:50:37</td>
                                        <td>admin</td>
                                    </tr>
                                    <tr className="wrapper" id="tr_post_71">
                                        <td>
                                            <div className="md-checkbox">
                                                <input id="i3" type="checkbox" />
                                                <label for="i3"></label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="content">
                                                <Link to="add_client.php?id=71">
                                                    <span className="title">john doe</span>
                                                </Link>
                                                <div className="controls">
                                                    <Link className="trash_btn anchor_lite" to="#">trash</Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td>Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit</td>
                                        <td>2022-11-08 01:06:41</td>
                                        <td>admin</td>
                                    </tr>
                                    <tr className="wrapper" id="tr_post_69">
                                        <td>
                                            <div className="md-checkbox">
                                                <input id="i3" type="checkbox" />
                                                <label for="i3"></label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="content">
                                                <Link to="add_client.php?id=69">
                                                    <span className="title">john doe</span>
                                                </Link>
                                                <div className="controls">
                                                    <Link className="trash_btn anchor_lite" to="#">trash</Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td>For A Long Time</td>
                                        <td>2022-11-08 12:49:59</td>
                                        <td>admin</td>
                                    </tr>
                                    <tr className="wrapper" id="tr_post_68">
                                        <td>
                                            <div className="md-checkbox">
                                                <input id="i3" type="checkbox" />
                                                <label for="i3"></label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="content">
                                                <Link to="add_client.php?id=68">
                                                    <span className="title">john doe</span>
                                                </Link>
                                                <div className="controls">
                                                    <Link className="trash_btn anchor_lite" to="#">trash</Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td>In Quality</td>
                                        <td>2022-11-08 12:49:40</td>
                                        <td>admin</td>
                                    </tr>
                                    <tr className="wrapper" id="tr_post_67">
                                        <td>
                                            <div className="md-checkbox">
                                                <input id="i3" type="checkbox" />
                                                <label for="i3"></label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="content">
                                                <Link to="/admin/clients/edit_client">
                                                    <span className="title">john doe</span>
                                                </Link>
                                                <div className="controls">
                                                    <Link  className="trash_btn anchor_lite" to="#">trash</Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td>For Every Occasion</td>
                                        <td>2022-11-08 12:49:22</td>
                                        <td>admin</td>
                                    </tr>
                                    <tr className="wrapper" id="tr_post_66">
                                        <td>
                                            <div className="md-checkbox">
                                                <input id="i3" type="checkbox" />
                                                <label for="i3"></label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="content">
                                                <Link to="add_client.php?id=66">
                                                    <span className="title">john doe</span>
                                                </Link>
                                                <div className="controls">
                                                    <Link className="trash_btn anchor_lite" to="#">trash</Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td>In Trends</td>
                                        <td>2022-11-08 12:47:06</td>
                                        <td>admin</td>
                                    </tr>
                                </tbody>


                            </table>
                        </div>
                        <div className="pagination_wrapper">
                            <ul className="pagination pull-right">
                                <li checked>Prev</li>
                                <li checked>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li checked>Next</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Clients