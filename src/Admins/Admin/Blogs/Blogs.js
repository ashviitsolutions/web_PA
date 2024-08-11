import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IP } from '../../../Constant';
import { FallingLines } from "react-loader-spinner";
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import Header from '../Common/Header/Header';
import PreviewImage from '../Common/PreviewImage';

function Blogs() {
    const nav = useNavigate();
    const [searchText, setSearchText] = useState('');
    const Startdate = localStorage.getItem('startDate');
    const Enddate = localStorage.getItem('endDate');
    const [startDate, setStartDate] = useState(Startdate || moment().subtract(7, 'day').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(Enddate || moment().format('YYYY-MM-DD'));
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(null);
    const [user, setUser] = useState([]);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const res = await fetch(`${IP}/blog/blogs?page=${pageNumber}&limit=5`);
                const data = await res.json();
                setUser(prevData => [...prevData, ...data.posts]);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchData();
    }, [pageNumber]);

    const handleInfiniteScroll = async () => {
        try {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight
            ) {
                setPageNumber(prev => prev + 1);
                setLoading(true);
            }
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll);
        return () => window.removeEventListener('scroll', handleInfiniteScroll);
    }, []);

    const handleFilter = () => {
        return user.filter(event => {
            const eventDate = moment(event.updatedAt);
            const isWithinDateRange = (!startDate || eventDate.isSameOrAfter(startDate)) && (!endDate || eventDate.isSameOrBefore(endDate));
            const isSearched = !searchText || (event.title && event.title.toLowerCase().includes(searchText.toLowerCase()));
            return isWithinDateRange && isSearched;
        });
    };

    const memoizedUser = handleFilter();

    useEffect(() => {
        localStorage.setItem('startDate', startDate);
        localStorage.setItem('endDate', endDate);
    }, [startDate, endDate]);

    const handleDelete = id => {
        let token = localStorage.getItem('tokenadmin');
        fetch(`${IP}/blog/delete/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Your Post deleted successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    onClose: () => {
                        nav('/admin');
                    },
                });
            })
            .catch(error => {
                console.log(error);
                toast.error('An error occurred. Please try again.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            });
    };

    return (
        <>


            <div id="content">
                <div className="container-fluid">
                    <Header
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        searchText={searchText}
                        setSearchText={setSearchText}
                        searchField={true}
                        nav="/admin/blog/addblogs"
                        btn_name="Add New"
                        title="All Blogs"
                        sub_title="List of all added blogs"
                    />
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

                                {memoizedUser.map((cur, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="card layer1">
                                                <div className="inner">
                                                    <div className="preview" style={{ width: '100%', height: '20vh', backgroundSize: 'cover' }}>
                                                        <PreviewImage className="PreviewImage" attachments={cur.attachments} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="content">
                                                <span className="title" id="headingtitle">{cur.title}</span>
                                                <small><p className="description" dangerouslySetInnerHTML={{ __html: cur.description.slice(0, 260) }} /></small>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="typefield">
                                                <Link to={`/admin/blog/editblogs/${cur._id}`}>
                                                    <span className="Edit mt-3">Edit Page</span>
                                                </Link>
                                            </div>
                                            <div className="typefield">
                                                <span className="Edit mt-3" onClick={() => handleDelete(cur._id)}>Delete</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </table>

                            {loading && (
                                <div style={{ textAlign: 'center' }}>
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
    );
}

export default Blogs;
