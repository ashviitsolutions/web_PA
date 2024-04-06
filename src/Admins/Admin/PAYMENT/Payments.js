import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { IP } from '../../../Constant';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Details from "./Details"
import ReactPaginate from 'react-paginate';
import { FallingLines } from 'react-loader-spinner';
import "./Payment.css"
import { useNavigate } from 'react-router-dom';
import moment from "moment";







function Payments() {
  const navigate = useNavigate()

  const [count, setCount] = useState(0);
  const [data, setData] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [loading, setLoading] = useState(null);
  const [totalTip, setTotalTip] = useState(0);
  const [user, setUser] = useState([]);
  const [status, setStatus] = useState("");

  let token = localStorage.getItem("tokenadmin");




  console.log("user ", user)




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
    console.log("cur", cur); // Check the structure of cur
    navigate(`/admin/payments/details/${cur.provider_details._id}`, { state: { cur } });
  };






  useEffect(() => {
    setLoading(true);
    fetch(`${IP}/provider/services-by-provider?page=${pageNumber}&limit=10`, {
      headers: {
        'Authorization': token
      }
    })
      .then(resp => resp.json())
      .then(result => {
        if (result.msg) {
          // Handle the case where no providers are found
          console.log(result.msg);
        } else {
          setUser(prevData => {
            // Check for duplicates and concatenate only unique entries
            const newData = result.filter(newItem => !prevData.some(oldItem => oldItem._id === newItem._id));
            return [...prevData, ...newData];
          });
          setCount(result.length);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching data
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
        <div class="container-fluid">
          <div class="row">
            <div class="">
              <div class="headings">
                <h3>Statement of Providers</h3>
                <span class="toggle_sidebar" ></span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="gutter">
              <div class="card layer1 filters">
                <span class="highlight"> from </span>
                <div class="input_group">
                  <input type="date" class="input" placeholder="Start Date" onChange={e => setStartDate(e.target.value)} value={startDate} />
                  <span class="highlight"></span>
                </div>
                <span class="highlight"> to </span>
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



          <table className="payments-table">
            <thead>
              <tr>
                <th>Date/Time</th>
                <th>Provider</th>
                <th>Services count</th>
                <th>Services value</th>
                <th>Addon sales</th>

                <th>Addon Value</th>
                <th>Gratuity</th>
                <th>Total Charge</th>
                <th>Total commission</th>
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


                  {/* <td >
                    <div className="">
                      <p><span>{cur?.provider_details?.email}</span></p>
                      <p><span>{cur?.provider_details?.phone}</span></p>
                    </div>
                  </td> */}

                  <td>{cur.total_services}</td>
                  <td>{cur?.total_service_price?.toFixed(2)}$</td>
                  <td>{cur.total_add_ons}</td>
                  <td>{cur?.total_tip_amount?.toFixed(2)}$</td>
                  <td>{totalTip}$</td>
                  <td>{cur?.total_admin_amount?.toFixed(2)}$</td>


                  <td>{cur?.total_provider_amount?.toFixed(2)}$</td>



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
    </>
  )
}

export default Payments