import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import Corporate from '../../Home/Corporate'
import PrivateEvents from './PrivateEvents'
import Faq from '../../../Home/Faq'
import Worklist from '../Coroporate/Worklist'
import { IP } from '../../../../../Constant'
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../../Redux/counterSlice';
import Banner from './Banner'

function Private_Events() {
  const postIds = ['640abb35ad080eddce521a04', '640abc38ad080eddce521ad7'];
  const dispatch = useDispatch();
  const formData = useSelector((state) => state?.counter?.formData);
  const users1 = formData.private_service_banner1 && formData.private_service_banner1[0] ? formData.private_service_banner1[0] : "";
  const users2 = formData.private_service_banner2 && formData.private_service_banner2[0] ? formData.private_service_banner2[0] : "";
  // const imgs1 = formData.service_private_image && formData.service_private_image[0] ? formData.service_private_image[0] : "";
  const imgs = formData.private_event_image && formData.private_event_image[0] ? formData.private_event_image[0] : "";
  // const imgs = formData.service_private_image && formData.service_private_image[0] ? formData.service_private_image[0] : "";
  // const [users1, setUsers1] = useState([]);
  const [img, setImg] = useState('');

  // const [users2, setUsers2] = useState([]);





  useEffect(() => {
    async function fetchData() {
      const responses = await Promise.all(
        postIds.map(async id => {
          const res = await fetch(`${IP}/post/fetch/${id}`);
          return res.json();

        })
      );

      dispatch(updateInputData({ formName: 'private_service_banner1', inputData: responses[0] }));
      dispatch(updateInputData({ formName: 'private_service_banner2', inputData: responses[1] }));
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


  useEffect(() => {
    if (img.length > 0) {
      dispatch(updateInputData({ formName: 'private_event_image', inputData: img }));
    }
  }, [img, dispatch]);



  return (
    <>
      <Banner />

      <div id="alternate_post">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="bg" style={{
                backgroundImage: `url(${imgs[1]})`,
                borderRadius: '7px',
              }}>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="heading">
                <h3>{users2.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: users2.description }} />


                {/* <button className="button" type="button" name="button">book now</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <PrivateEvents />
      <Worklist />
      <Faq />
    </>
  )
}

export default Private_Events