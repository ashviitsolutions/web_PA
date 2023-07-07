import React,{useEffect,useState} from 'react'
import Member from '../Services/Submenu/Member'
import { IP } from '../../../Constant';

function Teams() {
  const postIds = ['63fa03a606e32e1493232825', '63fa03dc06e32e1493232839', '63fa03e106e32e1493232845'];

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
  return (
    <>
      <div id='types' className='type'>
        <div id="classNamees">
          <div className="container">
            <div className="row">
              <div className="gutter">
                <div className="heading">
                  <h3 >Our Team</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </div>
            </div>

            <div className="row justify-content-center" >
              {users.map((user, index) => (
                <div className="col-sm-4" key={user._id}>
                  <div className="item_wrapper" >
                    <div className="className_brief item card layer1">
                      <div
                        className="bg"
                        style={{
                          backgroundImage: `url(${img[index]})`,
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