import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';

// import Imge4 from "../../assets/img/pexels-andrea-piacquadio-3764568.jpg"


function PrivateEvents() {

const postIds = ['63f9f7c006e32e149323247e', '63f9f7c406e32e149323248b', '63f9f7c706e32e1493232499'];

const [users, setUsers] = useState([]);
const [img, setImg] = useState('');

useEffect(() => {
    async function fetchData() {
      const responses = await Promise.all(
        postIds.map(async id => {
          const res = await fetch(`http://45.13.132.197:4000/api/post/fetch/${id}`);
          return res.json();
          
        })
      );
      setUsers(responses);
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
  }, [])
    

    return (
        <>
            <div id="types" >
                <div className="container" >
                    <div className="row">
                        <div className="gutter">
                            <div className="heading">
                                <h3 >Private Event Services</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </div>
                    </div>
                   
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-1">
                            <div className="container-fluid">
                                <div className="row">
                                {users.map((user, index) => (
                                    <div className="col-sm-4 col-xs-12" key={user._id}>
                                      <div className="item_wrapper">
                                        <div className="item">
                                          <div
                                            className="bg"
                                            style={{
                                              backgroundImage: `url(${img[index]})`,
                                              borderRadius: '7px',
                                            }}
                                          ></div>
                                          <div className="text content">
                                            <h3>{user.title}</h3>
                                            <p dangerouslySetInnerHTML={{ __html: user.description }} />
                                            <div className="text">
                                              <Link to="#" className="anchor" id="anchors">
                                                book now
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </>
    )
}

export default PrivateEvents