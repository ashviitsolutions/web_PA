import React, { useState, useEffect } from "react";
import { Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IP } from "../../../Constant";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProfileEdit = (props) => {
  const formData = useSelector((state) => state?.counter?.formData);
  const user = formData.provider_profile && formData.provider_profile[0] ? formData.provider_profile[0] : "";
  const profileimage = formData.provider_profile_pic && formData.provider_profile_pic[0] ? formData.provider_profile_pic[0] : "";

  const [service, setService] = useState({
    corporate_events: [],
    on_demand: [],
    private_events: []
  });

  const [selectedCorporateEvents, setSelectedCorporateEvents] = useState(user.corporate_events || []);
  const [selectedOnDemand, setSelectedOnDemand] = useState(user.on_demand || []);
  const [selectedPrivateEvents, setSelectedPrivateEvents] = useState(user.private_events || []);

  console.log("profile edit data", user);

  const [name, setName] = useState(`${user.first_name || ''} ${user.last_name || ''}`);
  const [mobile, setMobile] = useState(user.phone || '');
  const [email, setEmail] = useState(user.email || '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${IP}/contractor/get/${user.id}`);

        if (response.ok) {
          const result = await response.json();
          console.log("result service data", result);
          setService(result?.areas_of_expertise || {
            corporate_events: [],
            on_demand: [],
            private_events: []
          });

        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user.id]);

  const handleServiceChange = (event, serviceList, setServiceList) => {
    const { checked, value } = event.target;
    if (checked) {
      setServiceList([...serviceList, value]);
    } else {
      setServiceList(serviceList.filter(item => item !== value));
    }
  };

  const handleSubmit = async (event) => {
    console.log("handleSubmit ran");
    event.preventDefault();

    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append("first_name", name.split(" ")[0]);
    formData.append("last_name", name.split(" ")[1]);
    formData.append("phone", mobile);
    formData.append("email", email);
    formData.append("corporate_events", JSON.stringify(selectedCorporateEvents));
    formData.append("on_demand", JSON.stringify(selectedOnDemand));
    formData.append("private_events", JSON.stringify(selectedPrivateEvents));

    try {
      const resp = await fetch(`${IP}/provider/update-details`, {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const result = await resp.json();
      console.log("result Services:", result);
      toast.success("Updated your profile successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      props.onHide(); // Close the modal on success

    } catch (error) {
      console.log("Error show", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Profile
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="profile-image text-center">
            <img
              src={profileimage || "https://microbiology.ucr.edu/sites/default/files/styles/form_preview/public/blank-profile-pic.png"}
              alt=""
              style={{ width: "200px" }}
            />
          </div>
          <hr className="hr" />
          <h4>Personal Information</h4>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" onChange={event => setName(event.target.value)} value={name} />
          </Form.Group>

          <Form.Group className="mb-3 mt-3">
            <Row>
              <div className="col-md-6 mb-2">
                <Form.Label>Mobile No</Form.Label>
                <Form.Control
                  name="mobile"
                  type="text"
                  placeholder="Mobile No"
                  onChange={event => setMobile(event.target.value)} value={mobile}
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="E-Mail ID"
                  onChange={event => setEmail(event.target.value)} value={email}
                />
              </div>
            </Row>
          </Form.Group>
          <hr className="hr" />
          <h4>Skills</h4>
          <div>
            <h5>Corporate Events</h5>
            {service.corporate_events.map((cur, index) => (
              <Form.Check
                inline
                key={`corporate-${index}`}
                id={`corporate-${index}`}
                label={cur}
                name="corporate_events"
                value={cur}
                checked={selectedCorporateEvents.includes(cur)}
                onChange={(e) => handleServiceChange(e, selectedCorporateEvents, setSelectedCorporateEvents)}
              />
            ))}
          </div>
          <div>
            <h5>On-Demand</h5>
            {service.on_demand.map((cur, index) => (
              <Form.Check
                inline
                key={`on_demand-${index}`}
                id={`on_demand-${index}`}
                label={cur}
                name="on_demand"
                value={cur}
                checked={selectedOnDemand.includes(cur)}
                onChange={(e) => handleServiceChange(e, selectedOnDemand, setSelectedOnDemand)}
              />
            ))}
          </div>
          <div>
            <h5>Private Events</h5>
            {service.private_events.map((cur, index) => (
              <Form.Check
                inline
                key={`private-${index}`}
                id={`private-${index}`}
                label={cur}
                name="private_events"
                value={cur}
                checked={selectedPrivateEvents.includes(cur)}
                onChange={(e) => handleServiceChange(e, selectedPrivateEvents, setSelectedPrivateEvents)}
              />
            ))}
          </div>
          <hr className="hr" />
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button type="submit">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProfileEdit;
