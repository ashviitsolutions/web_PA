import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { IP } from '../../../Constant';
import ReactPaginate from 'react-paginate';
import { FallingLines } from "react-loader-spinner";
import moment from "moment";
import { useLocation } from 'react-router-dom';

function Clients() {
    const location = useLocation();
    const startDates = location.state ? location.state.startDate : "";
    const endDates = location.state ? location.state.endDate : "";
    const Startdate = localStorage.getItem("startDate")
    const Enddate = localStorage.getItem("endDate")
    const [user, setUser] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(null);
    const [startDate, setStartDate] = useState(startDates || Startdate); // Initialize with startDates
    const [endDate, setEndDate] = useState(endDates || Enddate); // Initialize with endDates
    const [status, setStatus] = useState("");
    const [searchText, setSearchText] = useState("");
    const token = localStorage.getItem('tokenadmin');

    useEffect(() => {
        setLoading(true);
        fetch(`${IP}/admin/allusers?page=${pageNumber}&limit=10`, {
            headers: {
                'Authorization': token
            }
        }).then(resp => resp.json())
            .then(result => {
                // if (result && result.users && result.users.length > 0) {
                //     const userdata = result;
                //     setUser(prevData => [...prevData, ...userdata]);
                //     setLoading(false);
                //     console.log("Users fetched:", userdata);
                // } else if (result && result.msg) {
                //     console.log(result.msg);
                // } else {
                //     console.log("Invalid response format:", result);
                //     // setUser(prevData => [...prevData, ...result]);
                //     // Handle the case where the response doesn't match the expected format
                // }

                setUser(prevData => [...prevData, ...result]);
                setLoading(false);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
    }, [pageNumber]);





    // // Handle date change
    // useEffect(() => {
    //     // Update startDate and endDate when startDates or endDates change
    //     setStartDate(startDates);
    //     setEndDate(endDates);
    // }, [startDates, endDates]);




    useEffect(() => {
        localStorage.setItem("startDate", startDate);
        localStorage.setItem("endDate", endDate);
    }, [startDate, endDate]);


    useEffect(() => {
     
        setStartDate(Startdate);
        setEndDate(Enddate);
    }, [endDates, endDates]);// Empty dependency array means this effect will only run once after the initial render





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
                <div className="container-fluid">
                    <div className="row">
                        <div className="">
                            <div className="headings float_wrapper" id="clientget">
                                <div className="gutter pull-left">
                                    <h3>All Clients</h3>
                                    <p>list of all Clients</p>
                                </div>
                                <div className="gutter pull-left">
                                    <Link to="/admin/clients/add_client">
                                        <button className="button small primary" type="button">
                                            Add Client
                                        </button>
                                    </Link>
                                </div>
                                <span className="toggle_sidebar"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="gutter">
                            <div class="card layer1 filters">
                                <div class="input_group">
                                    <input type="date" class="input" placeholder="Start Date" onChange={e => setStartDate(e.target.value)} value={startDate} />
                                    <span class="highlight"></span>
                                </div>
                                <span class="highlight"> From </span>
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
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Created at</th>
                                        <th>Created by</th>
                                    </tr>
                                </thead>
                                <tbody id="post_container">
                                    {memoizedUser.map((client, index) => (
                                        <tr className="wrapper" key={index} id={`tr_post_${client.id}`}>
                                            <td>
                                                <div className="content">
                                                    <Link to={`/admin/clients/edit_client/${client.id}`}>
                                                        <span className="title">{client.first_name} {client.last_name}</span>
                                                    </Link>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="content">
                                                    <Link to={`/admin/clients/edit_client/${client.id}`}>
                                                        <span className="title">{client.email}</span>
                                                    </Link>
                                                </div>
                                            </td>
                                            <td>{client.createdAt}</td>
                                            <td>admin</td>
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

export default Clients;
