import React , {useState , useEffect} from 'react'
import "./Home.css"
import { IP } from '../../../Constant'; 


function Blog() {
    const [activeCardIndex, setActiveCardIndex] = useState(null);
    const postIds = ['6406e884ad080eddce51de80', '6406e8a8ad080eddce51de96', '6406e8c8ad080eddce51deac'];

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
    <div id="blog">
    <div className="container">
        <div className="row">
            <div className="heading content">
                <h3 className="dancing">Latest Blog</h3>
                <p>Lorem ipsum dolor sit amet</p>
                <span className="eff"></span>
            </div>
        </div>
        <div className="row">
            <div id="types">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-1">
                            <div className="container-fluid">
                                <div className="row">


                                {users.map((user, index) => (
                                    <div className="col-sm-4" key={user._id}>
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
                                            : user.description.slice(0, 100) + (user.description.length > 100 ? "...." : "") }} />
          
                                            {index === activeCardIndex ? (
                                              <button onClick={() => handleReadMoreClick(null)}  className="Read_Mores">
                                                Show less
                                              </button>
                                            ) : (
                                              <button onClick={() => handleReadMoreClick(index)} className="Read_Mores">
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
        </div>
    </div>
</div>
    </>
  )
}

export default Blog