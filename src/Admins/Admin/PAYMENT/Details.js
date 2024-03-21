import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { IP } from '../../../Constant';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import avtar from "../../img/avtar.jpg"
import ReactPaginate from 'react-paginate';
import { FallingLines } from 'react-loader-spinner';
import "./Payment.css"


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



function Details() {

    const [count, setCount] = useState(0);
    const [data, setData] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const [endDate, setEndDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [loading, setLoading] = useState(null);

    const [user, setUser] = useState([]);
    const [status, setStatus] = useState("");

    let token = localStorage.getItem("tokenadmin");







    useEffect(() => {
        setLoading(true);
        fetch(`${IP}/contractor/get?page=${pageNumber}&limit=10`, {
            headers: {
                'Authorization': token
            }
        })
            .then(resp => resp.json())
            .then(result => {
                if (result.msg) {
                    // Handle the case where no providers are found
                    console.log(result.msg);
                } else {
                    setUser(prevData => {
                        // Check for duplicates and concatenate only unique entries
                        const newData = result.filter(newItem => !prevData.some(oldItem => oldItem._id === newItem._id));
                        return [...prevData, ...newData];
                    });
                    setCount(result.length);
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false); // Set loading to false after fetching data
            });
    }, [pageNumber]);






    console.log("contractor", user)



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
        const filteredData = user.filter(contractor => {
            const isStatusMatched = !status || contractor.application_status_text === status;
            const isWithinDateRange = (!startDate || new Date(contractor.createdAt) >= new Date(startDate)) &&
                (!endDate || new Date(contractor.createdAt) <= new Date(endDate));
            const isSearched = !searchText || (contractor.first_name.toLowerCase().includes(searchText.toLowerCase()) || contractor.last_name.toLowerCase().includes(searchText.toLowerCase()) || contractor.email.toLowerCase().includes(searchText.toLowerCase()));
            return isWithinDateRange && isStatusMatched && isSearched;
        });
        return filteredData;
    };












    const memoizedUser = handleFilter();

    return (
        <>
            <div id="content">
                <div class="container-fluid">

                    <div class="row">
                        <div class="col">
                            <div class="headings">
                                <h3>Payments</h3>
                                <span class="toggle_sidebar"></span>
                            </div>
                        </div>
                        <div class="col-auto mt-3">
                            <button class="btn btn-primary">Release Payment</button>
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


                             
                            </div>
                        </div>
                    </div>



                    <table className="payments-table">
                        <thead>
                            <tr>
                                <th>Checkbox</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Service Name</th>
                                <th>Addons</th>

                                <th>Gratuity(14%)</th>
                                <th>Total Charges</th>
                                <th>Total Pay</th>

                            </tr>
                        </thead>
                        <tbody>
                            {memoizedUser.map((cur, index) => (
                                <tr key={index}>

                                    <td>
                                        <input type="checkbox" />
                                    </td>


                                    <td >

                                        <span>19th march 2024</span>
                                    </td>
                                    <td >

                                        <span>12:300 PM</span>
                                    </td>

                                    <td>
                                        <td className="block-td">
                                            <span>ABC massage</span>
                                            <span>Single/Partner</span>
                                            <span>Duration: 60 Minutes</span>
                                            <span>Charges: 135$</span>
                                            <span>Comm. 70$</span>
                                        </td>

                                    </td>



                                    <td>
                                        <td className="block-td">
                                            <span>Addon Name: Charges</span>
                                            <span>Addon Name: Charges</span>
                                            <span>Addon total: 50$</span>
                                            <span>Commision: 7$</span>
                                        </td>

                                    </td>

                                    <td>32$</td>
                                    <td>{cur?.wallet?.available_amount?.toFixed(2)}$</td>
                                    <td>{cur?.wallet?.available_amount?.toFixed(2)}$</td>


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
        </>
    )
}

export default Details