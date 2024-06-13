
import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { IP } from '../../../Constant';
import { FallingLines } from "react-loader-spinner";
import moment from "moment";

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

    const Startdate = localStorage.getItem("startDate")
    const Enddate = localStorage.getItem("endDate")

    const [startDate, setStartDate] = useState(Startdate || moment().subtract(7, 'day').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(Enddate || moment().format('YYYY-MM-DD'));

    const [status, setStatus] = useState("");
    const [searchText, setSearchText] = useState("");

    // New state to store selected event data
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(null);

    const [type, setType] = useState([]);


    const [user, setUser] = useState([]);



    // alert(selectedType)

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const res = await fetch(`${IP}/blog/blogs?page=${pageNumber}&limit=5`);
                const data = await res.json();
                console.log("data get", data)
                const userdata = data.posts;
                setUser(prevData => [...prevData, ...userdata]);
                console.log("get post data", data)

                setLoading(false)
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





    const handleFilter = () => {
        // Filter data based on selected dates, status, and search text
        const filteredData = user.filter(event => {
            const eventDate = moment(event.updatedAt);
            const isWithinDateRange = (!startDate || eventDate.isSameOrAfter(startDate)) &&
                (!endDate || eventDate.isSameOrBefore(endDate));
            const isStatusMatched = !status || event.service_status === status;
            const isSearched = !searchText || (event.title && event.title.toLowerCase().includes(searchText.toLowerCase()));
            // const isSearched = !searchText || event.name.toLowerCase().includes(searchText.toLowerCase());
            return isWithinDateRange && isStatusMatched && isSearched;
        });
        return filteredData;
    };

    const memoizedUser = handleFilter();


    useEffect(() => {
        localStorage.setItem("startDate", startDate);
        localStorage.setItem("endDate", endDate);
    }, [startDate, endDate]);

    useEffect(() => {
        const today = moment().format('YYYY-MM-DD');
        setStartDate(moment(today).subtract(7, 'day').format('YYYY-MM-DD'));
        setEndDate(today);
        // localStorage.setItem("startDate", moment(today).subtract(7, 'day').format('YYYY-MM-DD'));
        // localStorage.setItem("endDate", today);
    }, []); // Empty dependency array means this effect will only run once after the initial render





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
                                <h3><span className='cursor title backarrow' onClick={() => nav(-1)}>&larr;</span>All Blogs</h3>
                                    
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
                    <div class="row">
                        <div class="gutter">
                            <div class="card layer1 filters">
                                <span class="highlight"> from </span>
                                <div class="input_group">
                                    <input type="date" class="input" placeholder="Start Date" onChange={e => setStartDate(e.target.value)} value={startDate} />
                                    <span class="highlight"></span>
                                </div>
                                <span class="highlight"> to </span>
                                <div class="input_group">
                                    <input type="date" class="input" placeholder="End Date" onChange={e => setEndDate(e.target.value)} value={endDate} />
                                    <span class="highlight"></span>
                                </div>


                                <div class="input_group pull-right" style={{ maxWidth: "20%" }}>
                                    <input type="text" class="input" placeholder="search here.." onChange={e => setSearchText(e.target.value)} value={searchText} />
                                    <span class="highlight"></span>
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

            <ToastContainer />

        </>
    )
}

export default Blogs