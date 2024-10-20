
import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import { IP } from '../../../Constant';
import "./style.css";
import PreviewImage from '../Common/PreviewImage';
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';






function Getpost() {
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    //   const [Delete, setDelete] = useState([])
    const [pageNumber, setPageNumber] = useState(1);

    const [loading, setLoading] = useState(null);

    const [type, setType] = useState([]);
    const [selectedType, setSelectedType] = useState("");

    const [user, setUser] = useState([]);
    const [data, setData] = useState(1);
    const [count, setCount] = useState(0);

    // alert(selectedType)
    console.log("selectedType", selectedType)

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const res = await fetch(`${IP}/service/view-services?page=${pageNumber}&limit=5`);
                const data = await res.json();
                setUser(prevData => [...prevData, ...data]);
                setCount(data.length);
                console.log("get data", data)
                setLoading(false); // Set loading to true before fetching data
            } catch (error) {
            }
        };

        fetchData();
    }, [pageNumber]);


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
    


    const filteredAndMemoizedUser = useMemo(() => {
        const filteredUser = user.filter(post => {
            console.log("filteredUser", post);
            const isCategoryMatched = !selectedType || (post.category === selectedType);
            const isSearched = !search || post.title.toLowerCase().includes(search.toLowerCase());
            return isCategoryMatched && isSearched;
        });
        return filteredUser.slice((data - 1) * 10, data * 10);
    }, [user, data, selectedType, search]);




    useEffect(() => {
        fetch(`${IP}/service/market_place`)
            .then((res) => res.json())
            .then((data) => {
                setType(data);
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);


    const handleService = (cur) => {

        // nav(`/admin/${event_status},{ state: {startDate, endDate } }`);
        navigate(`/admin/services/edit_post/${cur._id}`, { state: { cur } });
    
      };
   

    return (
        <>
            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="">
                            <div className="headings float_wrapper">
                                <div className="gutter pull-left" >
                                <h3><span className='cursor title backarrow' onClick={() => navigate(-1)}>&larr;</span> All Service</h3>
                                    
                                    <p>list of all add posts</p>
                                </div>
                                <div className="gutter pull-left">
                                    <Link to="/admin/services/add_service">
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
                                                {cur}
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
                                        <th>Price/Type</th>
                                    </tr>
                                </thead>






                                {filteredAndMemoizedUser.map((cur, index) => {
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
                                                    <small> <p className="description" dangerouslySetInnerHTML={{ __html: cur.description.slice(0, 250) }} /></small>
                                                </div>
                                            </td>


                                            <td>
                                                <div className='typefield ' >
                                                    <span style={{ display: "block" }}> {cur.category}</span>
                                                    <div className="content mt-3" >
                                                        <span className="title " id='headingtitle'><span id='pricevalue'>Price: </span>{cur.price}<span id='pricevalue'> USD</span></span>

                                                    </div>
                                                    
                                                   
                                                        <span className="Edit mt-3" onClick={() => handleService(cur)}>Edit Page</span>
                                                  
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