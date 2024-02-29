import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import Contacts from "../components/profile/Contacts";
import MyEditProfileModal from "../components/profile/MyEditProfileModal";
import Skills from "../components/profile/Skills";
import Socials from "../components/profile/Socials";
import { IP } from "../../Constant"


const Profile = () => {
  const [images, setImages] = useState([])
  const [img, setImg] = useState('');
  const [modalShow, setModalShow] = React.useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState([])


  const [user, setUser] = useState({
    name: "John Doe",
    // skills: ["Therapeutic Massage", "Sports Massage", "Swedish Massage"],
    mobile: "9876543210",
    email: "demo@demo.com",
  });

  const token = localStorage.getItem('providertoken')
  useEffect(() => {
    fetch(`${IP}/provider/profile`, {
      headers: {
        'Authorization': token
      }
    }).then(resp => {
      return resp.json()
    }).then(result => {
      console.log("profile Data", result)
      setName(result.first_name + " " + result.last_name)
      setEmail(result.email)
      setPhone(result.phone)
      setSkills(result.areas_of_expertise.on_demand)
      setImages(result.profile_pic)
      console.log("profile value", result.profile_pic)




    }).catch(err => {
      console.log(err)
    })
  }, [])

  console.log('skills', skills)
  function handleSave(user) {
    console.log('Handel Save' + user);

    setUser((prevState) => ({
      ...prevState,
      name: user.upname,
      description: user.updescription,
      mobile: user.upmobile,
      email: user.upemail,
    }));
    setModalShow(false);
  }




  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(`${IP}/file/${images}`);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImg(imageObjectURL);
    };
    fetchImage();
  }, [images]);



  console.log("email value", email)






  return (
    <Container>
      <Row className="mt-4 mb-2" style={{ alignItems: "start" }}>
        <h2 className="text-center mt-2">Profile</h2>
        <hr className="hr" />

        <div className="col-md-4">
          <img
            className="profile_description shadow-sm"
            style={{
              width: "100%",
              borderRadius: "8px",
              height: "250px",
              objectFit: "cover",
            }}
            src={img}

            alt="" />
        </div>
        <div className="col-md-8">
          <h4 className="profile_description   mb-4"> {name} </h4>
          <Row>
            <div className="col-md-12">
              <Contacts mobile={phone} email={email} />
             {/* <Skills skills={{ skill: skills }} /> */}
             
            </div>
           
          </Row>
        </div>
      </Row>
     
     
      <hr className="hr" />
      <div className="text-center">
        <Button onClick={() => setModalShow(true)}>Update</Button>
      </div>
      <hr className="hr" />
      <MyEditProfileModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleSave={handleSave}
        user={user}
      />
    </Container>
  );
};

export default Profile;
