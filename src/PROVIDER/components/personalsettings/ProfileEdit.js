import React, { useState, useEffect } from "react";
import { Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IP } from "../../../Constant";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProfileEdit = (props) => {
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState([]);
  const formData = useSelector((state) => state?.counter?.formData);
  const user = formData.provider_profile && formData.provider_profile[0] ? formData.provider_profile[0] : "";
  const profileimage = formData.provider_profile_pic && formData.provider_profile_pic[0] ? formData.provider_profile_pic[0] : "";

  const [first_name, setFirst_name] = useState(user.first_name || '');
  const [last_name, setLast_name] = useState(user.last_name || '');
  const [mobile, setMobile] = useState(user.phone || '');
  const [email, setEmail] = useState(user.email || '');

  const [selectedItems, setSelectedItems] = useState(user?.areas_of_expertise?.on_demand || []);
  const [selectedPrivateEvents, setSelectedPrivateEvents] = useState(user?.areas_of_expertise?.private_events || []);
  const [selectedCorporateEvents, setSelectedCorporateEvents] = useState(user?.areas_of_expertise?.corporate_events || []);

  useEffect(() => {
    setFirst_name(user.first_name || "");
    setLast_name(user.last_name || "");
    setMobile(user.phone || "");
    setEmail(user.email || "");
  }, [user]);

  const handleSubmit = async (event) => {
    console.log("handleSubmit ran");
    event.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('providertoken');

    const requestData = {
      first_name,
      last_name,
      phone: mobile,
      email,
      areas_of_expertise: {
        on_demand: selectedItems,
        private_events: selectedPrivateEvents,
        corporate_events: selectedCorporateEvents
      }
    };

    try {
      const resp = await fetch(`${IP}/provider/update_profile`, {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData),
      });

      const result = await resp.json();

      if (resp.status === 200) {
        setLoading(false);
        console.log("result Services:", result);
        toast.success("Updated your profile successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        props.onHide(); // Close the modal on success
      } else {
        setLoading(false);
      }

    } catch (error) {
      console.log("Error show", error);
      setLoading(false);
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // Fetch list of services
  useEffect(() => {
    fetch(`${IP}/service/view-services?page=1&limit=100`)
      .then((resp) => resp.json())
      .then((data) => {
        setServices(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  let ondemand = services
    .filter((service) => service.category === 'on demand')
    .map((service) => {
      return { id: service._id, title: service.title };
    });

  let privateEvents = services
    .filter((service) => service.category === 'private events')
    .map((service) => {
      return { id: service._id, title: service.title };
    });

  let corporateEvents = services
    .filter((service) => service.category === 'corporate events')
    .map((service) => {
      return { id: service._id, title: service.title };
    });

  let areasofexpertise = {
    ondemand: ondemand,
    privateevents: privateEvents,
    corporateevents: corporateEvents,
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

          <Form.Group className="mb-3 mt-3">
            <Row>
              <div className="col-md-6 mb-2">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  onChange={event => setFirst_name(event.target.value)} value={first_name}
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  onChange={event => setLast_name(event.target.value)} value={last_name}
                />
              </div>
            </Row>
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
          <h5>Areas of Expertise</h5>
          <h6>On Demand</h6>

          {areasofexpertise.ondemand.map((item) => (
            <Form.Check
              key={item.id}
              inline
              id={item.id}
              label={item.title}
              name="group1"
              value={item.id}
              checked={selectedItems.includes(item.id)}
              onChange={(e) => {
                const itemValue = e.target.value;
                setSelectedItems((prevSelectedItems) => {
                  if (prevSelectedItems.includes(itemValue)) {
                    return prevSelectedItems.filter((selectedItem) => selectedItem !== itemValue);
                  } else {
                    return [...prevSelectedItems, itemValue];
                  }
                });
              }}
            />
          ))}

          <hr className="hr" />
          <h6>Private Events</h6>

          {areasofexpertise.privateevents.map((item) => (
            <Form.Check
              key={item.id}
              inline
              id={item.id}
              label={item.title}
              name="group1"
              value={item.id}
              checked={selectedPrivateEvents.includes(item.id)}
              onChange={(e) => {
                const itemValue = e.target.value;
                setSelectedPrivateEvents((prevSelectedItems) => {
                  if (prevSelectedItems.includes(itemValue)) {
                    return prevSelectedItems.filter((selectedItem) => selectedItem !== itemValue);
                  } else {
                    return [...prevSelectedItems, itemValue];
                  }
                });
              }}
            />
          ))}

          <hr className="hr" />

          <h6>Corporate Events</h6>

          {areasofexpertise.corporateevents.map((item) => (
            <Form.Check
              key={item.id}
              inline
              id={item.id}
              label={item.title}
              name="group1"
              value={item.id}
              checked={selectedCorporateEvents.includes(item.id)}
              onChange={(e) => {
                const itemValue = e.target.value;
                setSelectedCorporateEvents((prevSelectedItems) => {
                  if (prevSelectedItems.includes(itemValue)) {
                    return prevSelectedItems.filter(
                      (selectedItem) => selectedItem !== itemValue
                    );
                  } else {
                    return [...prevSelectedItems, itemValue];
                  }
                });
              }}
            />
          ))}

          <hr className="hr" />
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button type="submit">{loading ? "Loading" : "Save"}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProfileEdit;
