import React, { useState, useEffect } from 'react'
import { IP } from '../../../Constant'
import avtar from "../../img/avtar.jpg"
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {Button, Card } from "react-bootstrap";
// import { Link } from 'react-router-dom';
import axios from 'axios';
import Verification from './Verification';
function ViewContractor() {
  const [schedule, setSchedule] = useState({});

  const [toggle, setToggle] = useState(false)
  let tokenadmin = localStorage.getItem("tokenadmin");
  const [user, setUser] = useState([]);
  let params = useParams();
  let { id } = params;
  const nav = useNavigate()
  const [images, setImages] = useState(null);
  const [images1, setImages1] = useState(null);
  const [images2, setImages2] = useState(null);

  const [images3, setImages3] = useState(null);
  const [images4, setImages4] = useState(null);

  const [img, setImg] = useState('');
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [img4, setImg4] = useState('');
  const token = localStorage.getItem("providertoken")

  //get api



  useEffect(() => {
    fetch(`${IP}/contractor/get/${id}`, {
      headers: {
        'Authorization': tokenadmin
      }
    }).then(resp => {
      return resp.json()
    }).then(result => {
      setUser(result);
      // setDate(result.DOB)
      setImages(result.profile_pic);
      setImages1(result.images)
      setImages2(result?.documents?.drivinglicense)
      setImages3(result?.documents?.insurance)
      setImages4(result?.documents?.license)
      setSchedule(result.working_information)
      console.log("contractorvieprofile", result)
    }).catch(err => {
      console.log(err)
    })

  }, [id,tokenadmin])





  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(`http://45.13.132.197:4000/api/file/${images}`);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
      } catch (err) {
        console.log(err);
      }
    };

    fetchImage();
    if (images) {
      fetchImage();

      const fetchImage1 = async () => {
        try {
          const res = await fetch(`http://45.13.132.197:4000/api/file/${images1}`);
          const imageBlob = await res.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImg1(imageObjectURL);
        } catch (err) {
          console.log(err);
        }
      };




      const fetchImage2 = async () => {
        try {
          const token = localStorage.getItem("providertoken")
          const res = await fetch(`http://45.13.132.197:4000/contractor/view/${images2}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const imageBlob = await res.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImg2(imageObjectURL);
        } catch (err) {
          console.log(err);
        }
      };
      fetchImage();











      const fetchImage3 = async () => {
        try {
          const token = localStorage.getItem("providertoken")
          const res = await fetch(`http://45.13.132.197:4000/contractor/view/${images3}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const imageBlob = await res.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImg3(imageObjectURL);
        } catch (err) {
          console.log(err);
        }
      };

      const fetchImage4 = async () => {
        try {
          const token = localStorage.getItem("providertoken")
          const res = await fetch(`http://45.13.132.197:4000/contractor/view/${images4}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const imageBlob = await res.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImg4(imageObjectURL);
        } catch (err) {
          console.log(err);
        }
      };

      fetchImage1();
      fetchImage2();
      fetchImage3();
      fetchImage4();
      if (images1) {
        fetchImage1();
      }
    }
  }, [images, token, nav, images2, images1,images3,images4]);


  const acceptApi = async (e) => {
    e.preventDefault()

    try {

      const bodyFormData = new FormData();
      bodyFormData.append("response", "approved");
      bodyFormData.append("id", user._id);
      const res = await axios.put(`${IP}/contractor/update-status`, bodyFormData, {
        headers: {
          'Authorization': tokenadmin,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },

      });
      console.log(res);
      if (res.status === 200) {
        nav("/admin/contractors");
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = () => {
    setToggle(!toggle)
  }


  const handlePrint = () => {
    let printContents = document.getElementById("card-right").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }



  return (
    <>
      <div id="content">
        <div className="container-fluid">
          <div className="row">
            <div className="">
              <div className="headings float_wrapper">
                <div className="gutter pull-left" style={{ paddingLeft: "0" }}>
                  <h3>View Contractor</h3>
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
                    <div className="avatar" style={{ backgroundImage: `url(${img || avtar})` }}>
                    </div>
                    <span className="name">{`${user.first_name} ${user.last_name}`}</span>
                  </div>
                  <h3 className="inner_title">Contact Info</h3>
                  <ul className="true">
                    <li><b>phone:</b> {user.phone}</li>
                    <li><b>email:</b> {user.email}</li>
                    <li><b>working city:</b> {user?.mailing_address?.city}</li>
                    <li><b>Application Status:</b> {user.application_status_text}</li>
                  </ul>

                  <h3 className="inner_title"></h3>
                  <div onClick={handleToggle} style={{ fontSize: "13px" }} >
                    <RemoveRedEyeIcon style={{ width: "17px", marginRight: "3px" }} />
                    View Details
                  </div>

                </div>

                {
                  user.application_status === 1 ? (
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
                  user.application_status === 2 ? (
                    <Verification _id={user._id} application_status={user.application_status} />

                  ) : null
                }




                {
                  user.application_status === 0 ? (
                    <div id="statusinfo" style={{ width: "20px", height: "20px", borderRadius: "100%", backgroundColor: "#ffc107" }}>
                      <p style={{ fontSize: "8px", paddingTop: "19px" }}>Pending</p>
                    </div>
                  ) : null
                }

                {
                  user.application_status === 1 ? (
                    <div id="statusinfo" style={{ width: "20px", height: "20px", borderRadius: "100%", backgroundColor: "#ffc107", marginTop: "-110px" }}>
                      <p style={{ fontSize: "8px", paddingTop: "19px" }}>Pending</p>
                    </div>
                  ) : null
                }

                {
                  user.application_status >= 3 ? (
                    <div id="statusinfo" style={{ backgroundColor: "#00fa86", width: "20px", height: "20px", borderRadius: "100%" }}>
                      <p style={{ fontSize: "8px", paddingTop: "19px" }}>Active</p>
                    </div>
                  ) : null
                }

                {
                  user.application_status === "rejected" ? (
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
                          <li><b>Name:</b> {`${user.first_name} ${user.last_name}`}</li>
                          <li><b>Email:</b> {user.email}</li>
                          <li><b>Phone:</b> {user.phone}</li>
                          <li><b>DOB:</b> {user.DOB}</li>
                          <li><b>Gender:</b>{user.gender}</li>
                          <li><b>Working shift:</b>{user.working_shift}</li>
                          <li><b>Start date:</b>{user.start_date}</li>
                          <li><b>SSN:</b>{user.ssn}</li>
                          <li><b>Previous employee:</b>{user.previous_employee}</li>
                          <li><b>Application status_text:</b>{user.application_status_text}</li>
                          <li><b>Address:</b>{user?.mailing_address?.address}</li>
                          <li><b>Apt number:</b> {user?.mailing_address?.apt_number}</li>

                          <li><b>Vity:</b>{user?.mailing_address?.city}</li>
                          <li><b>Country:</b> {user?.mailing_address?.country}</li>
                          <li><b>State:</b>{user?.mailing_address?.state}</li>
                          <li><b>Postal code:</b>{user?.mailing_address?.postal_code}</li>

                          <li><b>On demand:</b>{user?.areas_of_expertise?.on_demand}</li>
                          <li><b>Private events:</b>{user?.areas_of_expertise?.private_events}</li>
                          <li><b>Working information:</b></li>
                          <div className="d-flex">
                            <li><p>Monday start time: {schedule.Mon_Start_time}</p></li>
                            <li><p>Monday End time: {schedule.Mon_End_time}</p></li>
                          </div>
                          <div className="d-flex">
                            <li><p>Tuesday start time: {schedule.Tue_Start_time}</p></li>
                            <li><p>Tuesday End time: {schedule.Tue_End_time}</p></li>
                          </div>
                          <div className="d-flex">
                            <li><p>Wednesday start time: {schedule.Wed_Start_time}</p></li>
                            <li><p>Wednesday End time: {schedule.Wed_End_time}</p></li>
                          </div>
                          <div className="d-flex">
                            <li><p>Thursday start time: {schedule.Thu_Start_time}</p></li>
                            <li><p>Thursday End time: {schedule.Thu_End_time}</p></li>
                          </div>
                          <div className="d-flex">
                            <li><p>Friday start time: {schedule.Fri_Start_time}</p></li>
                            <li><p>Friday End time: {schedule.Fri_End_time}</p></li>
                          </div>

                          <div className="d-flex">
                            <li><p>Saturday start time: {schedule.Sat_Start_time}</p></li>
                            <li><p>Saturday End time: {schedule.Sat_End_time}</p></li>
                          </div>
                          <div className="d-flex">
                            <li><p>Sunday start time: {schedule.Sun_Start_time}</p></li>
                            <li><p>Sunday End time: {schedule.Sun_End_time}</p></li>
                          </div>


                          <li><b>Download documents:-</b></li>
                          <a href={img2} target="_blank" rel="noreferrer">
                            <li>
                              <b>1. Driving License:</b>
                            </li>
                          </a>


                          <a href={img3} target="_blank" rel="noreferrer">
                            <li>
                              <b>2.Insurance:</b>
                            </li>
                          </a>


                          <a href={img4} target="_blank" rel="noreferrer">
                            <li>
                              <b>3.License:</b>
                            </li>
                          </a>



                        </ul>

                        <h3 className="inner_title mt-3" style={{ fontSize: "15px" }}> Office Image</h3>
                        <div className="avatar_wrap mt-0">
                          <div className="avatar mt-0" id="office" style={{ backgroundImage: `url(${img1 || avtar})` }}>
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