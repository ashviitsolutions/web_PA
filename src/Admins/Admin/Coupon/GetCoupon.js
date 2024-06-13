import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FallingLines } from "react-loader-spinner";
import { IP } from '../../../Constant';
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
        <div>
            {imageObjectURL && <img src={imageObjectURL} alt="Preview" className="previewimage" />}
        </div>
    );
};

function GetCoupon() {
    const nav=useNavigate()
    const [search, setSearch] = useState("");
    const [user, setUser] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCoupons = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${IP}/coupon/fetch?page=${pageNumber}&limit=10`);
                const result = await response.json();
                if (result && result.coupons) {
                    setUser(prevData => [...prevData, ...result.coupons]);
                } else {
                    console.error('Invalid response format:', result);
                }
            } catch (error) {
                console.error('Error fetching coupons:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCoupons();
    }, [pageNumber]);

    const handleInfiniteScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setPageNumber(prev => prev + 1);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        return () => window.removeEventListener("scroll", handleInfiniteScroll);
    }, [handleInfiniteScroll]);

    const memoizedUser = useMemo(() => {
        return user.filter(item => {
            const matchesType = item.type === 'coupon';
            const matchesSearch = !search || (
                (item.title && item.title.toLowerCase().includes(search.toLowerCase())) ||
                (item.price && item.price.toString().toLowerCase().includes(search.toLowerCase())) ||
                (item.offerValue && item.offerValue.toString().toLowerCase().includes(search.toLowerCase()))
            );
            return matchesType && matchesSearch;
        });
    }, [user, search]);

    console.log("filter data", memoizedUser)

    return (
        <>
            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="">
                            <div className="headings float_wrapper">
                                <div className="gutter pull-left">
                                <h3><span className='cursor title backarrow' onClick={() => nav(-1)}>&larr;</span>All Coupon Cards</h3>
                                   
                                    <p>List of all add posts</p>
                                </div>
                                <div className="gutter pull-left">
                                    <Link to="/admin/coupon/addcoupon">
                                        <button className="button small primary" type="button">
                                            Add New
                                        </button>
                                    </Link>
                                </div>
                                <span className="toggle_sidebar"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="gutter">
                            <div className="card layer1 filters">
                                <div className="input_group pull-right">
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Search here.."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
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
                                <tbody>
                                    {memoizedUser.map((cur, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="card layer1">
                                                    <div className="inner">
                                                        <label className="card_label"></label>
                                                        <div
                                                            className='preview'
                                                            style={{ width: "100%", height: "20vh", backgroundSize: "cover" }}
                                                        >
                                                            <PreviewImage className="PreviewImage" attachments={cur.attachments} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="content">
                                                    <span className="title" id='headingtitle'>{cur.title}</span>
                                                    <small><p className="description" dangerouslySetInnerHTML={{ __html: cur.description }} /></small>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='typefield'>
                                                    <span style={{ display: "block" }}>{cur.category}</span>
                                                    <div className="content mt-3">
                                                        <span className="title" id='headingtitle'><span id='pricevalue'>Coupon code: </span>{cur.coupon_code}</span>
                                                    </div>
                                                    <div className="content mt-3">
                                                        {cur.percent_off && (
                                                            <span className="title" id='headingtitle'>
                                                                <span id='pricevalue'>off: {cur.percent_off}% </span>
                                                            </span>
                                                        )}
                                                        {cur.amount_off && (
                                                            <span className="title" id='headingtitle'>
                                                                <span id='pricevalue'>off: {cur.amount_off}$ </span>
                                                            </span>
                                                        )}
                                                    </div>
                                                    <Link to={`/admin/coupon/editcoupon/${cur._id}`}>
                                                        <span className="Edit mt-3">Edit Page</span>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
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
    );
}

export default GetCoupon;
