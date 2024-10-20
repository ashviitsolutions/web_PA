import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { IP } from "../../Constant";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import avtar from "../../Admins/img/avtar.jpg"
import ReactPaginate from 'react-paginate';

const PreviewImage = ({ attachments }) => {
    const [imageObjectURL, setImageObjectURL] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            const res = await fetch(`${IP}/file/${attachments}`);
            const imageBlob = await res.blob();
            const objectURL = URL.createObjectURL(imageBlob);
            setImageObjectURL(objectURL);
            console.log("image", res);
        };

        fetchImage();
    }, [attachments]);

    return (
        <div>
            {imageObjectURL && (
                <img
                    src={imageObjectURL || avtar}
                    alt="No Image uploaded"
                    className="previewimage"
                    style={{
                        borderRadius: "10px",
                        height: "80px",
                        marginTop: "10px",
                        marginLeft: "70px",
                    }}
                />
            )}
        </div>
    );
};




function EarningCard() {
    const [data, setData] = useState(1);
    const [count, setCount] = useState(0);

    let token = localStorage.getItem("providertoken");
    const [user, setUser] = useState([]);


    useEffect(() => {
        fetch(`${IP}/provider/getPayment`, {
            headers: {
                'Authorization': token
            }
        }).then(resp => {
            return resp.json()
        }).then(result => {
            setUser(result?.payments);
            setCount(result?.payments?.length);
            console.log("earning", result?.payments)
        }).catch(err => {
            console.log(err)
        })

    }, [data])

    const handlePageClick = (data) => {
        setData(data.selected + 1);
    };

    // const memoizedUser = useMemo(() => {
    //     return user.slice((data - 1) * 10, data * 10);
    // }, [user, data]);

    const memoizedUser = useMemo(() => {
        if (Array.isArray(user)) {
            return user.slice((data - 1) * 10, data * 10);
        } else {
            // Handle the case when user is not an array
            console.error("User is not an array");
            return []; // or handle it in a way that makes sense for your use case
        }
    }, [user, data]);

    return (
        <>





            <div className="row">
                <div className="gutter">
                    <table className="table-responsive ultra_responsive">
                        <thead>
                            <tr>
                                <th>Payment Proof</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>PaymentId</th>
                            </tr>
                        </thead>


                        {memoizedUser.map((cur, index) => (
                            <React.Fragment key={index}>
                                <tbody id="post_container">
                                    <tr className="wrapper" id="tr_post_77">
                                        <td>
                                            <div className="avatar_wrap">
                                                <div className="inner">
                                                    <div className='preview' style={{
                                                        width: "50%",
                                                        //  height:"80px",
                                                        backgroundSize: "cover",

                                                    }}>
                                                        <PreviewImage className="avatar" attachments={cur.attachments} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="content">
                                                <span className="title" >{`${cur.additionalInfo}`} </span>
                                                <span className="title" style={{ display: "block", fontSize: "12px" }}>{cur.email}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="content">
                                                <span className="title">{cur?.amount?.toFixed(2)}</span>

                                            </div>
                                        </td>
                                        <td>
                                            <div className="content">
                                                <span className="title">{cur?.paymentId}</span>

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </React.Fragment>
                        ))}

                    </table>
                </div>
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

        </>
    )
}

export default EarningCard