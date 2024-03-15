import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { IP } from '../../../Constant';
import { FallingLines } from "react-loader-spinner";
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

function GetGift() {
    const [search, setSearch] = useState("");
    const [type, setType] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [user, setUser] = useState([]);
    const [data, setData] = useState(1);

    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(null);



    useEffect(() => {
        setLoading(true);
        fetch(`${IP}/coupon/fetch?page=${pageNumber}&limit=20`).then(resp => resp.json())
            .then(result => {
                if (result && result.coupons && result.coupons.length > 0) {
                    // setUser(result.users);
                    const userdata = result.coupons;
                    setUser(prevData => [...prevData, ...userdata]);
                    setLoading(false);
                    console.log("Users fetched:", result.users);
                } else if (result && result.msg) {
                    console.log(result.msg);
                } else {
                    console.log("Invalid response format:", result);
                }
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
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
            setLoading(false)
        }
    }


    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        return () => window.removeEventListener("scroll", handleInfiniteScroll)
    }, [])



    const memoizedUser = useMemo(() => {
        // Coupon category ka data filter karo
        const filteredData = user.filter(item => item.type === 'gift_card');

        // Data ka desired portion slice karo
        return filteredData;
    }, [user]);

    return (
        <>
            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="">
                            <div className="headings float_wrapper">
                                <div className="gutter pull-left">
                                    <h3>All Gift Card</h3>
                                    <p>list of all add posts</p>
                                </div>
                                <div className="gutter pull-left">
                                    <Link to="/admin/gift/addgift">
                                        <button className="button small primary" type="button" name="button">
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
                                        placeholder="search here.."
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

                                {memoizedUser.map((cur, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <div className="card layer1">
                                                    <div className="inner">
                                                        <label htmlFor="" className="card_label"></label>
                                                        <div
                                                            className="preview"
                                                            style={{ width: "100%", height: "20vh", backgroundSize: "cover" }}
                                                        >
                                                            <PreviewImage className="PreviewImage" attachments={cur.attachments} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="content">
                                                    <span className="title" id="headingtitle">
                                                        {cur.title}
                                                    </span>
                                                    <small>
                                                        <p
                                                            className="description"
                                                            dangerouslySetInnerHTML={{ __html: cur.description }}
                                                        />
                                                    </small>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="typefield">
                                                    <span style={{ display: "block" }}>{cur.category}</span>
                                                    <div className="content mt-3">
                                                        <span className="title" id="headingtitle">
                                                            <span id="pricevalue">Price: </span>
                                                            {cur.amount_off} <span id="pricevalue"> USD</span>
                                                        </span>
                                                    </div>
                                                    <div className="content mt-3">
                                                        <span className="title" id="headingtitle">
                                                            <span id="pricevalue">Value of Price: </span>
                                                            {cur.amount_off} <span id="pricevalue"> USD</span>
                                                        </span>
                                                    </div>
                                                    <Link to={`/admin/gift/editgift/${cur._id}`}>
                                                        <span className="Edit mt-3">Edit Page</span>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    );
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
    );
}

export default GetGift;
