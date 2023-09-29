import React, { useEffect, useState } from 'react';
import Hook from '../Hook/Hook';
import './Profile.css';
import image1 from "../../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg";

function Booking() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const username = localStorage.getItem('user_name');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Hook.getPost();
        setPosts(response.data);
        setIsLoading(false); // Set loading to false when data is fetched
        console.log('get response', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Set loading to false on error as well
      }
    };

    fetchPosts();
  }, []);

  console.log('fetching data:', posts);

  return (
    <div className='overview'>
      <div className='overview_container'>
        <div className='heading'>
          <h3>{username}</h3>
        </div>
        <div className='title'>
          <h3>BOOKING HISTORY</h3>
        </div>
        {isLoading ? ( // Display loading message while data is being fetched
        <h1 style={{ color: "#162b3c" }}>Loading...</h1>
        ) : posts.length > 0 ? (
          posts.map((booking, index) => (
            <div className='overview_card' key={index}>
              <div className='overview_input'>
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
                </div>
              </div>
            </div>
          ))
        ) : (
          // Display "No Data Found" message when there is no data
          <h3 style={{ color: "#162b3c" }}>No bookings yet.</h3>
        )}
      </div>
    </div>
  );
}

export default Booking;
