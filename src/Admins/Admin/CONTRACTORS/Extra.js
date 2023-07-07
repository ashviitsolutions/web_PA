import React, { useState, useEffect } from 'react'
import { IP } from '../../../Constant'
import avtar from "../../img/avtar.jpg"
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Badge, Button, Card, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Verification from './Verification';

function ViewContractor() {
  const [toggle, setToggle] = useState(false)
  let tokenadmin = localStorage.getItem("tokenadmin");
  const [user, setUser] = useState([]);
  let params = useParams();
  let { id } = params;
  const nav = useNavigate()
  const [images, setImages] = useState(null);
  const [images1, setImages1] = useState(null);
  const [img, setImg] = useState('');
  const [img1, setImg1] = useState('');
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
      setImages(result.profile_pic);
      setImages1(result.images)
      console.log("contractorvieprofile", result)
    }).catch(err => {
      console.log(err)
    })

  }, [user])





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
  
      fetchImage1();
      if (images1) {
        fetchImage1();
      }
    }
  }, [images, token, nav]);






















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
        nav("/admin");
      }

    } catch (error) {
      console.error(error);
    }
  };











  const handleToggle = () => {
    setToggle(!toggle)
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
                  <div onClick={handleToggle}>
                    <RemoveRedEyeIcon />
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








              </div>
            </div>

















            {
              toggle ? (

                <div className="col-sm-6">
                  <div className="card layer1 padded">
                    <h3 className="inner_title">Profile Details</h3>
                    <table className="table">

                      <tbody>
                        <tr>
                          <td>
                            <span className="name">DOB: {user.DOB}</span>
                          </td>

                        </tr>
                        <tr>
                          <span className="name">Gender: {user.gender}</span>
                        </tr>


                          <tr>
                            <span className="name">address:{user?.mailing_address?.address}</span>
                          </tr>
                          <tr>
                            <span className="name">apt_number: {user?.mailing_address?.apt_number}</span>
                          </tr>

                          <tr>
                            <span className="name">city: {user?.mailing_address?.city}</span>
                          </tr>

                          <tr>
                            <span className="name">country: {user?.mailing_address?.country}</span>
                          </tr>
                          <tr>
                            <span className="name">state: {user?.mailing_address?.state}</span>
                          </tr>

                          <tr>
                            <span className="name">postal_code: {user?.mailing_address?.postal_code}</span>
                          </tr>






                        <tr>
                          <td><span className="name">call_status:{user.call_status}</span></td>

                        </tr>
                      </tbody>
                    </table>
                  </div>
                 <img src={img1} style={{width:"100%" , height:"40%"}} />

                </div>
              ) : null
            }

          </div>

        </div>
      </div>

    </>
  )
}

export default ViewContractor