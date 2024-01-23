import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { IP } from '../../../Constant';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import avtar from "../../img/avtar.jpg"
import ReactPaginate from 'react-paginate';


const PreviewImage = ({ attachments }) => {
  const [imageObjectURL, setImageObjectURL] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(`${IP}/file/${attachments}`);
      const imageBlob = await res.blob();
      const objectURL = URL.createObjectURL(imageBlob);
      setImageObjectURL(objectURL);
      console.log("image", res);
    };

    fetchImage();
  }, [attachments]);

  return (
    <div>
      {imageObjectURL && (
        <img
          src={imageObjectURL || avtar}
          alt="No Image uploaded"
          className="previewimage"
          style={{
            borderRadius: "10px",
            height: "80px",
            marginTop: "10px",
            marginLeft: "70px",
          }}
        />
      )}
    </div>
  );
};



function Payments() {
  const [data, setData] = useState(1);
  const [count, setCount] = useState(0);

  let token = localStorage.getItem("tokenadmin");
  const [user, setUser] = useState([]);


  useEffect(() => {
    fetch(`${IP}/contractor/get`, {
      headers: {
        'Authorization': token
      }
    }).then(resp => {
      return resp.json()
    }).then(result => {
      // Filter the result based on the application_status condition
      const filteredResult = result.filter(item => item.application_status >= 3);

      setUser(filteredResult);
      setCount(filteredResult.length);
      console.log("contractor", filteredResult);
    }).catch(err => {
      console.log(err);
    });
  }, [data]);


  const handlePageClick = (data) => {
    setData(data.selected + 1);
  };

  // const memoizedUser = useMemo(() => {
  //     return user.slice((data - 1) * 10, data * 10);
  // }, [user, data]);

  const memoizedUser = useMemo(() => {
    if (Array.isArray(user)) {
      return user.slice((data - 1) * 10, data * 10);
    } else {
      // Handle the case when user is not an array
      console.error("User is not an array");
      return []; // or handle it in a way that makes sense for your use case
    }
  }, [user, data]);

  return (
    <>
      <div id="content">
        <div class="container-fluid">
          <div class="row">
            <div class="">
              <div class="headings">
                <h3>Payments</h3>
                <span class="toggle_sidebar" ></span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="gutter">
              <div class="card layer1 filters">
                <div class="input_group">
                  <input type="date" class="input" placeholder="Start Date" />
                  <span class="highlight"></span>
                </div>
                <div class="input_group">
                  <input type="date" class="input" placeholder="End Date" />
                  <span class="highlight"></span>
                </div>
                <div class="input_group">
                  <select name="" id="" class="input">
                    <option value="">status</option>
                    <option value="">pending</option>
                    <option value="">completed</option>
                  </select>
                  <span class="highlight"></span>
                </div>
                <div class="input_group">
                  <select name="" id="" class="input">
                    <option value="">select event type</option>
                    <option value="">private events</option>
                    <option value="">corporate events</option>
                  </select>
                  <span class="highlight"></span>
                </div>
                <div class="input_group">
                  <select name="" id="" class="input">
                    <option value="">service</option>
                    <option value="">service a</option>
                    <option value="">service b</option>
                    <option value="">service c</option>
                    <option value="">service d</option>
                    <option value="">service e</option>
                  </select>
                  <span class="highlight"></span>
                </div>
                <div class="input_group pull-right" style={{ maxWidth: "20%" }}>
                  <input type="text" class="input" placeholder="search here.." />
                  <span class="highlight"></span>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="gutter">
              <div class="card" style={{ padding: "25px 15px" }}>
                <h3 class="pull-right" style={{ margin: "0", fontSize: "17px" }}>Pending : $800</h3>
                <h3 class="pull-right" style={{ margin: "0", fontSize: "17px", marginLight: "20px" }}>Total Earning : $450</h3>
              </div>
            </div>
          </div>



          {memoizedUser.map((cur, index) => (
            <div class="row">
              <div class="gutter">
                <div class="bookings">
                  <div class="item_wrapper">
                    <div class="item card layer1">
                      <React.Fragment key={index}>
                        <tbody id="post_container">
                          <tr className="wrapper" id="tr_post_77">
                            <td>
                              <div className="avatar_wrap">
                                <div className="inner">
                                  <div className='preview' style={{
                                    width: "50%",
                                    //  height:"80px",
                                    backgroundSize: "cover",

                                  }}>
                                    <PreviewImage className="avatar" attachments={cur.images} />
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="content">
                                <span className="title" >{`${cur.first_name} ${cur.last_name}`} </span>
                                <span className="title" style={{ display: "block", fontSize: "12px" }}>{cur.email}</span>
                              </div>
                            </td>


                          </tr>
                        </tbody>
                      </React.Fragment>
                      <div class="second_half">
                        <span>$70</span>
                        <span>+15 pre-tip</span>
                        <span class="colored">Total = $85</span>
                        <button class="button primary square">Release Payment</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>




















          ))}






        </div>
        <div className='pagination'  >
          <ReactPaginate
            itemsPerPage={10}
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={"..."}
            pageCount={Math.ceil(count / 10)}
            marginPagesDisplayed={3}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            // css apply on pagination
            containerClassName={'pagination justify-content-center py-3'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        </div>
      </div>
    </>
  )
}

export default Payments