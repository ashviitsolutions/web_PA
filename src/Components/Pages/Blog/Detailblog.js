import React, { useState, useEffect } from 'react'
import { IP } from '../../../Constant';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import sampleImg from '../../assets/img/FAQ.jpg'

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
    <div className='blogPage'>
      <div className='details_blog row'>
        <div id="blogPost" className='blogPost col-sm-8'>
         


                          {users.map((user, index) => (
                            <div className="" key={user._id}>
                              <div className="blog_wrapper">
                                <div className="blogContent">
                                  <Link to={`/detailblog/${user._id}`} >
                                    <div
                                      id='detailimage'
                                      className="bg blogImage"
                                      style={{
                                        backgroundImage: `url(${img[index]})`,
                                        borderRadius: '7px',
                                      }}
                                    ></div>
                                  </Link>

                                  <div className="content blogContent" id='detailblogitem'>
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

        <div className='col-sm-4 blogSidebar'>
          <div className='sideBlogs'>
          <div className='sideBox row'>
                <div className='sideImg col-sm-3'><img src={sampleImg} /></div>
                <div className='sideContent col-sm-9'>
                  <h3>Dummy Title Here</h3>
                  <p>In our busy lives, amidst the hustle and bustle, it's easy to overlook a fundamental aspect of our well-being....</p>
                </div>
              </div>
              <div className='sideBox row'>
                <div className='sideImg col-sm-3'><img src={sampleImg} /></div>
                <div className='sideContent col-sm-9'>
                  <h3>Dummy Title Here</h3>
                  <p>In our busy lives, amidst the hustle and bustle, it's easy to overlook a fundamental aspect of our well-being....</p>
                </div>
              </div>
              <div className='sideBox row'>
                <div className='sideImg col-sm-3'><img src={sampleImg} /></div>
                <div className='sideContent col-sm-9'>
                  <h3>Dummy Title Here</h3>
                  <p>In our busy lives, amidst the hustle and bustle, it's easy to overlook a fundamental aspect of our well-being....</p>
                </div>
              </div>
              <div className='sideBox row'>
                <div className='sideImg col-sm-3'><img src={sampleImg} /></div>
                <div className='sideContent col-sm-9'>
                  <h3>Dummy Title Here</h3>
                  <p>In our busy lives, amidst the hustle and bustle, it's easy to overlook a fundamental aspect of our well-being....</p>
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