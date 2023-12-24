import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { IP } from '../../../Constant';

// import Image1 from "../../assets/img/treatment-finger-keep-hand-161477.jpeg"
import Image2 from "../../assets/img/meditate.svg"
import Image3 from "../../assets/img/meditation.svg"
import Image4 from "../../assets/img/sahasrara.svg"



function About() {


  const postIds = ['63fa025b06e32e1493232788'];

  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);
  const [img, setImg] = useState('');

  useEffect(() => {
    async function fetchData() {
      const responses = await Promise.all(
        postIds.map(async id => {
          const res = await fetch(`${IP}/post/fetch/${id}`);
          return res.json();
        })
      );
      setUsers(responses[0]);
      setImages(responses.flatMap(response => response.attachments));
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchImages() {
      const imageObjects = await Promise.all(
        images.map(async image => {
          const res = await fetch(`${IP}/file/${image}`);
          const imageBlob = await res.blob();
          return URL.createObjectURL(imageBlob);
        })
      );
      setImg(imageObjects); // Set the first image URL as the state value
    }
    if (images.length > 0) {
      fetchImages();
    }
  }, [images]);



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
                <button className="button primary" type="button">get started</button>
                <button className="button ghost" type="button">see services</button>

              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4">
              <div className="item">
                <div className="content">
                  <div className="icon" style={{ backgroundImage: `url(${Image2})`, borderRadius: "7px" }}>
                  </div>
                  <h3>professional service providers</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                  <Link className="anchors" to="#">read more</Link>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="item">
                <div className="content">
                  <div className="icon" style={{ backgroundImage: `url(${Image3})`, borderRadius: "7px" }}>
                  </div>
                  <h3>rejuvenate your body</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                  <Link className="anchors" to="#">read more</Link>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="item">
                <div className="content">
                  <div className="icon" style={{ backgroundImage: `url(${Image4})`, borderRadius: "7px" }}>
                  </div>
                  <h3>clean environments</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                  <Link className="anchors" to="#">read more</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About