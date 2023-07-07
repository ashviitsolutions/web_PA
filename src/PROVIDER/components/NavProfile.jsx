import React, { useEffect, useState } from "react";
import { Nav, NavDropdown, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IP } from "../../Constant";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useNavigate } from "react-router-dom";
import avtar from "./img/avtar.jpg"
const NavProfile = () => {
  const [toggle, setToggle] = useState(false)
  const nav = useNavigate()
  const [images, setImages] = useState(null);
  const [img, setImg] = useState('');
  const token = localStorage.getItem("providertoken")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${IP}/provider/profile`, {
          headers: {
            'Authorization': token
          }
        });
        const result = await response.json();
        setImages(result.profile_pic);
      } catch (err) {
        console.log(err);
      }
    };

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

    fetchData();
    if (images) {
      fetchImage();
    }
  }, [images, token, nav]);


  const handleToggle = () => {
    setToggle(!toggle)
  }



  return (
    <>
      <Nav>
        <NotificationsActiveIcon className="notification" onClick={handleToggle} />

        <NavDropdown
          // eventKey={1}
          title={
            <div className="pull-left" style={{ display: "inline-block" }}>
              <img
                className="thumbnail-image"
                src={img || avtar}
                alt="user pic"
                style={{ width: "45px", objectFit: 'cover', borderRadius: '50%', height: '45px' }}
              />
            </div>
          }
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item>
            <Link to="/providers/profile" className="nav-link">Profile</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/providers/personal-settings" className="nav-link">Personal Settings</Link>
          </NavDropdown.Item>

          <NavDropdown.Divider />
          <NavDropdown.Item>
            <Link to="/providers/logout" className="nav-link">Log Out</Link>
          </NavDropdown.Item>
        </NavDropdown>








      </Nav>

      {
        toggle ? (
          <Nav >
            <div className="notificationdestop">
              <NavDropdown.Item>
                <h3 className="nav-link">notification1</h3>
              </NavDropdown.Item>
              <NavDropdown.Item>

                <h3 className="nav-link">notification1</h3>
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item>

                <h3 className="nav-link">notification1</h3>
              </NavDropdown.Item>
            </div>

          </Nav>
        ) : null
      }

    </>
  );
};

export default NavProfile;
