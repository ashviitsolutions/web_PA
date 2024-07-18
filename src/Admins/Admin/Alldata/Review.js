import React, { useEffect, useState } from 'react';
import { FallingLines } from "react-loader-spinner";
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Rating from "react-rating-stars-component";
import { IP } from '../../../Constant'; // Assuming IP is imported correctly

const PreviewImage = ({ attachments }) => {
  const [imageObjectURL, setImageObjectURL] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(`${IP}/file/${attachments}`);
        const imageBlob = await res.blob();
        const objectURL = URL.createObjectURL(imageBlob);
        setImageObjectURL(objectURL);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
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
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('tokenadmin');
    fetch(`${IP}/bookings/get-all-review`, {
      headers: {
        Authorization: token
      }
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        return resp.json();
      })
      .then(result => {
        console.log("Fetched reviews:", result);
        setUser(result?.reviews || []); // Assuming 'reviews' is the array of reviews in the API response
      })
      .catch(err => {
        console.error('Fetch error:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Empty dependency array ensures effect runs once on mount

  const handleInfiniteScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      // Handle infinite scroll logic here if needed
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => {
      window.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, []);

  const handleNavigate = (id) => {
    // Navigate to provider profile based on ID
    navigate(`/admin/contractors/view_contractor/${id}`);
  };

  const handleNavigateClient = (customerId) => {
    // Navigate to client profile based on customerId
    navigate(`/admin/clients-service-details`, { state: { startDate, endDate, customerId } });
  };

  const handleFilter = () => {
    // Filter reviews based on selected dates and search text
    return user.filter(cur => {
      const isWithinDateRange = (!startDate || new Date(cur.createdAt) >= new Date(startDate)) &&
        (!endDate || new Date(cur.createdAt) <= new Date(endDate));
      const isSearched = !searchText ||
        (cur.reviewerName.toLowerCase().includes(searchText.toLowerCase()) ||
          cur.userEmail.toLowerCase().includes(searchText.toLowerCase()));
      return isWithinDateRange && isSearched;
    });
  };

  const filteredReviews = handleFilter();

  return (
    <div id="content">
      <div className="container-fluid">
        <div className="row">
          <div className="headings float_wrapper">
            <div className="gutter pull-left">
              <h3><span className='link title backarrow' onClick={() => navigate(-1)}>&larr;</span> All Customer Reviews</h3>
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

        <div className="row">
          <div className="gutter">
            <div className="card layer1 filters">
              <div className="input_group">
                <input type="date" className="input" placeholder="Start Date" onChange={e => setStartDate(e.target.value)} value={startDate} />
                <span className="highlight"></span>
              </div>
              <span className="highlight"> From </span>
              <div className="input_group">
                <input type="date" className="input" placeholder="End Date" onChange={e => setEndDate(e.target.value)} value={endDate} />
                <span className="highlight"></span>
              </div>

              <div className="input_group pull-right" style={{ maxWidth: "20%" }}>
                <input type="text" className="input" placeholder="Search here..." onChange={e => setSearchText(e.target.value)} value={searchText} />
                <span className="highlight"></span>
              </div>
            </div>
          </div>
        </div>

        {filteredReviews.length > 0 ? (
          <div className="row">
            <div className="gutter">
              <table className="table-responsive ultra_responsive">
                <thead>
                  <tr>
                    <th>Review</th>
                    <th>Review for Service</th>
                    <th>For Provider</th>
                    <th>Client Name</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReviews.map((cur, index) => (
                    <tr key={index}>
                      <td className='reviewTab'>
                        <div className="content">
                          <span className="title" id="headingtitle">
                            {cur.comments}  & {/* Render review comments */}
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
                              <span id="pricevalue">{cur.serviceName}</span> {/* Render service name */}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="typefield link title">
                          <span style={{ display: "block" }} onClick={() => handleNavigate(cur.providerId)}>
                            {cur.providerName} {/* Render provider name */}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="typefield link title">
                          <span style={{ display: "block" }} onClick={() => handleNavigateClient(cur.userId)}>
                            {cur.reviewerName} {/* Render client name */}
                          </span>
                        </div>
                      </td>
                      <td>{moment(cur.createdAt).format('YYYY-MM-DD')}</td>
                    </tr>
                  ))}
                </tbody>
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
          <p>No review data found</p>
        )}

      </div>
    </div>
  );
}

export default Review;
