import React, { useEffect, useState } from 'react';
import { IP } from '../../../Constant';
import ReactPaginate from 'react-paginate';

function Booking() {
    const [data, setData] = useState(0);
    const [count, setCount] = useState(0);
    const [user, setUser] = useState([]);

    const token = localStorage.getItem("tokenadmin");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${IP}/bookings/allbookings`, {
                    method: 'GET',
                    headers: {
                        Authorization: token
                    }
                });
                const data = await res.json();
                setUser(data);
                setCount(data.length);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handlePageClick = (selected) => {
        setData(selected.selected);
    };

    const itemsPerPage = 10;
    const startIndex = data * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (
        <>
            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="">
                            <div className="headings">
                                <h3>Bookings</h3>
                                <span className="toggle_sidebar"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="gutter">
                            <div className="card layer1 filters">
                                <div className="input_group">
                                    <select name="" id="" className="input">
                                        <option value="">Status</option>
                                        <option value="">Pending</option>
                                        <option value="">Schedule</option>
                                        <option value="">Completed</option>
                                    </select>
                                    <span className="highlight"></span>
                                </div>
                                <div className="input_group">
                                    <select name="" id="" className="input">
                                        <option value="">service</option>
                                        <option value="">service a</option>
                                        <option value="">service b</option>
                                        <option value="">service c</option>
                                        <option value="">service d</option>
                                        <option value="">service e</option>
                                    </select>
                                    <span className="highlight"></span>
                                </div>
                                <div className="input_group pull-right" style={{ maxWidth: "20%" }}>
                                    <input type="text" className="input" placeholder="search here.." />
                                    <span className="highlight"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="gutter">
                            <div className="bookings">
                                {user.slice(startIndex, endIndex).map((booking, index) => (
                                    <div className="item_wrapper" key={index}>
                                        <div className="item card layer2">
                                            <div className="first_half">
                                                <h3>{booking.title}</h3>
                                                <span className="address">email: {booking.customer_email}</span>
                                                <span className="address">address: {booking.address}</span>
                                                <span className="time">date: {booking.scheduled_date}</span>
                                                <span className="tag"> <b>Parking Type</b> {booking.location_type}</span>
                                                <span className="tag"> <b>Instruction</b> {booking.instructions}</span>
                                            </div>
                                            <div className="second_half">
                                                <span>${booking.price}</span>
                                                <span>+{booking.preTip} pre-tip</span>
                                                <span className="colored">Total = ${booking.amount_charged}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
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
        </>
    )
}

export default Booking;
