import React , {useState , useEffect} from 'react'
import { IP } from '../../../Constant';



function Yoga() {
  const [activeCardIndex, setActiveCardIndex] = useState(null);
    const postIds = ['63f898655a71849662bd1755', '63f89bb15a71849662bd1a8b', '63f89c1e5a71849662bd1ac2'];

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
      const handleReadMoreClick = (index) => {
        setActiveCardIndex(index);
      };

    return (
        <>
            <div id="types" >
                <div className="container" >
                    <div className="row">
                        <div className="col-sm-12 col-sm-offset-1">
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
                                          <div className="content">
                                          <h3>{user.title}</h3>
                                          <p dangerouslySetInnerHTML={{ __html: index === activeCardIndex
                                            ? user.description
                                            : user.description.slice(0, 160) + (user.description.length > 160 ? "...." : "") }} />
          
                                            {index === activeCardIndex ? (
                                              <button onClick={() => handleReadMoreClick(null)}  className="Read_More">
                                                Show less
                                              </button>
                                            ) : (
                                              <button onClick={() => handleReadMoreClick(index)} className="Read_More">
                                                Read more
                                              </button>
                                            )}
                                            <button className="button small" type="button">book now</button>
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

export default Yoga