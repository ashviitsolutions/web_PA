import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import { IP } from '../../../../../Constant';

// import Imge4 from "../../assets/img/pexels-andrea-piacquadio-3764568.jpg"


function PrivateEvents() {
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const handleReadMoreClick = (index) => {
    setActiveCardIndex(index);
  };
const postIds = ['6405ee9220fe802e78bbbcb7', '6405eeb720fe802e78bbbcfb', '6405eece20fe802e78bbbd3f'];

const [users, setUsers] = useState([]);
const [img, setImg] = useState('');

useEffect(() => {
    async function fetchData() {
      const responses = await Promise.all(
        postIds.map(async id => {
          const res = await fetch(`${IP}/service/fetch/${id}`);
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




        </>
    )
}

export default PrivateEvents