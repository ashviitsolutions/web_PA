import React, { useEffect, useState } from "react";
import Avatar from "../../Components/Pages/Profile/userProfile/Avatar";
import axios from "axios";
import { IP } from "../../Constant";
import { FallingLines } from "react-loader-spinner";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const Notification = () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user_name");
    const user_id = localStorage.getItem("provider_id");
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const notificationsPerPage = 5; // Number of notifications to show per page

    useEffect(() => {
        setLoading(true);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        };
        axios
            .get(`${IP}/get-allprovider-notifications`, config)
            .then((res) => {
                console.log("provider notification", res.data);
                setNotifications(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const pagesVisited = pageNumber * notificationsPerPage;
    const displayedNotifications = notifications.slice(
        pagesVisited,
        pagesVisited + notificationsPerPage
    );

    const pageCount = Math.ceil(notifications.length / notificationsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };



    return (
        <div className="schudulecard profileSpace">
            {/* <Avatar name={username} /> */}
            <h3><center>Notifications</center></h3>
            <div className="notification__view">
                {loading ? (
                    <FallingLines
                        color="#03a9f4"
                        width="150"
                        visible={true}
                        ariaLabel="falling-circles-loading"
                    />
                ) : displayedNotifications.length > 0 ? (
                    displayedNotifications.map((n) => (
                        <div className="notification__item" key={n._id}>
                            <Link to={n.link}>
                                <div className="notification__titleView">
                                    <h3>{n.title}</h3>
                                    <h4>{moment(n.createdAt).format("MMMM Do YYYY, LT")}</h4>
                                </div>
                                <p>{n.content}</p>
                                {n.bookedDate && n.bookedTime && (
                                    <>
                                        <div className="d-flex" style={{ justifyContent: "space-between" }}>
                                            <p>Booked Date: {n.bookedTime}</p>
                                            <p>Booked Time: {n.bookedDate}</p>
                                        </div>

                                    </>
                                )}

                            </Link>

                        </div>
                    ))
                ) : (
                    <h2>No New Notifications</h2>
                )}
            </div>
            <div className="pagination">
                <ReactPaginate
                    pageCount={pageCount}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={3}
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    onPageChange={changePage}
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
    );
};

export default Notification;
