import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import "./style.css"
import { IP } from '../../../Constant';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import avtar from "../../img/avtar.jpg"
import { FallingLines } from 'react-loader-spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../Common/Header/Header"
import moment from 'moment';

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




function Contractors() {
    const navigate = useNavigate()
    const Startdate = localStorage.getItem("startDate")
    const Enddate = localStorage.getItem("endDate")
    const location = useLocation();
    const vender_status = location.state ? location.state.vender_status : "";
    const startDates = location.state ? location.state.startDate : "";
    const endDates = location.state ? location.state.endDate : "";
    const [data, setData] = useState(1);
    const [count, setCount] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const [startDate, setStartDate] = useState(startDates || Startdate || moment().subtract(7, 'day').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(endDates || Enddate || moment().format('YYYY-MM-DD'));
    const [loading, setLoading] = useState(null);
    let token = localStorage.getItem("tokenadmin");
    const [user, setUser] = useState([]);
    const [status, setStatus] = useState("");





    useEffect(() => {
        const nextDay = new Date(endDate);
        nextDay.setDate(nextDay.getDate() + 1);
        setLoading(true);
        fetch(`${IP}/contractor/list?page=${pageNumber}&limit=10&startDate=${startDate}&endDate=${nextDay.toISOString().split('T')[0]}`, {
            headers: {
                'Authorization': token
            }
        }).then(resp => {
            return resp.json()
        }).then(result => {
            if (result.msg) {
                // Handle the case where no providers are found
                console.log(result.msg);
            } else {
                // Update the user state with the fetched contractors
                setUser(result);
                setCount(result.length);
                setLoading(false);
                // console.log("contractor", result)
            }
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false); // Set loading to false after fetching data
        });
    }, [startDate, endDate]);





    useEffect(() => {
        localStorage.setItem("startDate", startDate);
        localStorage.setItem("endDate", endDate);
    }, [startDate, endDate]);





    const handleInfiniteScroll = async () => {
        try {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight
            ) {
                setPageNumber(prev => prev + 1);
                setLoading(true)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        return () => window.removeEventListener("scroll", handleInfiniteScroll)
    }, []);



    const handleFilter = () => {
        console.log("start date and end date", startDate, endDate)

        // Filter data based on selected dates, status, and search text
        const filteredData = user.filter(contractor => {
            console.log("createAt date", contractor.createdAt)
            const isStatusMatched = !status || contractor.application_status_text === status;
            const eventDate = moment(contractor.createdAt, 'YYYY-MM-DD'); // Adjust the format based on the actual format of eventDate

            const isSearched = !searchText || (contractor.first_name.toLowerCase().includes(searchText.toLowerCase()) || contractor.last_name.toLowerCase().includes(searchText.toLowerCase()) || contractor.email.toLowerCase().includes(searchText.toLowerCase()));
            return isStatusMatched && isSearched;
        });
        return filteredData;
    };



    const memoizedUser = handleFilter();
    console.log("Memoized User:", memoizedUser);

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
                        nav="/admin/contractors/add_contractor"
                        btn_name="Add Contractor"
                        title="All Contractors"
                        sub_title="List of all add contractors"
                    />

                    <div className="row">
                        <div className="gutter">
                            <table className="table-responsive ultra_responsive">
                                <thead>
                                    <tr>
                                        <th>Profile</th>
                                        <th>Name/Email</th>
                                        <th>Status</th>
                                        <th>View page</th>
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
                                                                <PreviewImage className="avatar" attachments={cur.profile_pic} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="content">
                                                        <span className="title" >{`${cur.first_name} ${cur.last_name}`} </span>
                                                        <span className="title" style={{ display: "block", fontSize: "12px" }}>{cur.email}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="content">
                                                        <span className="title">{cur.application_status_text}</span>
                                                        <span className="title" style={{ display: "block", fontSize: "12px" }}>Created At: {cur.createdAt}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/admin/contractors/view_contractor/${cur._id}`}
                                                        state={{ application_status_text: cur.application_status_text }}
                                                    >
                                                        <RemoveRedEyeIcon />
                                                    </Link>
                                                </td>

                                            </tr>
                                        </tbody>
                                    </React.Fragment>
                                ))}

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
    )
}

export default Contractors