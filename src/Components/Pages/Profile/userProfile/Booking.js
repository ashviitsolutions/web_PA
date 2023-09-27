import React, { useEffect, useState } from 'react';
import Hook from "../Hook/Hook"
import "./Profile.css";
import image1 from "../../../img/uploads/8.-sad-girls-facebook-profile-pictures.jpg"

function Booking() {
  const [posts, setPosts] = useState([]);

  const username = localStorage.getItem("username")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Hook.getPost();
        setPosts(response.data);
        console.log("get response", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, []);

  console.log("fetching data:", posts);

  return (
    <div className='overview'>
      <div className='overview_container'>
        <div className='heading'>
          <h3>{username}</h3>
        </div>
        <div className='title'>
          <h3>BOOKING HISTORY</h3>
        </div>
        {/* Map over the posts array and render each booking history item */}
        {posts.length > 0 && posts.map((booking, index) => (
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
        ))}
      </div>
    </div>
  );
}

export default Booking;
