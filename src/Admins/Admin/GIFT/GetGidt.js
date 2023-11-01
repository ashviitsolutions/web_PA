import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
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
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${IP}/coupon/fetch`);
                const data = await res.json();
                setUser(data);
                setCount(data.length);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [data, search, selectedType]);

    const handlePageClick = (data) => {
        setData(data.selected + 1);
    };

    const itemsPerPage = 10;
    const startIndex = (data - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedUser = user
        .filter((values) => {
            if (search === "") {
                return true;
            } else if (values.title.toLowerCase().includes(search.toLowerCase())) {
                return true;
            }
            return false;
        })
        .slice(startIndex, endIndex);




    const memoizedUser = useMemo(() => {
        // Coupon category ka data filter karo
        const filteredData = user.filter(item => item.type === 'gift_card');

        // Data ka desired portion slice karo
        return filteredData.slice((data - 1) * 10, data * 10);
    }, [user, data]);

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

                                {memoizedUser.filter((values) => {
                                    if (search === "") {
                                        return values;
                                    } else if (values.title.toLowerCase().includes(search.toLocaleLowerCase())) {
                                        return values
                                    }
                                }).map((cur, index) => {
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
                            <div className="pagination">
                                <ReactPaginate
                                    pageCount={Math.ceil(count / itemsPerPage)}
                                    pageRangeDisplayed={2}
                                    marginPagesDisplayed={3}
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    breakLabel={"..."}
                                    onPageChange={handlePageClick}
                                    containerClassName={"pagination justify-content-center py-3"}
                                    pageClassName={"page-item"}
                                    pageLinkClassName={"page-link"}
                                    previousClassName={"page-item"}
                                    previousLinkClassName={"page-link"}
                                    nextClassName={"page-item"}
                                    nextLinkClassName={"page-link"}
                                    breakClassName={"page-item"}
                                    breakLinkClassName={"page-link"}
                                    activeClassName={"active"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GetGift;
