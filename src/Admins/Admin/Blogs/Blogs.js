
import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
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




function Blogs() {
    const nav = useNavigate()
    const [search, setSearch] = useState("")
    // const [Delete, setDelete] = useState([])



    const [type, setType] = useState([]);
    const [selectedType, setSelectedType] = useState("");

    const [user, setUser] = useState([]);
    const [data, setData] = useState(1);
    const [count, setCount] = useState(0);

    // alert(selectedType)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${IP}/blog/blogs`);
                const data = await res.json();
                setUser(data);
                console.log("get post data", data)
                setCount(data.length);
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
        fetch(`${IP}/terms/fetch`)
            .then((res) => res.json())
            .then((data) => {
                setType(data);
            })
            .catch((error) => {
            });
    }, []);

    const handleDelete = (id) => {
        let token = localStorage.getItem("tokenadmin");
        fetch(`${IP}/blog/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                toast.success("Your Post deleted successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    onClose: () => {
                        nav("/admin");
                    },
                });
            })
            .catch((error) => {
                console.log(error);
                toast.error("An error occurred. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            });
    };



    return (
        <>
            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="">
                            <div className="headings float_wrapper">
                                <div className="gutter pull-left" >
                                    <h3>All Blogs</h3>
                                    <p>list of all add blogs</p>
                                </div>
                                <div className="gutter pull-left">
                                    <Link to="/admin/blog/addblogs">
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
                                        <th>Action</th>
                                    </tr>
                                </thead>






                                {memoizedUser.map((cur, index) => {
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

                                                    <Link to={`/admin/blog/editblogs/${cur._id}`} >
                                                        <span className="Edit mt-3">Edit Page</span>
                                                    </Link>
                                                </div>

                                                <div className='typefield'>
                                                    <span className="Edit mt-3" onClick={() => handleDelete(cur._id)}>Delete</span>
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

            <ToastContainer />

        </>
    )
}

export default Blogs