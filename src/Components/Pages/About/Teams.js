import React, { useEffect, useState } from 'react'
import Member from '../Services/Submenu/Member'
import { IP } from '../../../Constant';
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../Redux/counterSlice';
function Teams() {
  const postIds = ['63fa03a606e32e1493232825', '653fb043ea0362647dc676da', '63fa03e106e32e1493232845'];

  // const [users, setUsers] = useState([]);
  const [img, setImg] = useState('');

  const dispatch = useDispatch();
  const formData = useSelector((state) => state?.counter?.formData);
  const users = formData.about_team && formData.about_team[0] ? formData.about_team[0] : "";
  const imgs = formData.about_team_image && formData.about_team_image[0] ? formData.about_team_image[0] : "";

  useEffect(() => {
    async function fetchData() {
      const responses = await Promise.all(
        postIds.map(async id => {
          const res = await fetch(`${IP}/post/fetch/${id}`);
          return res.json();

        })
      );
      // setUsers(responses);
      dispatch(updateInputData({ formName: 'about_team', inputData: responses }));
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

  
  useEffect(() => {
    if (img.length > 0) {
      dispatch(updateInputData({ formName: 'about_team_image', inputData: img }));
    }
  }, [img, dispatch]);

  return (
    <>
      <div id='types' className='type'>
        <div id="classNamees">
          <div className="container">
            <div className="row">
              <div className="gutter">
                <div className="heading">
                  <h3 >Our Team</h3>
                  <p>We are a wellness service platform that delivers a wide range of On-demand wellness products and services to the place of your choice. Quality and convinince is what defines us! Join us and Experince The Difference</p>
                </div>
              </div>
            </div>

            <div className="row justify-content-center" >
            {Array.isArray(users) && users.length > 0 && users.map((user, index) => (
                <div className="col-sm-4" key={user._id}>
                  <div className="item_wrapper" >
                    <div className="className_brief item card layer1">
                      <div
                        className="bg"
                        style={{
                          backgroundImage: `url(${imgs[index]})`,
                          borderRadius: '7px',
                        }}
                      ></div>
                      <div className="text float_wrapper">
                      </div>
                      <div className="text content">
                        <h3>{user.title}</h3>
                        <p dangerouslySetInnerHTML={{ __html: user.description }} />
                      </div>
                      <div className="text">
                      </div>
                    </div>
                  </div>
                </div>
              ))}


            </div>
          </div>
        </div>
      </div>

      <Member />
    </>
  )
}

export default Teams