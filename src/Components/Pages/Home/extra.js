// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { IP } from '../../../Constant';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateInputData } from '../Redux/counterSlice';
// import { fetchPostData } from '../../Hooks/Hooks';
// import Loader from '../Loader';

// function Yoga() {
//   const [img, setImg] = useState('');

//   const users = useSelector((state) => state?.counter?.formData?.home_service);
//   const formData = useSelector((state) => state?.counter?.formData);
//   const image = formData.home_service_image && formData.home_service_image[0] ? formData.home_service_image[0] : "";
//   const dispatch = useDispatch();


//   const [activeCardIndex, setActiveCardIndex] = useState(null);
//   const postIds = ['63f898655a71849662bd1755', '63f89bb15a71849662bd1a8b', '63f89c1e5a71849662bd1ac2'];
//   const url = [
//     {
//       id: 1,
//       navigate: "/services/massage_on_demand"
//     },
//     {
//       id: 2,
//       navigate: "/services/corporate_events"
//     },
//     {
//       id: 3,
//       navigate: "/services/private_events"
//     }
//   ];


//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const responses = await Promise.all(
//           postIds.map(async (id) => {
//             const data = await fetchPostData(id);
//             return data;
//           })
//         );

//         dispatch(updateInputData({ formName: 'home_service', inputData: responses }));
//         setImg(
//           await Promise.all(
//             responses.flatMap(response => response.attachments).map(async image => {
//               const res = await fetch(`${IP}/file/${image}`);
//               const imageBlob = await res.blob();
//               return URL.createObjectURL(imageBlob);
//             })
//           )
//         );
//       } catch (error) {
//         console.error('Error fetching data and images:', error);
//       }
//     }
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (img.length > 0) {
//       dispatch(updateInputData({ formName: 'home_service_image', inputData: img }));
//     }
//   }, [img, dispatch]);




//   const handleReadMoreClick = (index) => {
//     setActiveCardIndex(index);
//   };

//   const history = useNavigate();


//   if (!users) {
//     return <Loader />
//   }
//   return (
//     <>
//       <div id="types" className='marketplace'>
//         <div className="container">
//           <div className="row">
//             <div className="col-sm-12 col-sm-offset-1">
//               <div className="container-fluid">
//                 <div className="row">
//                   {Array.isArray(users) && users.length > 0 && users[0] && users[0].map((user, index) => (
//                     <div className="col-sm-4 col-xs-12" key={user._id}>
//                       <div className="item_wrapper">
//                         <div className="item">
//                           <div
//                             className="bg"
//                             style={{
//                               backgroundImage: `url(${image[index]})`,
//                               borderRadius: '7px',
//                             }}
//                           ></div>
//                           <div className="content">
//                             <h3>{user.title}</h3>
//                             <p dangerouslySetInnerHTML={{
//                               __html: user.description ? (
//                                 index === activeCardIndex
//                                   ? user.description
//                                   : user.description.slice(0, 200) + (user.description.length > 180 ? "...." : "")
//                               ) : ''
//                             }} />

//                             {index === activeCardIndex ? (
//                               <button onClick={() => handleReadMoreClick(null)} className="Read_More">
//                                 Show less
//                               </button>
//                             ) : (
//                               <button onClick={() => handleReadMoreClick(index)} className="Read_More">
//                                 Read more
//                               </button>
//                             )}

//                             <button className="button small" onClick={() => history(url[index].navigate)}>
//                               View More
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Yoga;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IP } from '../../../Constant';
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../Redux/counterSlice';
import { fetchPostData } from '../../Hooks/Hooks';
import Loader from '../Loader';
import Card from '../Modal/Card';
import Slider from "react-slick"; // Import Slider component

function Yoga() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(null); // Ensure this is defined

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

  // const handleReadMoreClick = (index) => {
  //   setActiveCardIndex(index);
  // };

  const handleViewMoreClick = (navigateTo) => {
    navigate(navigateTo);
  };

  if (!users) {
    return <Loader />;
  }
  const handleReadMoreClick = (index) => {
    setActiveCardIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div id="types_card" className='marketplace'>
      <div className="container">
        <div className="row">
          {/* Card Slider */}
          <Slider {...sliderSettings}>
            {Array.isArray(users) && users.length > 0 && users[0] && users[0].map((user, index) => (
              <Card
                key={user._id}
                user={user}
                image={images[index] || ''}
                index={index}
                isActive={index === activeCardIndex}
                onReadMoreClick={() => handleReadMoreClick(index)}
                onViewMoreClick={() => handleViewMoreClick(url[index].navigate)}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Yoga;
