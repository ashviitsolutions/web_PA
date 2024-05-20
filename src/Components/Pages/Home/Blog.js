import React, { useState, useEffect } from 'react';
import { IP } from '../../../Constant';
import { Link } from 'react-router-dom';

function Blog() {
  const [users, setUsers] = useState([]);
  const [image, setImage] = useState();
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${IP}/blog/blogs`);
        const data = await res.json();
        console.log("data", data)
        setUsers(data?.posts?.slice(0, 3));
        setImage(data[0].attachments)
        console.log("get post data", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("image post data", image);
  return (
    <>
      <div id="blog">
        <div className="container">
          <div className="row">
            <div className="heading content">
              <h3 className="dancing">Latest in Wellness!</h3>
              <p><small>Feeling healthy and feeling good about yourself is not a luxury, it's an absolute necessity!</small></p>
              <span className="eff"></span>
            </div>
          </div>

          <div className="row">
            <div id="types">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 col-sm-offset-1">
                    <div className="container-fluid">
                      <div className="row">
                        {users.map((user, index) => (
                          <div className="col-sm-4" key={user._id}>
                            <div className="item_wrapper">
                              <div className="item">
                                <Link to={`/detailblog/${user._id}`}>
                                  <div
                                    className="bg"
                                    style={{
                                      backgroundImage: `url(${`http://45.13.132.197:5000/api/file/${user.attachments}`})`,
                                      borderRadius: '7px',
                                    }}
                                  ></div>
                                  <div className="content">
                                    <h3>{user.title}</h3>
                                    <p dangerouslySetInnerHTML={{
                                      __html: index === activeCardIndex
                                        ? user.description
                                        : user.description.slice(0, 185) + (user.description.length > 185 ? "..." : "")
                                    }} />
                                  </div>
                                </Link>

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
      <div className='blogbuttons'>
        <Link to="/blogpage">
          <button className="button">View More</button>
        </Link>
      </div>
    </>
  );
}

export default Blog;
