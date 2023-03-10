// import React from 'react'
// import Sidebar from '../../Sidebar/Sidebar'

// function addPost() {
//   return (
//     <>
//     <Sidebar/>
//     <div id="content">
//     <div class="container-fluid">
//     <div class="row">
//         <div class="">
//             <div class="heading float_wrapper">
//                 <div class="gutter pull-left" style={{paddingLeft:0}}>
//                     <h3>Add post</h3>
//                 </div>
//                 <span class="toggle_sidebar" ></span>
//             </div>
//         </div>
//     </div>

//     <div class="row">
//         <div class="col-sm-8">
//             <div class="gutter">
//                 <div class="card layer1">
//                     <div class="inner">
//                         <label class="card_label" for="">General Information</label>
     
//                         <div class="input_group">
//                             <input class="input" type="text" name="title" value="" required=""/>
//                             <label for="">title</label>
//                             <span class="highlight"></span>
//                         </div>
          
//                         <div class="input_group">
//                             <textarea class="input" name="excerpt" rows="2"></textarea>
//                             <label for="">Excerpt</label>
//                             <span class="highlight"></span>
//                         </div>
              
//                         <div class="input_group">
//                             <label for="" class="static">Description</label>
//                             <textarea id="ckeditorIdDescription" class="input" name="excerpt" rows="6"></textarea>
//                         </div>
                
//                         <div class="input_group">
//                             <input class="input" type="number" name="title" value="" required=""/>
//                             <label for="">price in USD</label>
//                             <span class="highlight"></span>
//                         </div>
                 
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div class="col-sm-4">
//             <div class="gutter">
//                 <div class="card layer1">
//                     <div class="inner">
//                         <label class="card_label" for="">Post Actions</label>
//                         <div class="input_group">
//                             <button id="publish_btn" class="primary square button" type="button" name="button">publish</button>
//                         </div>
//                     </div>
//                 </div>
             
//                 <div class="card layer1">
//                     <div class="inner">
//                         <label class="card_label" for="">Select Marketplace</label>
//                         <div class="input_group">
//                             <select name="" id="" class="input" multiple="true" style={{minHeight: "200px"}}>
//                                 <option value="">on demand</option>
//                                 <option value="">corporate events</option>
//                                 <option value="">private events</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>
          
//                 <div class="card layer1">
//                     <div class="inner">
//                         <label for="" class="card_label">Attachments</label>
//                         <input id="attachment_ids" class="input hidden" type="text" name="attachment_ids" value=""/>
//                         <div id="post_attachments" class="input_group float_wrapper">
//                             <div class="attachment_wrapper">
//                                 <input type="file" class="hidden" id="select_file_html"/>
//                                 <div thumbnail="medium" class="image_placeholder" >
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// </div>
//     </>
//   )
// }

// export default addPost



import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../Sidebar/Sidebar'

function GetPost() {
    return (
        <>
        <Sidebar/>
        <div id="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="">
                        <div className="heading float_wrapper">
                            <div className="gutter pull-left" style={{paddingLeft:"0"}}>
                                <h3>all services</h3>
                                <p>list of all add services available throughout the system</p>
                            </div>
                            <div className="gutter pull-left">
                                <Link to="/services/add_service">
                                    <button style={{minHeight:"35px"}} className="button small primary" type="button" name="button">Add New</button>
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
                                    <option value="">draft</option>
                                    <option value="">published</option>
                                    <option value="">trashed</option>
                                </select>
                                <span className="highlight"></span>
                            </div>
                            <div className="input_group">
                                <select name="" id="" className="input">
                                    <option value="">select type</option>
                                    <option value="">Home</option>
                                    <option value="">Banner</option>
                                    <option value="">Offer Post</option>
                                    <option value="">Join Our Team</option>
                                    <option value="">Corporate Events</option>
                                    <option value="">Private Events</option>
                                    <option value="">Massage On Demand</option>
                                    <option value="">Policies</option>
                                    <option value="">Become a Member</option>
                                </select>
                                <span className="highlight"></span>
                            </div>
                            <div className="input_group">
                                <input type="date" className="input" placeholder="Start Date" />
                                <span className="highlight"></span>
                            </div>
                            <div className="input_group pull-right" style={{maxWidth: "20%"}}>
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
                                    <th>Excerpt</th>
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
                                            <Link to="/services/edit_post">
                                                <span className="title">some title here</span>
                                            </Link>
                                            <div className="controls">
                                                <Link  className="trash_btn anchor_lite" to="#">trash</Link>
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
                                            <Link to="/services/edit_post">
                                                <span className="title">some title here</span>
                                            </Link>
                                            <div className="controls">
                                                <Link  className="trash_btn anchor_lite" to="#">trash</Link>
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
                                            <Link to="/services/edit_post">
                                                <span className="title">some title here</span>
                                            </Link>
                                            <div className="controls">
                                                <Link  className="trash_btn anchor_lite" to="#">trash</Link>
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
                                            <Link to="/services/edit_post">
                                                <span className="title">some title here</span>
                                            </Link>
                                            <div className="controls">
                                                <Link  className="trash_btn anchor_lite" to="#">trash</Link>
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
                                            <Link to="/services/edit_post">
                                                <span className="title">some title here</span>
                                            </Link>
                                            <div className="controls">
                                                <Link  className="trash_btn anchor_lite" to="#">trash</Link>
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
                                            <Link to="/services/edit_post">
                                                <span className="title">some title here</span>
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
                                            <Link to="/services/edit_post">
                                                <span className="title">some title here</span>
                                            </Link>
                                            <div className="controls">
                                                <Link  className="trash_btn anchor_lite" to="#">trash</Link>
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

export default GetPost
// <button onClick={() => handleDelete(cur._id)}>Delete</button>
