import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import "./UserProfileStyle.css";
import axios from "../../../../axios";
import { IP } from "../../../../Constant";
import image from "../../../assets/img/fav.jpeg";
import { FallingLines } from "react-loader-spinner";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ReactPaginate from "react-paginate";

const Favorites = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("user_name");
  const user_id = localStorage.getItem("user_id");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    axios
      .get(`${IP}/user/getfavrate/${user_id}`, config)
      .then((response) => {

        if (response.status === 200) {
          const { data } = response.data;

          setFavorites(data);
          setCount(data.length);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [currentPage]);

  console.log("favorites", favorites)
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = favorites.slice(indexOfFirstItem, indexOfLastItem);
  console.log("favorites", favorites)



  return (
    <div className="container__view">
      <Avatar name={username} />
      <h3>Favorites</h3>
      {loading ? (
        <FallingLines
          color="#03a9f4"
          width="150"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      ) : currentItems.length === 0 ? (
        <>
          <img
            src={image}
            alt=""
            style={{
              borderRadius: "100%",
              width: 200,
              height: 200,
              marginBottom: 20,
            }}
          />
          <h4>You haven't marked any favorite providers</h4>
        </>
      ) : (
        currentItems.map((cur) => (
          <div className="favorite__item" key={cur._id}>
            <img
              src={`http://45.13.132.197:5000/api/file/${cur.images}`}
              alt=""
              className="favorite__itemImage"
            />
            <div className="">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h3>{cur.name}</h3>
                <span className="favorite__itemRating">
                  <StarRoundedIcon sx={{ color: "#03a9f4" }} />
                  <p>{cur.averageRating}</p>
                </span>
              </div>
              <p style={{ opacity: 0.7 }}>
                Provider name - {cur.first_name} {cur.last_name}
              </p>
              <p>
                {cur.mailing_address.address}, {cur.mailing_address.postal_code}
              </p>
            </div>
          </div>
        ))
      )}
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
  );
};

export default Favorites;
