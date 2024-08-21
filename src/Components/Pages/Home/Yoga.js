import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IP } from '../../../Constant';
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../Redux/counterSlice';
import { fetchPostData } from '../../Hooks/Hooks';
import Loader from '../Loader';
import Card from '../Modal/Card';

function Yoga() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const users = useSelector((state) => state?.counter?.formData?.home_service);
  const dispatch = useDispatch();

  const postIds = ['63f898655a71849662bd1755', '63f89bb15a71849662bd1a8b', '63f89c1e5a71849662bd1ac2'];
  const url = [
    { id: 1, navigate: "/services/massage_on_demand" },
    { id: 2, navigate: "/services/corporate_events" },
    { id: 3, navigate: "/services/private_events" }
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const responses = await Promise.all(
          postIds.map(async (id) => {
            const data = await fetchPostData(id);
            return data;
          })
        );

        dispatch(updateInputData({ formName: 'home_service', inputData: responses }));

        const imageUrls = await Promise.all(
          responses.flatMap(response => response.attachments).map(async (attachment) => {
            const res = await fetch(`${IP}/file/${attachment}`);
            const imageBlob = await res.blob();
            return URL.createObjectURL(imageBlob);
          })
        );

        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching data and images:', error);
      }
    }

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (images.length > 0) {
      dispatch(updateInputData({ formName: 'home_service_image', inputData: images }));
    }
  }, [images, dispatch]);

  const handleReadMoreClick = (index) => {
    setActiveCardIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleViewMoreClick = (navigateTo) => {
    navigate(navigateTo);
  };

  if (!users) {
    return <Loader />;
  }

  return (
    <div id="types_card" className='marketplace'>
      <div className="container">
        <div className="row">
          {Array.isArray(users) && users.length > 0 && users[0] && users[0].map((user, index) => (
            <Card
              key={user._id}
              user={user}
              image={images[index] || ''}
              index={index}
              isActive={index === activeCardIndex}
              onReadMoreClick={() => handleReadMoreClick(index)}
              onViewMoreClick={() => handleViewMoreClick(url[index].navigate)}
              btnlabel="View More"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Yoga;
