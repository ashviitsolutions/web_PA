import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { IP } from '../../../Constant';
import { FallingLines } from "react-loader-spinner";
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Rating from "react-rating-stars-component";



const PreviewImage = ({ attachments }) => {
  const [imageObjectURL, setImageObjectURL] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(`${IP}/file/${attachments}`);
      const imageBlob = await res.blob();
      const objectURL = URL.createObjectURL(imageBlob);
      setImageObjectURL(objectURL);
    };

    fetchImage();
  }, [attachments]);

  return (
    <div>
      {imageObjectURL && <img src={imageObjectURL} alt="Preview" className="previewimage" />}
    </div>
  );
};

function Review() {

  const [userRating, setUserRating] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const startDates = location.state ? location.state.startDate : "";
  const endDates = location.state ? location.state.endDate : "";
  const [user, setUser] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(null);
  const [startDate, setStartDate] = useState(startDates); // Initialize with startDates
  const [endDate, setEndDate] = useState(endDates); // Initialize with endDates
  const [status, setStatus] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${IP}/user/reviews`).then(resp => resp.json())
      .then(result => {
        console.log("result", result)
        if (result && result.length > 0) {
          setUser(result);
          setLoading(false);

        }
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setLoading(false);
      });
  }, []);


















  console.log("Users fetched:", user);









  // Handle date change
  useEffect(() => {
    // Update startDate and endDate when startDates or endDates change
    setStartDate(startDates);
    setEndDate(endDates);
  }, [startDates, endDates]);

  const handleInfiniteScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => {
      window.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, []);


  const handleFilter = () => {
    // Filter data based on selected dates, status, and search text
    const filteredData = user.filter(cur => {
      const isWithinDateRange = (!startDate || new Date(cur.createdAt) >= new Date(startDate)) &&
        (!endDate || new Date(cur.createdAt) <= new Date(endDate));
      const isSearched = !searchText || (cur.reviewerName.toLowerCase().includes(searchText.toLowerCase()) || cur.userEmail.toLowerCase().includes(searchText.toLowerCase()));
      return isWithinDateRange && isSearched;
    });
    return filteredData;
  };


  const memoizedUser = handleFilter();

  console.log("memoizedUser", memoizedUser)

  const handlenavigate = (id) => {
    navigate(`/admin/contractors/view_contractor/${id}`)
  }


  const handlenavigateClinet = (userd) => {
    // Combine first_name and last_name
    const fullName = `${userd}`;

    // Navigate with the full name included in the state
    navigate(`/admin/clients-service-details`, { state: { startDate, endDates, name: fullName } });
  };

  return (
    <>
      <div id="content">
        <div className="container-fluid">
          <div className="row">
            <div className="">
              <div className="headings float_wrapper">
                <div className="gutter pull-left">
                  <h3><span className='link title backarrow' onClick={() => navigate(-1)}>&larr;</span> All Customer review</h3>
                  <p>List of customer feedbacks</p>
                </div>
                <div className="gutter pull-right">
                  <small className='sub'>
                    <p>* Click on the provider name to view provider profile</p>
                    <p>* Click on the client name to view client profile</p>
                  </small>
                </div>
                <span className="toggle_sidebar"></span>
              </div>
            </div>
          </div>


          <div class="row">
            <div class="gutter">
              <div class="card layer1 filters">
                <div class="input_group">
                  <input type="date" class="input" placeholder="Start Date" onChange={e => setStartDate(e.target.value)} value={startDate} />
                  <span class="highlight"></span>
                </div>
                <span class="highlight"> From </span>
                <div class="input_group">
                  <input type="date" class="input" placeholder="End Date" onChange={e => setEndDate(e.target.value)} value={endDate} />
                  <span class="highlight"></span>
                </div>

                <div class="input_group pull-right" style={{ maxWidth: "20%" }}>
                  <input type="text" class="input" placeholder="search here.." onChange={e => setSearchText(e.target.value)} value={searchText} />
                  <span class="highlight"></span>
                </div>
              </div>
            </div>
          </div>




          {
            user.lenght > 0 ? (
              <div className="row">
                <div className="gutter">
                  <table className="table-responsive ultra_responsive">
                    <thead>
                      <tr>
                        <th>Review</th> {/* review text along with stars given */}
                        <th>Review for Service</th> {/* service name for which review have given */}
                        <th>For provider</th> {/* name of provider to whome review has given */}
                        <th>Client name</th> {/* client name, email, mobile */}
                        <th>Date</th> {/* date of review posted */}
                      </tr>
                    </thead>

                    {user.map((cur, index) => {
                      return (
                        <tr key={index}>
                          <td className='reviewTab'>
                            <div className="content">
                              <span className="title" id="headingtitle">
                                {cur.comments}  &
                              </span>
                              <Rating
                                value={cur.rating}
                                count={5}

                                size={24}
                                activeColor="#007bff"
                              />

                            </div>
                          </td>

                          <td>
                            <div className="typefield">


                              <div className="content mt-3">
                                <span className="title" id="headingtitle">
                                  <span id="pricevalue">{cur.serviceName}</span>

                                </span>

                              </div>

                            </div>
                          </td>


                          <td>
                            <div className="typefield">
                              <span style={{ display: "block" }} onClick={() => handlenavigate(cur.providerId)}>{cur.providerName}</span>
                            </div>
                          </td>


                          <td>
                            <div className="typefield">
                              <span style={{ display: "block" }} onClick={() => handlenavigateClinet(cur.customerId)}>{cur.reviewerName}</span>

                            </div>
                          </td>
                          <td>{moment(cur.createdAt).format('YYYY-MM-DD')}</td>
                        </tr>
                      );
                    })}
                  </table>
                  {loading && (
                    <div style={{ textAlign: "center" }}>
                      <FallingLines
                        color="#03a9f4"
                        width="150"
                        visible={true}
                        ariaLabel="falling-circles-loading"
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p>No Review data found</p>
            )
          }




        </div>
      </div>
    </>
  );
}

export default Review;
