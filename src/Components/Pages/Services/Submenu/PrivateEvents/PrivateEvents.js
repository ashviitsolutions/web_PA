import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IP } from '../../../../../Constant';
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../../Redux/counterSlice';
import Loader from '../../../Loader';
import Card from '../../../Modal/Card';
import Header from '../../../Modal/Header';

function Event_services() {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const formData = useSelector((state) => state?.counter?.formData);
  const users = formData?.private_services && formData.private_services[0] ? formData.private_services[0] : "";
  const imgs = formData?.private_services_image && formData.private_services_image[0] ? formData.private_services_image[0] : "";
  const [activeCardIndex, setActiveCardIndex] = useState(null);


  const handleReadMoreClick = (index) => {
    setActiveCardIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleViewMoreClick = (navigateTo) => {
    navigate(navigateTo);
  };


  // const [users, setUsers] = useState([]);
  const [img, setImg] = useState(imgs);

  console.log(" image vaklue ", img);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${IP}/service/category?type=private events`);
        const data = await res.json();
        // setUsers(data);
        dispatch(updateInputData({ formName: 'private_services', inputData: data }));
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



  const handleSubmit = async (service_id) => {
    dispatch(updateInputData({ formName: 'service_id', inputData: service_id }));


  };


  useEffect(() => {
    if (img.length > 0) {
      dispatch(updateInputData({ formName: 'private_services_image', inputData: img }));
    }
  }, [img, dispatch]);


  if (!users) {
    return <Loader />;
  }

  return (
    <div id="types_card" className='marketplace'>
      <div className="container">
        <Header
          heading_Text="Private Wellness Services"
          sub_Text="Select your desired wellness service"
        />
        <div className="row">
          {Array.isArray(users) && users.length > 0 && users.map((user, index) => (
            <Card
              key={user._id}
              user={user}
              image={img[index] || ''}
              index={index}
              isActive={index === activeCardIndex}
              onReadMoreClick={() => handleReadMoreClick(index)}
              onViewMoreClick={() => handleViewMoreClick(`/services/corporate_events/booking/${user.title}`)}
              btnlabel="Get Started"

            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default Event_services;
