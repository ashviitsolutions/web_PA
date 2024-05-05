import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import { IP } from '../../../Constant';

function Statemement() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
    const [loading, setLoading] = useState(null);
    const [totalTip, setTotalTip] = useState(0);
    const [user, setUser] = useState([]);
    const [count, setCount] = useState(0);
    const [membershipDetails, setMembershipDetails] = useState([]);
    const [giftcarddetails, setGiftcarddetails] = useState([]);

    useEffect(() => {
        setStartDate(startDate);
        setEndDate(endDate);
    }, [startDate, endDate]);

    useEffect(() => {
        let updatedTotalTip = 0;
        user.forEach(provider => {
            provider.services.forEach(service => {
                updatedTotalTip += service.amount_calculation.amount_tip || 0;
            });
        });
        setTotalTip(updatedTotalTip);
    }, [user]);

    const handleRowClick = (cur) => {
        navigate(`/admin/payments/details/${cur.provider_details._id}`, { state: { cur, startDate, endDate } });
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${IP}/provider/get-all-statemnet`)
            .then(resp => resp.json())
            .then(result => {
                if (
                    result.servicesByProvider && Array.isArray(result.servicesByProvider) &&
                    result.giftcarddetails && Array.isArray(result.giftcarddetails) &&
                    result.membershipDetails && Array.isArray(result.membershipDetails)
                ) {
                    setUser(prevData => [...prevData, ...result.servicesByProvider]);
                    setMembershipDetails(prevData => [...prevData, ...result.membershipDetails]);
                    setGiftcarddetails(prevData => [...prevData, ...result.giftcarddetails]);
                    setCount(result.total_services || 0);
                } else {
                    console.log("Invalid data format received from API");
                }
            })
            .catch(err => console.error("Error fetching data:", err))
            .finally(() => setLoading(false));
    }, []);


    console.log("Invalid data format received from API", user);

    const handleInfiniteScroll = async () => {
        try {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                setPageNumber(prev => prev + 1);
                setLoading(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        return () => window.removeEventListener("scroll", handleInfiniteScroll);
    }, []);

    const handleFilter = () => {
        const filteredData = user.filter(event => {
            const eventDate = moment(event.services[0].createdAt, 'YYYY-MM-DD');
            const isWithinDateRange = (!startDate || moment(startDate).isSameOrBefore(eventDate, 'day')) &&
                (!endDate || moment(endDate).isSameOrAfter(eventDate, 'day'));
            const isSearched = !searchText || event.provider_details.first_name.toLowerCase().includes(searchText.toLowerCase());
            return isWithinDateRange && isSearched;
        });
        return filteredData;
    };

    const memoizedUser = handleFilter();

    return (
        <div id="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="">
                        <div className="headings">
                            <h3>Statement of Providers</h3>
                            <span className="toggle_sidebar" ></span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="gutter">
                        <div className="card layer1 filters">
                            <span className="highlight"> from </span>
                            <div className="input_group">
                                <input type="date" className="input" placeholder="Start Date" onChange={e => setStartDate(e.target.value)} value={startDate} />
                                <span className="highlight"></span>
                            </div>
                            <span className="highlight"> to </span>
                            <div className="input_group">
                                <input type="date" className="input" placeholder="End Date" onChange={e => setEndDate(e.target.value)} value={endDate} />
                                <span className="highlight"></span>
                            </div>
                            <div className="input_group pull-right" style={{ maxWidth: "20%" }}>
                                <input type="text" className="input" placeholder="search here.." onChange={e => setSearchText(e.target.value)} value={searchText} />
                                <span className="highlight"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="payments-table">
                    <thead>
                        <tr>
                            <th>Date/Time</th>
                            <th>Provider</th>
                            <th>description</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Tax(es)</th>
                            <th>Provider's commission</th>
                            <th>Profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memoizedUser.length === 0 && (
                            <tr>
                                <td colSpan="11">No data found</td>
                            </tr>
                        )}
                        {memoizedUser.map((cur, index) => (
                            <tr key={index}>
                                <td className='sub ' >
                                    <span>{moment(cur.createdAt).format("MMMM Do YYYY")}</span>
                                    <p><span>{moment(cur.createdAt).format("LT")}</span></p>
                                </td>
                                <td className="provDet">
                                    <p className='title cursor2' onClick={() => handleRowClick(cur)} title='click on provider to view details'><span>{`${cur?.provider_details?.first_name} ${cur?.provider_details?.last_name}`}</span></p>
                                    <span className='sub'>{cur?.provider_details?.mailing_address?.address}</span>
                                    <p className='sub'>email: <span>{cur?.provider_details?.email}</span></p>
                                    <p className='sub'>phone: <span>{cur?.provider_details?.phone}</span></p>
                                </td>
                                <td>service name</td>
                                <td className="provDet">
                                    <p className='title cursor2' onClick={() => handleRowClick(cur)} title='click on provider to view details'><span>{`${cur?.provider_details?.first_name} ${cur?.provider_details?.last_name}`}</span></p>
                                    <span className='sub'>{cur?.provider_details?.mailing_address?.address}</span>
                                    <p className='sub'>email: <span>{cur?.provider_details?.email}</span></p>
                                    <p className='sub'>phone: <span>{cur?.provider_details?.phone}</span></p>
                                </td>
                                <td>{cur?.total_admin_amount?.toFixed(2)}$</td>
                                <td>{cur?.total_tip_amount?.toFixed(2)}$</td>
                                <td>{cur?.total_provider_amount?.toFixed(2)}$</td>
                                <td>{cur?.total_tip_amount?.toFixed(2)}$</td>


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
    );
}

export default Statemement;
