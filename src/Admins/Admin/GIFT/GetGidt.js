import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { IP } from '../../../Constant';
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';
import Header from '../Common/Header/Header';
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
    const nav = useNavigate()
    const [search, setSearch] = useState("");
    const [type, setType] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [user, setUser] = useState([]);
    const [data, setData] = useState(1);

    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(null);



    useEffect(() => {
        setLoading(true);
        fetch(`${IP}/coupon/fetch?page=${pageNumber}&limit=10`).then(resp => resp.json())
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
                setLoading(false);
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
    }, [pageNumber]);



    console.log("admin giftcard", user)







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
        const filteredData = user.filter(item => {
            const matchesType = item.type === 'gift_card';
            const matchesSearch = !search || (
                (item.title && item.title.toLowerCase().includes(search.toLowerCase())) ||
                (item.price && item.price.toString().toLowerCase().includes(search.toLowerCase())) ||
                (item.offerValue && item.offerValue.toString().toLowerCase().includes(search.toLowerCase()))
            );
            return matchesType && matchesSearch;
        });

        return filteredData;
    }, [user, search]);


    return (
        <>
            <div id="content">
                <div className="container-fluid">
                    <Header
                        searchText={search}
                        setSearchText={setSearch}
                        nav="/admin/gift/addgift"
                        btn_name={"Add New"}
                        searchField={true}
                        title="All Gift Card"
                        sub_title="list of all gift card"

                    />


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
                                                            {cur.price} <span id="pricevalue"> USD</span>
                                                        </span>
                                                    </div>
                                                    <div className="content mt-3">
                                                        <span className="title" id="headingtitle">
                                                            <span id="pricevalue">Value of Price: </span>
                                                            {cur.offerValue} <span id="pricevalue"> USD</span>
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

                        </div>
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
        </>
    );
}

export default GetGift;
