import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import "./UserProfileStyle.css";
import axios from "axios";
import { IP } from "../../../../Constant";
import { FallingLines } from "react-loader-spinner";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice';

const Notifications = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.counter.formData);
  const notifications = Array.isArray(selector?.notificationdata) && selector.notificationdata.length > 0 ? selector.notificationdata[0] : [];
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("user_name");
  const user_id = localStorage.getItem("userid");
  const [loading, setLoading] = useState(false);
  // const [notifications, setNotifications] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const notificationsPerPage = 3; // Number of notifications to show per page

  useEffect(() => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    axios
      .get(`${IP}/get-all-notifications/${user_id}`, config)
      .then((res) => {
        console.log(res.data);
        // setNotifications(res.data);
        dispatch(updateInputData({ formName: 'notificationdata', inputData: res.data }));
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
    <div className="booking-modal-container">
      <div id="booking-card-content">
        <h1>Notifications</h1>



        <div className="booking-modal-inner">

          {loading ? (
            <div style={{ textAlign: "center" }}>
              <FallingLines
                color="#03a9f4"
                width="150"
                visible={true}
                ariaLabel="falling-circles-loading"
              />
            </div>
          ) : displayedNotifications.length > 0 ? (
            displayedNotifications.map((n) => (
              <div className="notification__item" key={n._id}>
                <Link to={n.link}>
                  <div className="notification__titleView">
                    <h3>{n.title}</h3>
                    <h4 className="">Date: {moment(n.createdAt).format("MMMM Do YYYY")}, Time: {moment(n.createdAt).format("LT")}</h4>
                  </div>
                  <p>{n.content}</p>
                  {n.bookedDate && n.bookedTime && (
                    <>
                      <div className="d-flex smallDetail" style={{ justifyContent: "space-between" }}>
                        <p>appointment date: {moment(n.bookedDate).format("MMMM Do YYYY")}</p>
                        <p>appointment time: {moment(n.bookedTime, "HH:mm:ss").format("LT")}</p>

                      </div>

                    </>
                  )}
                </Link>
              </div>

            ))
          ) : (
            <>
              <div id="booking-card-content">
                <h3>No New Notifications</h3>
              </div>
            </>

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
    </div>

  );
};

export default Notifications;
