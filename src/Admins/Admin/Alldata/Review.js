import React, { useEffect, useState, useMemo } from 'react';
import { FallingLines } from "react-loader-spinner";
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import CustomModal from '../EVENT/Model';
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
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const startDates = location.state ? location.state.startDate : "";
  const endDates = location.state ? location.state.endDate : "";
  const Startdate = localStorage.getItem("startDate");
  const Enddate = localStorage.getItem("endDate");
  const [showModal, setShowModal] = useState(false);
  const [selectedEventData, setSelectedEventData] = useState(null);
  const [searchText, setSearchText] = useState('');

  const [startDate, setStartDate] = useState(startDates || Startdate || moment().subtract(7, 'day').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(endDates || Enddate || moment().format('YYYY-MM-DD'));
  const token = localStorage.getItem('tokenadmin');

  useEffect(() => {
    setLoading(true); // Set loading to true before API call
    const fetchReviews = async () => {
      try {
        const nextDay = new Date(endDate);
        nextDay.setDate(nextDay.getDate() + 1);
        const resp = await fetch(`${IP}/bookings/get-all-review?startDate=${startDate}&endDate=${nextDay.toISOString().split('T')[0]}`, {
          headers: {
            Authorization: token
          }
        });
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await resp.json();
        setUser(result?.reviews || []);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false); // Set loading to false after API call completes
      }
    };

    fetchReviews();
  }, [startDate, endDate, token]); // Trigger useEffect on startDate or endDate change

  useEffect(() => {
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    const today = moment().format('YYYY-MM-DD');
    setStartDate(moment(today).subtract(7, 'day').format('YYYY-MM-DD'));
    setEndDate(today);
  }, []);

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
    navigate(`/admin/contractors/view_contractor/${id}`);
  };

  const handleNavigateClient = (client) => {
    navigate(`/admin/clients/edit_client/${client?._id}`, { state: { startDate, endDate, client } });
  };

  const openModal = (eventData) => {
    setSelectedEventData(eventData);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const filteredReviews = useMemo(() =>
    user?.filter((event) =>
      event?.services?.service_name.toLowerCase().includes(searchText.toLowerCase())

    ), [user, searchText]);


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
                            {cur.comments} {/* Render review comments */}
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
                          <div className="content mt-3 typefield link title" onClick={() => openModal(cur?.services)}>
                            <span className="title" id="headingtitle">
                              <span id="pricevalue">{cur?.services?.service_name}</span> {/* Render service name */}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="typefield link title">
                          <span style={{ display: "block" }} onClick={() => handleNavigate(cur?.providerInfo[0]?.provider_id)}>
                            {cur?.providerInfo[0]?.first_name} {cur?.providerInfo[0]?.last_name}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="typefield link title">
                          <span style={{ display: "block" }} onClick={() => handleNavigateClient(cur?.userInfo[0])}>
                            {cur.reviewerName} {/* Render client name */}
                          </span>
                        </div>
                      </td>
                      <td>{moment(cur.createdAt).format('YYYY-MM-DD')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        ) : (
          <p>No review data found</p>
        )}

      </div>
      {/* Modal component */}
      {selectedEventData && (
        <CustomModal
          startDate={startDate}
          endDate={endDate}
          booking_status={selectedEventData.service_status}
          event={selectedEventData.event}
          show={showModal}
          onHide={closeModal}
          title={selectedEventData.service_name}
          address={selectedEventData.address}
          time={selectedEventData.scheduled_timing}
          date={selectedEventData.scheduled_date}
          _id={selectedEventData._id}
          status={selectedEventData.service_status}
          getdirection={selectedEventData.location}
          total={selectedEventData.total}
          areasOfConcern={selectedEventData.areas_of_concern}
          customerEmail={selectedEventData.customer_email}
          gender={selectedEventData.gender}
          healthConditions={selectedEventData.health_conditions}
          locationType={selectedEventData.location_type}
          massageBodyPart={selectedEventData.massage_body_part}
          massageFor={selectedEventData.massage_for}
          serviceTime={selectedEventData.service_time}
          specialConsiderations={selectedEventData.special_considerations}
          paymentIntentId={selectedEventData.paymentIntentId}
          gendercheck={selectedEventData.gendercheck}
          add_ons={selectedEventData.add_ons}
          add_ons_details={selectedEventData.add_ons_details}
          massage_for={selectedEventData.massage_for}
          amount_calculation={selectedEventData.user_amount_calculation}
        />
      )}

    </div>
  );
}

export default Review;
