
import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import "./style.css"
import { FallingLines } from 'react-loader-spinner';
// import { useNavigate } from 'react-router-dom';
import { IP } from '../../../Constant';

const PreviewImage = ({ attachments }) => {
  const [imageObjectURL, setImageObjectURL] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(`${IP}/file/${attachments}`);
      const imageBlob = await res.blob();
      const objectURL = URL.createObjectURL(imageBlob);
      setImageObjectURL(objectURL);
    };

    fetchImage();
  }, [attachments]);

  return (
    <div  >
      {imageObjectURL && <img src={imageObjectURL} alt="Preview" className="previewimage" />}
    </div>
  );
};




function Getpost() {
  // const nav=useNavigate()
  const [search, setSearch] = useState("")
  // const [Delete, setDelete] = useState([])
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(null);



  const [type, setType] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const [user, setUser] = useState([]);
  const [data, setData] = useState(1);
  const [count, setCount] = useState(0);

  // alert(selectedType)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const res = await fetch(`${IP}/post/fetch?page=${pageNumber}&limit=10`);
        const data = await res.json();
        setUser(prevData => [...prevData, ...data]);
        // setUser(data);
        console.log("get post data", data)
        setCount(data.length);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, [pageNumber]);


  // useEffect(() => {
  //   setLoading(false);
  //   setPageNumber(1); 
  // }, [selectedType]);


  const handleInfiniteScroll = async () => {
    try {

      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight
      ) {
        setPageNumber((prev) => prev + 1);
        setLoading(true)
      }

    } catch (error) {

    }
  }


  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll)
  }, [])

  const filteredUser = user.filter(post => {
    const isTypeMatched = !selectedType || post.type._id === selectedType;
    const isSearched = !search || post.title.toLowerCase().includes(search.toLowerCase());
    return isTypeMatched && isSearched;
  });



  useEffect(() => {
    fetch(`${IP}/terms/fetch`)
      .then((res) => res.json())
      .then((data) => {
        setType(data);
      })
      .catch((error) => {
      });
  }, []);

  // const handleDelete = (id) => {
  //   let token = localStorage.getItem("tokenadmin");
  //   fetch(`http://45.13.132.197:4000/api/post/${id}/remove_post`, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: token,
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {                    
  //       setDelete(data);
  //       if (data.status === 200) {

  //         nav("/admin/post");
  //       }

  //     })

  //     .catch((error) => {
  //       console.log(error);
  //     });

  // };

  return (
    <>

      <div id="content">
        <div className="container-fluid">
          <div className="row">
            <div className="">
              <div className="headings float_wrapper">
                <div className="gutter pull-left" >
                  <h3>All posts</h3>
                  <p>list of all add posts</p>
                </div>
                <div className="gutter pull-left">
                  <Link to="/admin/post/addpost">
                    <button className="button small primary"
                      type="button" name="button">Add New</button>
                  </Link>
                </div>
                <span className="toggle_sidebar" ></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="gutter">
              <div className="card layer1 filters">

                <div className="input_group">
                  <select
                    id="select-type"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="input"
                  >

                    <option value="">select type</option>
                    {type.map((cur) => (
                      <option key={cur._id} value={cur._id}>
                        {cur.name}
                      </option>
                    ))}
                  </select>
                  <span className="highlight"></span>
                </div>

                <div className="input_group pull-right" >
                  <input type="text" className="input" placeholder="search here.."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                  <span className="highlight"></span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="gutter">
              <table className="table-responsive ultra_responsive">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title/Description</th>
                    <th>Type</th>
                  </tr>
                </thead>






                {filteredUser?.map((cur, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className="card layer1">
                          <div className="inner">
                            <label htmlFor="" className="card_label"></label>
                            <div className='preview' style={{ width: "100%", height: "20vh", backgroundSize: "cover" }}>
                              <PreviewImage className="PreviewImage" attachments={cur.attachments} />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="content">
                          <span className="title " id='headingtitle'>{cur.title}</span>
                          <small> <p className="description" dangerouslySetInnerHTML={{ __html: cur.description.slice(0, 260) }} /></small>
                        </div>
                      </td>

                      <td>
                        <div className='typefield' >
                          <span style={{ display: "block" }}> {cur.type.name}</span>
                          <Link to={`/admin/post/editpage/${cur._id}`} >
                            <span className="Edit mt-3">Edit Page</span>
                          </Link>
                        </div>


                      </td>
                    </tr>
                  )
                })}

              </table>
              {loading && (
                <div style={{ textAlign: "center" }}>
                  <FallingLines
                    color="#03a9f4"
                    width="150"
                    visible={true}
                    ariaLabel="falling-circles-loading"
                  />
                </div>
              )}

            </div>
          </div>
        </div>

      </div>



    </>
  )
}

export default Getpost