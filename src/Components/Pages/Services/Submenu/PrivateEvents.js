import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Corporate from '../../Home/Corporate'
import Worklist from './Coroporate/Worklist'
import Faq from '../../Home/Faq'

function Private_Events() {


  const postIds = ['63f9f69006e32e1493232416', '63f9f6e806e32e149323242a'];
  const [users1, setUsers1] = useState([]);
  const [img, setImg] = useState('');

  const [users2, setUsers2] = useState([]);





  useEffect(() => {
    async function fetchData() {
      const responses = await Promise.all(
        postIds.map(async id => {
          const res = await fetch(`http://45.13.132.197:4000/api/post/fetch/${id}`);
          return res.json();

        })
      );
      setUsers1(responses[0]);
      setUsers2(responses[1]);
      setImg(
        await Promise.all(
          responses.flatMap(response => response.attachments).map(async image => {
            const res = await fetch(`http://45.13.132.197:4000/api/file/${image}`);
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
      <div id="small_banner" style={{
        backgroundImage: `url(${img[0]})`,
        borderRadius: '7px',
      }}>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="head">

                <h1>{users1.title}</h1>
                <h3 dangerouslySetInnerHTML={{ __html: users1.description }} style={{ paddingLeft: "66px" }}  />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="alternate_post">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="bg" style={{
                backgroundImage: `url(${img[1]})`,
                borderRadius: '7px',
            }}>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="heading">
                <h3>{users2.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: users2.description }} style={{ paddingLeft: "66px" }} />


                <button className="button" type="button" name="button">book now</button>
              </div>
            </div>
          </div>
        </div>
      </div>

   <Corporate/>
   <Worklist/>
      <Faq />
    </>
  )
}

export default Private_Events