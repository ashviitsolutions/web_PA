import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IP } from '../../../Constant';
import ReactPaginate from 'react-paginate';
import { FallingLines } from "react-loader-spinner";
import moment from "moment";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../Common/Header/Header';


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
    }, [startDate, endDate]);



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

                    <Header
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        searchText={searchText}
                        setSearchText={setSearchText}
                        searchField={true}
                        nav="/admin/clients/add_client"
                        btn_name="Add Client"
                        title="All Clients"
                        sub_title="list of all Clients"
                        info={{
                            para1: "* Click on client to view details"
                        }}
                    />

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
