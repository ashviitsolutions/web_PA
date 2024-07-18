import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { IP } from '../../../Constant';
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import { useLocation } from 'react-router-dom';






function Providerservices() {
  let providerID = localStorage.getItem("providerID");
  const navigate = useNavigate()
  const location = useLocation();
  const apidata = location.state ? location.state.name : "";
  const storedStartDate = localStorage.getItem("startDate");
  const storedEndDate = localStorage.getItem("endDate");
  const [startDate, setStartDate] = useState(storedStartDate);
  const [endDate, setEndDate] = useState(storedEndDate);
  const [selectedUserId, setSelectedUserId] = useState(apidata || providerID);


  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(null);
  const [totalTip, setTotalTip] = useState(0);
  const [user, setUser] = useState([]);
  const [providerlist, setProviderlist] = useState([]);


  let token = localStorage.getItem("tokenadmin");





  console.log("providerlist ", providerlist)


  useEffect(() => {
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
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

    console.log("cur", cur); // Check the structure of cur
    navigate(`/admin/provider-service-details/${cur.provider_details._id}`, { state: { cur, startDate, endDate } });
    localStorage.setItem("providerID", `${cur.provider_details._id}`)
  };





  useEffect(() => {
    setLoading(true);
    fetch(`${IP}/provider/all-services-by-provider?page=${pageNumber}&limit=10`, {
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
          setProviderlist(prevData => {
            // Check for duplicates and concatenate only unique entries
            const newData = result.filter(newItem => !prevData.some(oldItem => oldItem._id === newItem._id));
            return [...prevData, ...newData];
          });

        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching data
      });
  }, [pageNumber]);




  useEffect(() => {
    setLoading(true);

    console.log("selectedUserId in useEffect", selectedUserId)

    fetch(`${IP}/provider/services-by-provider-details?providerId=${selectedUserId}`, {
      headers: {
        'Authorization': token
      }
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        return resp.json();
      })
      .then(result => {
        if (Array.isArray(result)) {
          setUser(result); // Assuming result is already an array of items
        } else {
          // Handle cases where result is not an array (maybe extract data from result)
          setUser(result.data); // Adjust this based on your actual API response structure
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        // Handle fetch errors here
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedUserId]);





  console.log("user data", user)











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
    console.log("startDate:", startDate);
    console.log("endDate:", endDate);

    // Ensure user is an array before filtering
    if (!Array.isArray(user)) {
      return []; // Return empty array or handle differently based on your logic
    }

    const filteredData = user.filter(event => {
      // Extracting the date from the first service's createdAt
      const eventDate = moment(event.services[0].createdAt, 'YYYY-MM-DD');

      // Checking if the eventDate is within the specified date range
      const isWithinDateRange = (!startDate || moment(startDate).isSameOrBefore(eventDate, 'day')) &&
        (!endDate || moment(endDate).isSameOrAfter(eventDate, 'day'));

      // Constructing the full name for searching
      const fullName = `${event.provider_details.first_name ?? ''} ${event.provider_details.last_name ?? ''}`.toLowerCase();

      // Checking if the fullName includes the searchText (case insensitive)
      const isNameSearched = !searchText || fullName.includes(searchText.toLowerCase());

      // Checking if the email includes the searchText (case insensitive)
      const isEmailSearched = !searchText || event.provider_details.email.toLowerCase().includes(searchText.toLowerCase());

      // Checking if the phone includes the searchText (case insensitive)
      const isPhoneSearched = !searchText || event.provider_details.phone.includes(searchText);

      // Combine all conditions for filtering
      return isWithinDateRange && (isNameSearched || isEmailSearched || isPhoneSearched);
    });

    return filteredData;
  };



  const memoizedUser = handleFilter();

  const handleUserClick = (userId) => {

    setSelectedUserId(userId.provider_details._id);
    setSearchText("")
  };

  console.log("memoizedUser", memoizedUser)


  return (
    <>
      <div id="content">
        <div class="container-fluid">
          <div class="row">
            <div class="">
              <div class="headings">
                <h3><span className='link title backarrow' onClick={() => navigate(-1)}>&larr;</span> Statement of Providers</h3>
                <div className="gutter pull-right">
                  <small className='sub'>
                    <p>* Click on the provider name to view service wise data</p>
                  </small>
                </div>
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



          {/* User List */}
          {searchText && (
            <div className="col-sm-4 pull-right searchResult" id="">
              <div className="gutter">
                <div id="about_user_card" className=" layer2">
                  <h3 className="inner_title">providers List</h3>
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    providerlist.length > 0 ? (
                      providerlist.map(user => (
                        <div className='card gutter mt-2 link'>
                          <small key={user._id} onClick={() => handleUserClick(user)}>
                            <p><b>Name:</b> {`${user?.provider_details?.first_name} ${user?.provider_details?.last_name}`}</p>
                            <p><b>Email:</b> {user?.provider_details?.email}</p>
                            <p><b>Mobile:</b> {user?.provider_details?.phone}</p>
                          </small>
                        </div>
                      ))
                    ) : (
                      <p>No providers found.</p>
                    )
                  )}
                </div>
              </div>
            </div>
          )}













          {
            memoizedUser.length > 0 ? (
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

                        <p className='sub'><span>{cur?.provider_details?.email}</span></p>
                        <p className='sub'><span>{cur?.provider_details?.phone}</span></p>
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
                      <td>{cur?.total_add_ons?.toFixed(2)}$</td>
                      <td>{cur?.total_tip_amount.toFixed(2)}$</td>
                      <td>{cur?.total_admin_amount?.toFixed(2)}$</td>


                      <td>{cur?.total_provider_amount?.toFixed(2)}$</td>



                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No data found please select the provider</p>
            )
          }


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

      </div >
    </>
  )
}

export default Providerservices