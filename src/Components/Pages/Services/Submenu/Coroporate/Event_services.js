import React, { useEffect, useState, useRef } from 'react'
import "../../../Home/Home.css"
import { Link } from 'react-router-dom';

import { IP } from '../../../../../Constant';

import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../../Redux/counterSlice';



function Event_services() {

  const dispatch = useDispatch();
  const formData = useSelector((state) => state?.counter?.formData);
  const users = formData.massag_private_service && formData.massag_private_service[0] ? formData.massag_private_service[0] : "";
  const imgs = formData.service_private_image && formData.service_private_image[0] ? formData.service_private_image[0] : "";




  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const handleReadMoreClick = (index) => {
    setActiveCardIndex(index);
  };





  // const [users, setUsers] = useState([]);
  const [img, setImg] = useState('');


  console.log(" users all value ", users)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${IP}/service/category?type=corporate events`);
        const data = await res.json();
        // setUsers(data);
        dispatch(updateInputData({ formName: 'massag_private_service', inputData: data }));
        const imageUrls = data.map(async (item) => {
          const res = await fetch(`${IP}/file/${item.attachments}`);
          const imageBlob = await res.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
          return imageObjectURL;
        });
        Promise.all(imageUrls).then((urls) => setImg(urls));
        console.log("get data", data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(" image all value ", img)




  useEffect(() => {
    if (img.length > 0) {
      dispatch(updateInputData({ formName: 'service_private_image', inputData: img }));
    }
  }, [img, dispatch]);







  return (
    <>

      <div id="types" >

        <div className="container" >
          <div className="row">
            <div className="gutter">
              <div className="heading mt-5">
                <h3 >Corporate Wellness Services</h3>
                <p>Select your desired wellness service</p>
              </div>
            </div>
          </div>

          <div className="row">




            <div className="col-sm-12 col-sm-offset-1">
              <div className="container-fluid" id='showcard'>
                <div className="row">
                  {Array.isArray(users) && users.length > 0 && users.map((user, index) => (
                    <div className="col-sm-4 col-xs-12" key={user._id}>
                      <div className="item_wrapper">
                        <div className="item">

                          <div
                            className="bg"
                            style={{
                              backgroundImage: `url(${imgs[index]})`,
                              borderRadius: '7px',
                            }}
                          ></div>
                          <div className="text content">
                            <h3>{user.title}</h3>
                            <p dangerouslySetInnerHTML={{
                              __html: index === activeCardIndex
                                ? user.description
                                : user.description.slice(0, 138) + (user.description.length > 138 ? "...." : "")
                            }} />


                            <div className="text">
                              {index === activeCardIndex ? (
                                <button onClick={() => handleReadMoreClick(null)} className="Read_More">
                                  Show less
                                </button>
                              ) : (
                                <button onClick={() => handleReadMoreClick(index)} className="Read_More">
                                  Read more
                                </button>
                              )}
                              <Link to={`/services/corporate_events/booking/${user.title}`} className="anchor nomp" id="anchors">
                                <button className='button small cta'>Get Started</button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>












          </div>
        </div>
      </div>




    </>
  )
}

export default Event_services