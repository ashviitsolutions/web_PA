import React, { useState, useEffect } from 'react'
import { IP } from '../../../Constant';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Blog() {

  let params = useParams();
  let { id } = params;
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const postIds = [id];

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

  const createMarkup = (htmlString) => {
    return { __html: htmlString };
  };



  return (
    <>
      <div className='details_blog'>

        <div id="blog" style={{ marginTop: "5rem" }}>
          <div className="container">
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
                                  <Link to={`/detailblog/${user._id}`} >
                                    <div
                                      id='detailimage'
                                      className="bg"
                                      style={{
                                        backgroundImage: `url(${img[index]})`,
                                        borderRadius: '7px',
                                      }}
                                    ></div>
                                  </Link>

                                  <div className="content" id='detailblogitem'>
                                    <h3 >{user.title}</h3>
                                    { /*<p dangerouslySetInnerHTML={{ __html: user.description }} />  */}
                                    <p

                                      dangerouslySetInnerHTML={createMarkup(user.description)}
                                    />
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
      </div>

    </>
  )
}

export default Blog