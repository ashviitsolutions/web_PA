import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from React Router
import { IP } from '../../../Constant';
import { Card } from "react-bootstrap";


const ServicesCard = (props) => {
  console.log("props", props.title)
  const [users, setUsers] = useState([]);
  const [img, setImg] = useState('');
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const postIds = [props.title]




  useEffect(() => {
    async function fetchData() {
      const responses = await Promise.all(
        postIds.map(async id => {
          const res = await fetch(`${IP}/service/fetch/${id}`);
          return res.json();
        })
      );
      setUsers(responses);
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
  }, [])

  console.log("users provider ", users)

  const handleReadMoreClick = (index) => {
    setActiveCardIndex(index);
  };

  const history = useNavigate();

  return (
    <>
      {users.map((user, index) => (
        <div className="col-md-4" key={user._id}>
          <div className="item_wrapper">
            <div className="item">
              <div
                className="bg"
                style={{
                  backgroundImage: `url(${img[index]})`,
                  borderRadius: '7px',
                }}
              ></div>
              <div className="content">
                <h3>{user.title}</h3>
                <p dangerouslySetInnerHTML={{
                  __html: index === activeCardIndex
                    ? user.description
                    : user.description.slice(0, 200) + (user.description.length > 180 ? "...." : "")
                }} />

                {index === activeCardIndex ? (
                  <button onClick={() => handleReadMoreClick(null)} className="Read_More">
                    Show less
                  </button>
                ) : (
                  <button onClick={() => handleReadMoreClick(index)} className="Read_More">
                    Read more
                  </button>
                )}


              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ServicesCard;
