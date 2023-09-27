import React, { useState, useEffect } from 'react';
import "./Profile.css";
import img1 from "../../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg"
import Hook from "../Hook/Hook";
import Booking from './Booking';

function Overview() {
  const [posts, setPosts] = useState([]);
  const [eventStates, setEventStates] = useState({});

  const handleToggle = (id) => {
    setEventStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }

  const isEventOpen = (id) => {
    return eventStates[id] || false;
  }


  //api intrigation



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Hook.getProfile();
        setPosts(response.data);
        console.log("get response", response.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, []);

  console.log("fetching overview data:", posts);
  localStorage.setItem("username" ,`${posts.first_name} ${posts.last_name}`)
  

  return (
    <>


      <div className="inner">
        <div className='gutter'>
          <h3 className='profile_heading'>{posts.first_name} {posts.last_name}  </h3>
        </div>
        <div className='gutter'>
          <h3 className='small_heading'>UPCOMING EVENTS</h3>
        </div>

        <div id="my_appointments">
          <div className="container-fluid">
            <div className="row" id='overview_page_container'>
              <div className="col-sm-6">
                <div className="gutter">
                  <div id="app1" className="appointment card" onClick={() => handleToggle('app1')}>
                    <span className="ripple"></span>
                    <div className="relative_time float_wrapper">
                      <h3 className="pull-left">2:30 pm</h3>
                      <h4 className="pull-right">1 day 20 hours</h4>
                    </div>
                    <div className="absolute_time float_wrapper">
                      <h4 className="pull-left">Saturday, 05 November, 2022</h4>
                    </div>
                    <div className="profile">
                      <span className="avatar">
                        <img src={img1} width={60} height={60} alt="Avatar" />
                      </span>
                      <div className="text">
                        <h3>Swedish Massage</h3>
                        <p>90 minutes, for me +1</p>
                      </div>
                    </div>
                    {isEventOpen('app1') && (
                      <div className="more_detail">
                        <div className="address float_wrap">
                          <p>145 - some road , city center, LA</p>
                          <button className="button_direction" >Get Directions</button>
                        </div>
                        <hr />
                        <div className="host">
                          <div className="avatar"></div>
                          <p>Appointment with <b>John Miller</b></p>
                        </div>
                        <div className="billing float_wrapper">
                          <p className="pull-left">$ 200</p>
                          <p className="paid pull-right">paid</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="gutter">
                  <div id="app2" className="appointment card" onClick={() => handleToggle('app2')}>
                    <span className="ripple"></span>
                    <div className="relative_time float_wrapper">
                      <h3 className="pull-left">2:30 pm</h3>
                      <h4 className="pull-right">1 day 20 hours</h4>
                    </div>
                    <div className="absolute_time float_wrapper">
                      <h4 className="pull-left">Saturday, 05 November, 2022</h4>
                    </div>
                    <div className="profile">
                      <span className="avatar">
                        <img src={img1} width={60} height={60} alt="Avatar" />
                      </span>
                      <div className="text">
                        <h3>Swedish Massage</h3>
                        <p>90 minutes, for me +1</p>
                      </div>
                    </div>
                    {isEventOpen('app2') && (
                      <div className="more_detail">
                        <div className="address float_wrap">
                          <p>145 - some road , city center, LA</p>
                          <button className="button_direction" >Get Directions</button>
                        </div>
                        <hr />
                        <div className="host">
                          <div className="avatar"></div>
                          <p>Appointment with <b>John Miller</b></p>
                        </div>
                        <div className="billing float_wrapper">
                          <p className="pull-left">$ 200</p>
                          <p className="paid pull-right">paid</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Overview;
