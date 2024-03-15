import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { IP } from '../../../Constant';
import ReactPaginate from 'react-paginate';
import { FallingLines } from "react-loader-spinner";
import moment from "moment";

function Clients() {
    const [user, setUser] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
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
                if (result && result.users && result.users.length > 0) {
                    // setUser(result.users);
                    const userdata = result.users;
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
            const isSearched = !searchText || (event.name && event.name.toLowerCase().includes(searchText.toLowerCase()));
            // const isSearched = !searchText || event.name.toLowerCase().includes(searchText.toLowerCase());
            return isWithinDateRange && isStatusMatched && isSearched;
        });
        return filteredData;
    };

    const memoizedUser = handleFilter();



    // const memoizedUser = handleFilter();
    console.log("Memoized User:", memoizedUser);






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
                                                        <span className="title">{client.name}</span>
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
