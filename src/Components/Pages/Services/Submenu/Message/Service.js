import React , {useEffect , useState} from 'react'
import { Link } from 'react-router-dom'

function Service() {
    
const postIds = ['63f89ed75a71849662bd1bb7', '63f89f065a71849662bd1bdd', '63f8a05e5a71849662bd1c05'];

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
                    <h3>services</h3>
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

export default Service