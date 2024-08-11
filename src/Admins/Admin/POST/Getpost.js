
import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import "./style.css"
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import Header from "../Common/Header/Header";
import PreviewImage from "../Common/PreviewImage"
import { IP } from '../../../Constant';






function Getpost() {
  const navigate = useNavigate()
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
        const res = await fetch(`${IP}/post/fetch?page=${pageNumber}&limit=5`);
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
    const isTypeMatched = !selectedType || post.type === selectedType;
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

  const handlePost = (cur) => {

    // nav(`/admin/${event_status},{ state: {startDate, endDate } }`);
    navigate(`/admin/post/editpage/${cur._id}`, { state: { cur } });

  };


  return (
    <>

      <div id="content">
        <div className="container-fluid">

          <Header

            searchText={search}
            setSearchText={setSearch}
            searchField={true}
            type={type}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            nav="/admin/post/addpost"
            btn_name="Add New"
            title="All posts"
            sub_title="list of all added posts"
          />


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
                          <span className="Edit mt-3" onClick={() => handlePost(cur)}>Edit Page</span>

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