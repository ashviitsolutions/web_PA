import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Row, Form } from "react-bootstrap";
import { IP } from "../../../Constant";
import { useNavigate } from 'react-router-dom';



const Editprofile = (props) => {
  const [images, setImages] = useState();
  const [profile_pic, setProfile_pic] = useState("")
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [img, setImg] = useState('');
  const token = localStorage.getItem("providertoken")
  const approvaltoken = localStorage.getItem("approvaluser")
  const nav = useNavigate()


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const bodyFormData = new FormData()

      bodyFormData.append('profile_pic', images)

      let resp = await fetch(`${IP}/provider/update-profile-picture`, {
        method: "PUT",
        headers: {
          Authorization: token
        },

        body: bodyFormData
      })

      if (resp.status === 200) {
        if (approvaltoken === "approval") {
          nav("/providers");
        } else {
          nav("/providers/waiting");
        }
      }

    } catch (error) {
      console.error(error);

    }
  }


  useEffect(() => {
    handleSubmit()
  }, [])




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${IP}/provider/profile`, {
          headers: {
            'Authorization': token
          }
        });
        const result = await response.json();
        setProfile_pic(result.profile_pic);
        console.log("profile data provider", result)
      } catch (err) {
        console.log(err);
      }
    };

    const fetchImage = async () => {
      try {
        const res = await fetch(`${IP}/file/${profile_pic}`);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    if (profile_pic) {
      fetchImage();
    }
  }, [profile_pic, token, nav]);


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton >
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Profile
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row className="mb-2">
            <div className="col-md-4 mb-2 text-center">
              <div className="img-box shadow">
                <FontAwesomeIcon className="edit profile-edit" />

                <img
                  src={img}
                  // src="https://profile_pic.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                  alt=""
                  style={{
                    width: "100%",
                    borderRadius: "50%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>

            <div className="col-md-8">
              <div className="personal-box box shadow-sm">
                <Form.Group>
                  <Form.Label>Choose an image:</Form.Label>
                  <Form.Control
                    name="profile_pic"
                    type="file"
                    onChange={(e) => {
                      let reader = new FileReader();
                      let file = e.target.files[0];

                      reader.onloadend = () => {
                        setImagePreviewUrl(reader.result);
                      };

                      reader.readAsDataURL(file);
                      setImages(file);

                    }}
                  />
                  {imagePreviewUrl && (
                    <img src={imagePreviewUrl} alt="Preview" style={{
                      width: "100%",
                      borderRadius: "7px",

                    }} />
                  )}
                </Form.Group>

              </div>
            </div>
          </Row>

        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button variant="primary" type="submit" >
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Editprofile;
