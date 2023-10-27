import React, { useEffect, useState } from 'react';
import Hook from '../Hook/Hook';
import './Profile.css';
import image1 from "../../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg";
import Rating from 'react-rating-stars-component';

function Booking() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRating, setUserRating] = useState(0); // State for user rating
  const [userFeedback, setUserFeedback] = useState(''); // State for user feedback
  const username = localStorage.getItem('user_name');
  const [toggleStates, setToggleStates] = useState([]); // State for toggle states

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Hook.getPost();
        setPosts(response.data);
        setIsLoading(false);
        // Initialize toggle state for each post to false
        setToggleStates(new Array(response.data.length).fill(false));
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };

  const handleFeedbackChange = (event) => {
    setUserFeedback(event.target.value);
  };

  const handleToggle = (index) => {
    // Create a copy of the toggleStates array and update the state for the clicked card
    const newToggleStates = [...toggleStates];
    newToggleStates[index] = !newToggleStates[index];
    setToggleStates(newToggleStates);
  };

  const handleSubmitRating = (bookingId) => {
    // You can send the userRating and userFeedback to your backend for processing here
    // Make an API call to submit the user's rating and feedback
    // Update the UI as needed
    console.log('Booking ID:', bookingId);
    console.log('User Rating:', userRating);
    console.log('User Feedback:', userFeedback);
  };

  return (
    <div className='overview' id='invoices'>
      <div className='overview_container'>
        <div className='heading'>
          <h3>{username}</h3>
        </div>
        <div className='title'>
          <h3>BOOKING HISTORY</h3>
        </div>
        {isLoading ? (
          <h1 style={{ color: "#162b3c" }}>Loading...</h1>
        ) : posts.length > 0 ? (
          posts.map((booking, index) => (
            <div className='overview_card' key={index} >
              <div className='overview_input' onClick={() => handleToggle(index)}>
                <div className='image_text'>
                  <img src={image1} width={150} height={130} alt='...' />
                  <div className='text-item'>
                    <h3>Appointment With {username}</h3>
                    <p>{booking.service_status}</p>
                    <p>{booking.address}</p>
                  </div>
                </div>
                <div className='time_date'>
                  <p>{booking.scheduled_date}</p>
                  <h3>{booking.scheduled_timing}</h3>
                  <button>Download Invoice</button>
                </div>
              </div>
              {toggleStates[index] && (
                <div className='rating-feedback-section'>
                  <h3>Rate your experience</h3>
                  <Rating
                    value={userRating}
                    count={5}
                    onChange={handleRatingChange}
                    size={24}
                    activeColor="#007bff"
                  />
                  <textarea
                    placeholder='Share your feedback'
                    value={userFeedback}
                    onChange={handleFeedbackChange}
                  />
                  <button onClick={() => handleSubmitRating(booking.id)}>
                    Submit
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <h3 style={{ color: "#162b3c" }}>No bookings yet.</h3>
        )}
      </div>
    </div>
  );
}

export default Booking;
