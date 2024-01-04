import React, { useState, useEffect } from 'react'
import stars from "../../assets/img/stars.png"
import bg11 from "../../assets/img/bg11.jpg"
import { IP } from '../../../Constant';

function Testimonials() {
  const postIds = ['641013caff3c39ffa38f15f3', '641013e4ff3c39ffa38f1607'];
  const [users1, setUsers1] = useState([]);
  const [img, setImg] = useState('');

  const [users2, setUsers2] = useState([]);


  console.log("tesnominia", img)


  useEffect(() => {
    async function fetchData() {
      const responses = await Promise.all(
        postIds.map(async id => {
          const res = await fetch(`${IP}/post/fetch/${id}`);
          return res.json();

        })
      );
      setUsers1(responses[0]);
      setUsers2(responses[1]);
      setImg(
        await Promise.all(
          responses.flatMap(response => response.attachments).map(async image => {
            const res = await fetch(`${IP}/file/${image}`);
            const imageBlob = await res.blob();
            return URL.createObjectURL(imageBlob);
          })
        )
      );
    }
    fetchData();
  }, []);
  return (
    <>
      <div id="testimonials">
        <div className="container">
          <div className="row">
            <div className="heading" style={{ textAlign: "center" }}>
              <h3>testimonials</h3>
              {/* <p>people who changed their lives</p> */}
              <p>Your feedback means the world to us</p>
            </div>
          </div>
          <div className="row">
            {/* 
            <div className="col-sm-6">
              <div className="item_wrapper">
                <div className="item">
                  <div className="avatar" style={{ backgroundImage: `url(${img[0]})` }}>
                  </div>
                  <div className="content">
                    <div className="inner">
                      <h3>{users1.title}</h3>
                      <p dangerouslySetInnerHTML={{ __html: users1.description }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            */}

            {/* 
            <div className="col-sm-4">
              <div className="item_wrapper">
                <div className="item right">
                  <div className="avatar" style={{ backgroundImage: `url(${img[1]})`, backgroundPosition: "top" }}>
                  </div>
                  <div className="content">
                    <div className="inner">
                      <h3>{users2.title}</h3>
                      <p dangerouslySetInnerHTML={{ __html: users2.description }} />
                      <p align="center"><img src={stars} /></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="item_wrapper">
                <div className="item right">
                  <div className="avatar" style={{ backgroundImage: `url(${img[1]})`, backgroundPosition: "top" }}>
                  </div>
                  <div className="content">
                    <div className="inner">
                      <h3>{users2.title}</h3>
                      <p dangerouslySetInnerHTML={{ __html: users2.description }} />
                      <p align="center"><img src={stars} /></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="item_wrapper">
                <div className="item right">
                  <div className="avatar" style={{ backgroundImage: `url(${img[1]})`, backgroundPosition: "top" }}>
                  </div>
                  <div className="content">
                    <div className="inner">
                      <h3>{users2.title}</h3>
                      <p dangerouslySetInnerHTML={{ __html: users2.description }} />
                      <p align="center"><img src={stars} /></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            
        */}
        <div className="userRatings row">
          <div className="col-sm-4" align="center">
            <div className='userImg' style={{ backgroundImage: `url(${img[1]})`, backgroundPosition: "" }}>

            </div>
            <div className="content">
                      <div className="inner">
                        <h3>{users2.title}</h3>
                        <p dangerouslySetInnerHTML={{ __html: users2.description }} />
                        <p align="center"><img src={stars} /></p>
                      </div>
                    </div>
          </div>
          <div className="col-sm-4" align="center">
            <div className='userImg' style={{ backgroundImage: `url(${img[1]})`, backgroundPosition: "" }}>

            </div>
            <div className="content">
                      <div className="inner">
                        <h3>{users2.title}</h3>
                        <p dangerouslySetInnerHTML={{ __html: users2.description }} />
                        <p align="center"><img src={stars} /></p>
                      </div>
                    </div>
          </div>
          <div className="col-sm-4" align="center">
            <div className='userImg' style={{ backgroundImage: `url(${img[1]})`, backgroundPosition: "" }}>

            </div>
            <div className="content">
                      <div className="inner">
                        <h3>{users2.title}</h3>
                        <p dangerouslySetInnerHTML={{ __html: users2.description }} />
                        <p align="center"><img src={stars} /></p>
                      </div>
                    </div>
          </div>
        </div>
          </div>



        </div>
        {/* 
        <div className='textmonia_section_middle'>
          <div className="textmonian">
            <div className="item_wrapper">
              <div className="item right">
                <div className="avatar" style={{ backgroundImage: `url(${img[1]})`, backgroundPosition: "top" }}>
                </div>
                <div className="content">
                  <div className="inner">
                    <h3>{users2.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: users2.description }} />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        */}
      </div>

    </>
  )
}

export default Testimonials