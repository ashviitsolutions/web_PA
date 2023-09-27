import React, { useState, useEffect } from 'react';
import { IP } from '../../../Constant';


function Banner() {
  const postIds = ['63f0cad81e627c34fc1b58e9'];
  const [users, setUsers] = useState([]);
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

  // const postIds = ['63f0cad81e627c34fc1b58e9'];
  // const [users, setUsers] = useState([]);
  // const [img, setImg] = useState('');

  // useEffect(() => {
  //   const cachedData = sessionStorage.getItem('cachedData');

  //   if (cachedData) {
  //     const parsedData = JSON.parse(cachedData);
  //     setUsers(parsedData.users);
  //     setImg(parsedData.images);
  //   } else {
  //     async function fetchData() {
  //       const responses = await Promise.all(
  //         postIds.map(async (id) => {
  //           const res = await fetch(`${IP}/post/fetch/${id}`);
  //           return res.json();
  //         })
  //       );

  //       setUsers(responses[0]);

  //       const images = await Promise.all(
  //         responses.flatMap((response) => response.attachments).map(async (image) => {
  //           const res = await fetch(`${IP}/file/${image}`);
  //           const imageBlob = await res.blob();
  //           return URL.createObjectURL(imageBlob);
  //         })
  //       );

  //       setImg(images);

  //       const cachedData = JSON.stringify({ users: responses[0], images });
  //       sessionStorage.setItem('cachedData', cachedData);
  //     }

  //     fetchData();
  //   }
  // }, []);

  // Rest of the code...


  return (
    <>
      <div id="banner" style={{ backgroundImage: `url(${img})` }}>
        <div className="container">
          <div className="row">
            <div className="head">
              <h1>{users.title} <span>{users.excerpt}</span></h1>
              <h3 dangerouslySetInnerHTML={{ __html: users.description }} style={{ fontWeight: "500", fontSize: "15px" }} />
              <button className="primary button small" type="button">
                get started
              </button>
              <button className="hollow button small" type="button">
                services
              </button>
            </div>
          </div>
        </div>
        <div className="arrow_down"></div>
      </div>
    </>
  );
}

export default Banner;
