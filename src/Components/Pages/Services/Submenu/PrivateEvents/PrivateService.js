import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import Corporate from '../../Home/Corporate'
import PrivateEvents from './PrivateEvents'
import Faq from '../../../Home/Faq'
import Worklist from '../Coroporate/Worklist'
import { IP } from '../../../../../Constant'

function Private_Events() {


  const postIds = ['640abb35ad080eddce521a04', '640abc38ad080eddce521ad7'];
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
      <div id="small_banner" style={{
        backgroundImage: `url(${img[0]})`,
        borderRadius: '7px',
      }}>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="head">

                <h1>{users1.title}</h1>
                <h3 dangerouslySetInnerHTML={{ __html: users1.description }}   />
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
                <p dangerouslySetInnerHTML={{ __html: users2.description }}  />


                <button className="button" type="button" name="button">book now</button>
              </div>
            </div>
          </div>
        </div>
      </div>

   <PrivateEvents/>
   <Worklist/>
      <Faq />
    </>
  )
}

export default Private_Events