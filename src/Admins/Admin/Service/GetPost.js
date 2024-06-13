
import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import { IP } from '../../../Constant';
import "./style.css";
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    //   const [Delete, setDelete] = useState([])

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
                const res = await fetch(`${IP}/service/view-services`);
                const data = await res.json();
                setUser(prevData => [...prevData, ...data]);
                setCount(data.length);
                // console.log("get data", data)
                setLoading(false); // Set loading to true before fetching data
            } catch (error) {
            }
        };

        fetchData();
    }, [data, search, selectedType]);


    const handlePageClick = (data) => {
        setData(data.selected + 1);
    };


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

    //   const handleDelete = (id) => {
    //     let token = localStorage.getItem("tokenadmin");
    //     fetch(`http://45.13.132.197:4000/api/service/delete/${id}`, {
    //       method: "DELETE",
    //       headers: {
    //         Authorization: token,
    //         'Content-Type': 'multipart/form-data'
    //       }
    //     })
    // <button onClick={(id)=>handleDelete(cur._id)}>Delete</button>

    //       .then((res) => res.json())
    //       .then((data) => {
    //         setDelete(data);
    //         console.log(data);

    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   };

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
                                                    <Link to={`/admin/services/edit_post/${cur._id}`} >
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
                            <div className='pagination'  >
                                <ReactPaginate
                                    itemsPerPage={10}
                                    previousLabel={'Previous'}
                                    nextLabel={'Next'}
                                    breakLabel={"..."}
                                    pageCount={Math.ceil(count / 10)}
                                    marginPagesDisplayed={3}
                                    pageRangeDisplayed={2}
                                    onPageChange={handlePageClick}
                                    // css apply on pagination
                                    containerClassName={'pagination justify-content-center py-3'}
                                    pageClassName={'page-item'}
                                    pageLinkClassName={'page-link'}
                                    previousClassName={'page-item'}
                                    previousLinkClassName={'page-link'}
                                    nextClassName={'page-item'}
                                    nextLinkClassName={'page-link'}
                                    breakClassName={'page-item'}
                                    breakLinkClassName={'page-link'}
                                    activeClassName={'active'}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </>
    )
}

export default Getpost