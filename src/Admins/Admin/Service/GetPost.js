
import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from "../../Sidebar/Sidebar"
import ReactPaginate from 'react-paginate';

const PreviewImage = ({ attachments }) => {
    const [imageObjectURL, setImageObjectURL] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            const res = await fetch(`http://45.13.132.197:4000/api/file/${attachments}`);
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
    const [search, setSearch] = useState("")
    //   const [Delete, setDelete] = useState([])



    const [type, setType] = useState([]);
    const [selectedType, setSelectedType] = useState("");

    const [user, setUser] = useState([]);
    const [data, setData] = useState(1);
    const [count, setCount] = useState(0);

    // alert(selectedType)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://45.13.132.197:4000/api/service/view-services`);
                const data = await res.json();
                setUser(data);
                setCount(data.length);
                console.log("get data" , data)
            } catch (error) {
            }
        };

        fetchData();
    }, [data, search, selectedType]);


    const handlePageClick = (data) => {
        setData(data.selected + 1);
    };

    const memoizedUser = useMemo(() => {
        return user.slice((data - 1) * 10, data * 10);
    }, [user, data]);



    useEffect(() => {
        fetch(`http://45.13.132.197:4000/api/service/market_place`)
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
            <Sidebar />
            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="">
                            <div className="headings float_wrapper">
                                <div className="gutter pull-left" >
                                    <h3>All Service</h3>
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






                                {memoizedUser.filter((values) => {
                                    if (search === "") {
                                        return values;
                                    } else if (values.type.name.toLowerCase().includes(search.toLocaleLowerCase())) {
                                        return values
                                    }
                                }).map((cur, index) => {
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
                                                    <p className="description" dangerouslySetInnerHTML={{ __html: cur.description }} />
                                                </div>
                                            </td>
                                            
                                         
                                            <td>
                                                <div className='typefield' >
                                                    <span style={{ display: "block" }}> {cur.category}</span>
                                                    <div className="content">
                                                    <span className="title " id='headingtitle'>{cur.price}</span>
    
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