import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IP } from "../../../Constant";
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../Redux/counterSlice';
import { fetchPostData } from '../../Hooks/Hooks';
import Loader from '../Loader';

// import Image1 from "../../assets/img/treatment-finger-keep-hand-161477.jpeg"
import Image2 from "../../assets/img/meditate.svg";
import Image3 from "../../assets/img/meditation.svg";
import Image4 from "../../assets/img/sahasrara.svg";

function About() {
  const postIds = ["63fa025b06e32e1493232788"];

  // const users = useSelector((state) => state?.counter?.formData?.home_about);
  const img = useSelector((state) => state?.counter?.formData?.home_about_image);
  const formData = useSelector((state) => state?.counter?.formData);
  const users = formData.home_about && formData.home_about[0] ? formData.home_about[0] : "";
  const dispatch = useDispatch();

  console.log("user about data", users)

  // useEffect hook to fetch data and navigate
  useEffect(() => {
    const getDataAndNavigate = async () => {
      try {
        // Fetch data for all specified IDs
        const responses = await Promise.all(
          postIds.map(async (id) => {
            const data = await fetchPostData(id);
            return data;
          })
        );
        const fetchedUser = responses[0];
        dispatch(updateInputData({ formName: 'home_about', inputData: fetchedUser }));

        // If fetched user has attachments, fetch and update image URL
        if (fetchedUser && fetchedUser.attachments) {
          const imageResponse = await fetch(`${IP}/file/${fetchedUser.attachments}`);
          const imageBlob = await imageResponse.blob();
          const imageURL = URL.createObjectURL(imageBlob);
          dispatch(updateInputData({ formName: 'home_about_image', inputData: imageURL }));
        }
      } catch (error) {
        // Handle errors by logging them to the console
        console.error('Error fetching data and navigating:', error);
      }
    };

    // Call the asynchronous function to fetch data and navigate
    getDataAndNavigate();
  }, [dispatch]); // Dependencies array to ensure useEffect runs only once


  if (!users) {
    return <Loader />
  }


  return (
    <>

      <div id="about">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="left_half">
                <img className="img-responsive" src={img} alt="..." />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="about_content">
                {/* <span>Lorem ipsum dolor...</span> 8*/}
                <h3>{users.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: users.description }} style={{ fontWeight: "500", fontSize: "15px" }} />


                <Link to="/guest_login">
                  <button className="button primary" type="button">get started</button>
                </Link>

                <Link to="/services">
                  <button className="button ghost" type="button">see services</button>
                </Link>



              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-sm-4">
              <div className="item">
                <div className="content">
                  <div className="icon" style={{ backgroundImage: `url(${Image2})`, borderRadius: "7px" }}>
                  </div>
                  <h3>Vetted service providers
                  </h3>
                  <p>
                    We screen and run background checks on all of our service providers. We regularly verify to make sure our providers are licensed,  insured, and fully equipped to service our clients' needs.
                  </p>

                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="item">
                <div className="content">
                  <div className="icon" style={{ backgroundImage: `url(${Image3})`, borderRadius: "7px" }}>
                  </div>
                  <h3> Quick and Easy
                  </h3>
                  <p>Customized bookings are serviced by our professionals at the convenience of your  home, private as well as corporate settings. Providers can service you as fast as within an hour of booking an on-demand service.
                  </p>

                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="item">
                <div className="content">
                  <div className="icon" style={{ backgroundImage: `url(${Image4})`, borderRadius: "7px" }}>
                  </div>
                  <h3>Safety and cleanliness
                  </h3>
                  <p>
                    Making sure that our clients are safe,  equipment and proffecionals are clean, is our top priority. We value and rely on your feedback, so please write to us and give us your feedback.</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About;
