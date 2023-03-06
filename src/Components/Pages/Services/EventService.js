import React, {useState , useEffect} from 'react'
import { Link } from 'react-router-dom'


function EventService() {
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const handleReadMoreClick = (index) => {
    setActiveCardIndex(index);
  };
    const postIds = ['63f8dce775a30d0813b95d50', '63f8dd0775a30d0813b95d64','63f8dd2975a30d0813b95d7e'];
    
      const [users, setUsers] = useState([]);
      const [images, setImages] = useState([]);
      const [img, setImg] = useState('');
    
      console.log("users", users)
      console.log("image value", img)
    
    
      useEffect(() => {
        async function fetchData() {
          const responses = await Promise.all(
            postIds.map(async id => {
              const res = await fetch(`http://45.13.132.197:4000/api/post/fetch/${id}`);
              return res.json();
            })
          );
          setUsers(responses);
          setImages(responses.flatMap(response => response.attachments));
        }
        fetchData();
      }, []);
    
      useEffect(() => {
        async function fetchImages() {
          const imageObjects = await Promise.all(
            images.map(async image => {
              const res = await fetch(`http://45.13.132.197:4000/api/file/${image}`);
              const imageBlob = await res.blob();
              return URL.createObjectURL(imageBlob);
            })
          );
          setImg(imageObjects); // Set the first image URL as the state value
        }
        if (images.length > 0) {
          fetchImages();
        }
      }, [images]);
    return (
        <>


            <div id="types" >
                <div id="classNamees">
                    <div className="container" >
                        <div className="row">
                            <div className="gutter">
                                <div className="heading">
                                    <h3>event services</h3>
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
                                          <p dangerouslySetInnerHTML={{ __html: index === activeCardIndex
                                            ? user.description
                                            : user.description.slice(0, 138) + (user.description.length > 138 ? "...." : "") }} />
            
            
                                            <div className="text">
                                            {index === activeCardIndex ? (
                                              <button onClick={() => handleReadMoreClick(null)}  className="Read_More">
                                                Show less
                                              </button>
                                            ) : (
                                              <button onClick={() => handleReadMoreClick(index)} className="Read_More">
                                                Read more
                                              </button>
                                            )}
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
            </div>

        </>
    )
}

export default EventService