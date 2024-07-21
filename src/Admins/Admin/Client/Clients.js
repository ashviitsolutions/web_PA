import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IP } from '../../../Constant';
import ReactPaginate from 'react-paginate';
import { FallingLines } from "react-loader-spinner";
import moment from "moment";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Clients() {
    const location = useLocation();
    const navigate = useNavigate()
    const startDates = location.state ? location.state.startDate : "";
    const endDates = location.state ? location.state.endDate : "";
    const Startdate = localStorage.getItem("startDate")
    const Enddate = localStorage.getItem("endDate")
    const [user, setUser] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(null);
    const [startDate, setStartDate] = useState(startDates || Startdate || moment().subtract(7, 'day').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(endDates || Enddate || moment().format('YYYY-MM-DD'));
    const [status, setStatus] = useState("");
    const [searchText, setSearchText] = useState("");
    const token = localStorage.getItem('tokenadmin');

    useEffect(() => {
        const nextDay = new Date(endDate);
        nextDay.setDate(nextDay.getDate() + 1);
        setLoading(true);
        setLoading(true);
        fetch(`${IP}/admin/all-users?page=${pageNumber}&limit=10&startDate=${startDate}&endDate=${nextDay.toISOString().split('T')[0]}`, {
            headers: {
                'Authorization': token
            }


        }).then(resp => resp.json())
            .then(result => {

                console.log("user details", result)


                setUser(result?.users);
                setLoading(false);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
    }, [startDate ,endDate]);



    console.log("memberhsip and name list", user)








    useEffect(() => {
        localStorage.setItem("startDate", startDate);
        localStorage.setItem("endDate", endDate);
    }, [startDate, endDate]);

    useEffect(() => {
        const today = moment().format('YYYY-MM-DD');
        setStartDate(moment(today).subtract(7, 'day').format('YYYY-MM-DD'));
        setEndDate(today);
    }, []);




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
           
           
            const isSearched = !searchText || (contractor.first_name.toLowerCase().includes(searchText.toLowerCase()) || contractor.last_name.toLowerCase().includes(searchText.toLowerCase()) || contractor.email.toLowerCase().includes(searchText.toLowerCase()));
            return isSearched;
        });
        return filteredData;
    };

    const memoizedUser = handleFilter();

    console.log("memoizedUser ", memoizedUser)










    const handleRowClick = (client) => {
        console.log("cur", client); // Check the structure of cur
        navigate(`/admin/clients/edit_client/${client._id}`, { state: { client } });
    };




    return (
        <>
            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="">
                            <div className="headings float_wrapper" id="clientget">
                                <div className="gutter pull-left">
                                    <h3><span className='cursor title backarrow' onClick={() => navigate(-1)}>&larr;</span> All Clients</h3>
                                    <p>list of all Clients</p>
                                </div>
                                <div className="gutter pull-left">
                                    <Link to="/admin/clients/add_client">
                                        <button className="button small primary" type="button">
                                            Add Client
                                        </button>
                                    </Link>
                                </div>
                                <div className="gutter pull-right"><small className='sub'>* Click on client to view details</small></div>
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
                                        <tr className="wrapper cursor" key={index} id={`tr_post_${client.id}`} onClick={() => handleRowClick(client)}>
                                            <td>
                                                <div className="content">

                                                    <span className="title">{client.first_name} {client.last_name}</span>

                                                    {
                                                        client?.membershipType ? (
                                                            <p className='sub'>{client.membershipType}</p>

                                                        ) : (
                                                            <p className='sub'>No Memberhsip</p>
                                                        )
                                                    }

                                                </div>
                                            </td>
                                            <td>
                                                <div className="content sub" >

                                                    <span className="title">{client.email}</span>
                                                    <p className="title">{client.mobile}</p>

                                                </div>
                                            </td>

                                            <td> {moment(client.createdAt).format('DD-MM-YYYY hh:mm A')}</td>
                                            <td>{client.created_by}</td>
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
