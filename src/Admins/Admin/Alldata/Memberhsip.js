import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { IP } from '../../../Constant';
import { FallingLines } from "react-loader-spinner";
import { useLocation } from 'react-router-dom';


const PreviewImage = ({ attachments }) => {
  const [imageObjectURL, setImageObjectURL] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(`${IP}/file/${attachments}`);
      const imageBlob = await res.blob();
      const objectURL = URL.createObjectURL(imageBlob);
      setImageObjectURL(objectURL);
    };

    fetchImage();
  }, [attachments]);

  return (
    <div>
      {imageObjectURL && <img src={imageObjectURL} alt="Preview" className="previewimage" />}
    </div>
  );
};

function Memberhsip() {
  const location = useLocation();
  const startDates = location.state ? location.state.startDate : "";
  const endDates = location.state ? location.state.endDate : "";
  const [user, setUser] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(null);
  const [startDate, setStartDate] = useState(startDates); // Initialize with startDates
  const [endDate, setEndDate] = useState(endDates); // Initialize with endDates
  const [status, setStatus] = useState("");
  const [searchText, setSearchText] = useState("");



  useEffect(() => {
    setLoading(true);
    fetch(`${IP}/user/get-all-membership-details?page=${pageNumber}&limit=10`).then(resp => resp.json())
      .then(result => {
        console.log("result memberhsip",result)
        if (result && result.length > 0) {
          console.log("response format:", result);
          setUser(prevData => [...prevData, ...result]);
          setLoading(false);

        }
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setLoading(false);
      });
  }, [pageNumber]);


















  console.log("Users fetched:", user);




    // Handle date change
    useEffect(() => {
      // Update startDate and endDate when startDates or endDates change
      setStartDate(startDates);
      setEndDate(endDates);
  }, [startDates, endDates]);

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
          const isSearched = !searchText || (contractor.userName.toLowerCase().includes(searchText.toLowerCase()) || contractor.userEmail.toLowerCase().includes(searchText.toLowerCase()));
          return isWithinDateRange  && isSearched;
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
              <div className="headings float_wrapper">
                <div className="gutter pull-left">
                  <h3>All Gift Card</h3>
                  <p>list of all add posts</p>
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
                    <th>Plan</th> {/* membership picture and plan name */}
                    <th>Purchased by</th> {/* customer name, email and contact who purchased it */}
                    <th>Price</th> {/* price of memberhsip */}
                    <th>Date</th> {/* date of purchase */}
                  </tr>
                </thead>

                {memoizedUser.map((cur, index) => {

                  console.log("ma data define",cur)
                  return (
                    <tr key={index}>
                      <td>
                        <div className="card layer1">
                          <div className="inner">
                            <label htmlFor="" className="card_label"></label>
                            <div
                              className="preview"
                              style={{ width: "100%", height: "20vh", backgroundSize: "cover" }}
                            >
                              <PreviewImage className="PreviewImage" attachments={cur.attachments} />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="content">
                          <span className="title" id="headingtitle">
                            {cur.userName}
                          </span>
                          <span className="title" id="headingtitle">

                          </span>
                          <small>


                            <p className="description">{cur.userEmail}</p>
                          </small>
                        </div>
                      </td>
                      <td>
                        <div className="typefield">
                          <span style={{ display: "block" }}>{cur.category}</span>

                          <div className="content mt-3">
                            <span className="title" id="headingtitle">
                              <span id="pricevalue"> </span>
                              {cur.membershipType}
                            </span>
                          </div>

                        </div>
                      </td>
                    </tr>
                  );
                })}
              </table>
              {/* add grand total of price column */}
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

export default Memberhsip;
