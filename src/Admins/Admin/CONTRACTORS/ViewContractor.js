import React, { useState, useEffect } from 'react';
import { IP } from '../../../Constant';
import avtar from "../../img/avtar.jpg";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Button, Card } from "react-bootstrap";
import axios from 'axios';
import Verification from './Verification';
import { useLocation } from 'react-router-dom';



const PreviewImage = ({ attachments }) => {
  const [imageObjectURL, setImageObjectURL] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(`${IP}/file/${attachments}`);
      const imageBlob = await res.blob();
      const objectURL = URL.createObjectURL(imageBlob);
      setImageObjectURL(objectURL);
      console.log("image", res);
    };

    fetchImage();
  }, [attachments]);

  return (
    <div>
      {imageObjectURL && (
        <img
          src={imageObjectURL || avtar}
          alt="No Image uploaded"
          className="previewimage"
          style={{
            borderRadius: "100%",
            height: "80px",
            width: "80px",
          }}
        />
      )}
    </div>
  );
};




const OfficeImage = ({ attachments }) => {
  const [imageObjectURL, setImageObjectURL] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(`${IP}/file/${attachments}`);
      const imageBlob = await res.blob();
      const objectURL = URL.createObjectURL(imageBlob);
      setImageObjectURL(objectURL);
      console.log("image", res);
    };

    fetchImage();
  }, [attachments]);

  return (
    <div>
      {imageObjectURL && (
        <img
          src={imageObjectURL || avtar}
          alt="No Image uploaded"
          className="previewimage"
          style={{
            borderRadius: "100%",
            height: "80px",
            width: "80px",
          }}
        />
      )}
    </div>
  );
};







