import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from 'react-router-dom';
import { IP } from "../../../Constant";
import { useSelector } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const MailingAddressModal = (props) => {
  const [loading, setLoading] = useState(false)
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const formData = useSelector((state) => state?.counter?.formData);
  const user = formData.provider_profile && formData.provider_profile[0] ? formData.provider_profile[0] : "";
  const nav = useNavigate();

  const [address, setAddress] = useState(user?.mailing_address?.address || "");
  const [aptNumber, setAptNumber] = useState(user?.mailing_address?.apt_number || "");
  const [postalCode, setPostalCode] = useState(user?.mailing_address?.postal_code || "");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState(user?.mailing_address?.country || "");

  useEffect(() => {
    if (user?.mailing_address?.city && user?.mailing_address?.state) {
      setCity(user.mailing_address.city);
      setState(user.mailing_address.state);
    } else {
      const cityStateCountry = user?.mailing_address?.address || ""; // Example string
      const parts = cityStateCountry.split(", ").map(part => part.trim());
      if (parts.length === 3) {
        setCity(parts[0]);
        setState(parts[1]);
        setCountry(parts[2]);
      }
    }
  }, [user]);

  const handleSelect = async (value) => {
    try {
      const results = await geocodeByAddress(value);
      const ll = await getLatLng(results[0]);
      console.log(ll);
      setAddress(value);
      setCoordinates(ll);

      const addressComponents = results[0].address_components;
      const cityComponent = addressComponents.find(component => component.types.includes("locality"));
      const stateComponent = addressComponents.find(component => component.types.includes("administrative_area_level_1"));
      const countryComponent = addressComponents.find(component => component.types.includes("country"));

      setCity(cityComponent ? cityComponent.long_name : "");
      setState(stateComponent ? stateComponent.long_name : "");
      setCountry(countryComponent ? countryComponent.long_name : "");
    } catch (error) {
      console.error("Error selecting location:", error);
    }
  }

  let token = localStorage.getItem("providertoken");

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true)
    if (isNaN(coordinates.lat) || isNaN(coordinates.lng)) {
      console.error("Invalid coordinates:", coordinates);
      return;
    }
    let datas = {
      "address": address,
      "apt_number": aptNumber,
      "postal_code": postalCode,
      "city": city,
      "state": state,
      "country": country,
      "application_status": user.application_status,
      "longitude": coordinates.lng,
      "latitude": coordinates.lat
    };

    try {
      const resp = await fetch(`${IP}/provider/mailing_address`, {
        method: "PUT",
        headers: {
          'Authorization': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datas)
      });

      if (resp.status === 200) {
        nav("/providers");
      }

    } catch (error) {
      setLoading(false)
      console.log("Error show", error);
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
          Mailing Address
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleUpdate}>
        <Modal.Body>
          <Form.Group className="mb-3 mt-2">
            <div className="col-md-12 mb-2">
              <Form.Label htmlFor="current_address">Current Address</Form.Label>
              <div className="input_group">
                <PlacesAutocomplete
                  value={address}
                  onChange={setAddress}
                  onSelect={handleSelect}
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                      <input
                        className="input"
                        {...getInputProps()}
                        placeholder="Search for an address here..."
                      />
                      <div>
                        {loading ? <div>Loading...</div> : null}
                        {suggestions.map((suggestion) => {
                          const style = {
                            backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                          };
                          return (
                            <div {...getSuggestionItemProps(suggestion, { style })}>
                              {suggestion.description}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>APT Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="APT Number"
              value={aptNumber}
              onChange={(e) => setAptNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button type="submit">{loading ? "Loading" : "Save"}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default MailingAddressModal;
