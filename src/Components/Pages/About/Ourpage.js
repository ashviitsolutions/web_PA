import React, { useState, useEffect } from 'react'
// import Image1 from "../../assets/img/pexels-cottonbro-3997983.jpg"
import { IP } from '../../../Constant';

function Ourpage() {
  const postIds = ['63fa02a506e32e14932327bb', '63fa02df06e32e14932327d1'];
  const [users1, setUsers1] = useState([]);
  const [img, setImg] = useState('');

  const [users2, setUsers2] = useState([]);

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
      <div id="alternate_post">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="bg" style={{
                backgroundImage: `url(${img[0]})`,
                borderRadius: '7px',
              }}>
              </div>
            </div>
            <div className="col-sm-6" >
              <div className="heading" >
                <h3>{users1.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: users1.description }} />
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-sm-6">
              <div className="heading">
                <h3>{users2.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: users2.description }} />
                <ul className="true">
                  <div className='true-item'>
                    <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, </li>
                    <li>sed do eiusmod tempor incididunt ut labore</li>
                    <li>ea commodo consequat. Duis aute irure dolor in reprehenderit </li>
                  </div>

                </ul>

              </div>
            </div>
            <div className="col-sm-6">
              <div className="bg" style={{
                backgroundImage: `url(${img[1]})`,
                borderRadius: '7px',
              }}>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Ourpage