function ViewContractor() {
  const location = useLocation();
  const application_status_text = location.state ? location.state.application_status_text : "";
  const startDate = localStorage.getItem("startDate")
  const endDate = localStorage.getItem("endDate")
  const [userschedule, setuserSchedule] = useState({});
  const [user, setUser] = useState({});
  const [toggle, setToggle] = useState(false);
  const tokenadmin = localStorage.getItem("tokenadmin");
  const params = useParams();
  const nav = useNavigate();

  console.log("params id", params.id)


  useEffect(() => {
    // Fetch user data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(`${IP}/contractor/get/${params.id}`, {
          headers: {
            Authorization: tokenadmin
          }
        });

        if (response.ok) {
          const result = await response.json();
          console.log("result", result)
          setUser(result);

        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [params.id, tokenadmin]);

  console.log("admin provider ", user)

  // Fetch images and set them as base64 data URLs




  const acceptApi = async (e) => {
    e.preventDefault();

    try {
      const bodyFormData = new FormData();
      bodyFormData.append("response", "approved");
      bodyFormData.append("id", user._id);

      const response = await axios.put(`${IP}/contractor/update-status`, bodyFormData, {
        headers: {
          Authorization: tokenadmin,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        nav("/admin/contractors");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handlePrint = () => {
    let printContents = document.getElementById("card-right").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const handleCardClient = (event_status) => {
    nav(`/admin/${event_status}`, { state: { name: `${user?._id}`, startDate, endDate } });
  };


  return (
    <>
      <div id="content">
        <div className="container-fluid">
          <div className="row">
            <div className="">
              <div className="headings float_wrapper">
                <div className="gutter pull-left" style={{ paddingLeft: "0" }}>
                  <h3><span className='cursor title backarrow' onClick={() => nav(-1)}>&larr;</span> View Contractor</h3>
                </div>
                <span className="toggle_sidebar" ></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="gutter">
                <div id="about_user_card" className="card layer2">
                  <div className="avatar_wrap">
                    <PreviewImage className="avatar" attachments={user.profile_pic} />
                    <span className="name">{`${user?.first_name} ${user?.last_name}`}</span>
                  </div>
                  <h3 className="inner_title">Contact Info</h3>
                  <ul className="true">
                    <li><b>phone:</b> {user?.phone}</li>
                    <li><b>email:</b> {user?.email}</li>
                    <li><b>working city:</b> {user?.mailing_address?.city}</li>
                    <li><b>Application Status:</b> {application_status_text}</li>
                  </ul>

                  <h3 className="inner_title"></h3>

                  <div className="d-flex">
                    <div className='link title' onClick={handleToggle} style={{ fontSize: "13px" }} >
                      <RemoveRedEyeIcon style={{ width: "17px", marginRight: "3px" }} />
                      View Contractor Data
                    </div>

                    &nbsp; &nbsp; &nbsp;

                    <div className='link title' onClick={() => handleCardClient('provider-all-services')} style={{ fontSize: "13px" }} >
                      <RemoveRedEyeIcon style={{ width: "17px", marginRight: "3px" }} />
                      View Service History
                    </div>

                  </div>



                </div>

                {
                  user?.application_status === 1 ? (
                    <Card className="mb-2">
                      <h3>Call Interview Status</h3>

                      <Card.Footer>
                        <button className="mx-2 btn-sm btn btn-primary" onClick={acceptApi}>Accept</button>

                        <Button className="nofillbtn btn-sm" >
                          Reject
                        </Button>
                      </Card.Footer>
                    </Card>
                  ) : null
                }



                {
                  user?.application_status === 2 ? (
                    <Verification _id={user?._id} application_status={user?.application_status} />

                  ) : null
                }




                {
                  user?.application_status === 0 ? (
                    <div id="statusinfo" style={{ width: "20px", height: "20px", borderRadius: "100%", backgroundColor: "#ffc107" }}>
                      <p style={{ fontSize: "8px", paddingTop: "19px" }}>Pending</p>
                    </div>
                  ) : null
                }

                {
                  user?.application_status === 1 ? (
                    <div id="statusinfo" style={{ width: "20px", height: "20px", borderRadius: "100%", backgroundColor: "#ffc107", marginTop: "-110px" }}>
                      <p style={{ fontSize: "8px", paddingTop: "19px" }}>Pending</p>
                    </div>
                  ) : null
                }

                {
                  user?.application_status >= 3 ? (
                    <div id="statusinfo" style={{ backgroundColor: "#00fa86", width: "20px", height: "20px", borderRadius: "100%" }}>
                      <p style={{ fontSize: "8px", paddingTop: "19px" }}>Active</p>
                    </div>
                  ) : null
                }

                {
                  user?.application_status === "rejected" ? (
                    <div id="statusinfo" style={{ backgroundColor: "#ff3b3b", width: "20px", height: "20px", borderRadius: "100%" }}>
                      <p style={{ fontSize: "8px" }}>Rejected</p>
                    </div>
                  ) : null
                }
              </div>

            </div>





            {
              toggle ? (
                <>
                  <div className=" col-sm-6 card-right" id="card-right">
                    <div className="gutter">
                      <div id="about_user_card" className="card layer2">


                        <ul className="true">
                          <li><b>Name:</b> {`${user?.first_name} ${user.last_name}`}</li>
                          <li><b>Email:</b> {user?.email}</li>
                          <li><b>Phone:</b> {user?.phone}</li>
                          <li><b>DOB:</b> {user?.DOB}</li>
                          <li><b>Gender:</b>{user?.gender}</li>
                          <li><b>Working shift:</b>{user?.working_shift}</li>
                          <li><b>Start date:</b>{user?.start_date}</li>
                          <li><b>SSN:</b>{user?.ssn}</li>
                          <li><b>Previous employee:</b>{user?.previous_employee}</li>
                          <li><b>Application status_text:</b>{application_status_text}</li>
                          <li><b>Address:</b>{user?.mailing_address?.address}</li>
                          <li><b>Apt number:</b> {user?.mailing_address?.apt_number}</li>

                          <li><b>City:</b>{user?.mailing_address?.city}</li>
                          <li><b>Country:</b> {user?.mailing_address?.country}</li>
                          <li><b>State:</b>{user?.mailing_address?.state}</li>
                          <li><b>Postal code:</b>{user?.mailing_address?.postal_code}</li>

                          <li><b>On demand:</b>{user?.areas_of_expertise?.on_demand}</li>
                          <li><b>Private events:</b>{user?.areas_of_expertise?.private_events}</li>
                          <li><b>Corporate events:</b>{user?.areas_of_expertise?.corporate_events}</li>
                          <li><b>Working information:</b></li>
                          {user?.working_information?.map((schedule, index) => (
                            <div className="d-flex" key={index}>
                              <li><p>{schedule.day} Start time: {schedule.start_time}</p></li>
                              <li><p>{schedule.day} End time: {schedule.end_time}</p></li>
                            </div>
                          ))}


                          <li><b>Download documents:-</b></li>
                          <a href="" target="_blank" rel="noreferrer">
                            <li>
                              <b>1. Driving License:</b>
                            </li>
                          </a>


                          <a href="" target="_blank" rel="noreferrer">
                            <li>
                              <b>2.Insurance:</b>
                            </li>
                          </a>


                          <a href="" target="_blank" rel="noreferrer">
                            <li>
                              <b>3.License:</b>
                            </li>
                          </a>



                        </ul>

                        <h3 className="inner_title mt-3" style={{ fontSize: "15px" }}> Office Image</h3>
                        <div className="avatar_wrap mt-0">
                          <div >
                            <OfficeImage className="avatar" attachments={user.images} />
                          </div>
                        </div>
                        <h3 className="inner_title"></h3>

                      </div>
                    </div>

                  </div>
                  <Button className="mx-2 btn-sm btn btn-primary" onClick={handlePrint} style={{ width: "10%" }}>
                    Print
                  </Button>
                </>


















              ) : null
            }

          </div>

        </div>
      </div>

    </>
  )
}

export default ViewContractor