import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import EditAvaliabilityModal from "../components/personalsettings/EditAvailabilityModal";
import MailingAddressModal from "../components/personalsettings/MailingAddressModal";
import PayoutInformationModal from "../components/personalsettings/PayoutInformationModal";
import Questionaire from "../components/personalsettings/Questionaire";
import Editprofile from "../components/personalsettings/Editprofile";
import { IP } from "../../Constant"
import AddressEdit from "../components/personalsettings/AddressEdit";
import ProfileEdit from "../components/personalsettings/ProfileEdit";


const PersonalSettings = () => {
  const [address, setAddress] = React.useState(false)
  const [addresedit, setAddresedit] = React.useState(false)
  const [postalcode, setPostalcode] = React.useState("")
  const [country, setCountry] = React.useState("")
  const [state, setState] = React.useState("")
  const [apt, setApt] = useState("")
  const [city, setCity] = useState("")
  const [skills, setSkills] = useState([])
  const [status, setStatus] = useState("")
  const [routing_number, setRouting_number] = useState("")
  const [account_num, setAccount_num] = useState("")
  const [editAvailiblityShow, seteditAvailiblityShow] = React.useState(false);
  const [profileedit, setProfileEdit] = React.useState(false);
  const [editYourOtherInfoShow, seteditYourOtherInfoShow] =
    React.useState(false);
  const [identityVerificationShow, setidentityVerificationShow] =
    React.useState(false);
  const [independentContractorShow, setindependentContractorShow] =
    React.useState(false);
  const [mailingAddressShow, setmailingAddressShow] = React.useState(false);
  const [payoutInformationShow, setpayoutInformationShow] =
    React.useState(false);
  const [verificationShow, setverificationShow] = React.useState(false);
  const [viewPUAShow, setviewPUAShow] = React.useState(false);
  const [questionsShow, setquestionsShow] = React.useState(false);

  const [editprofile, setEditprofile] = React.useState(false);

  const [images, setImages] = useState(null);
  const [img, setImg] = useState('');


  let questions = questionsShow ? <Questionaire /> : "";

  const token = localStorage.getItem("providertoken")
  useEffect(() => {
    fetch(`${IP}/user/my_profile`, {
      headers: {
        'Authorization': token
      }
    }).then(resp => {
      return resp.json()
    }).then(data => {
      console.log('prnsl setting', data)
      setAddress(data.mailing_address.address)
      setCountry(data.mailing_address.country)
      setPostalcode(data.mailing_address.postal_code)
      setState(data.mailing_address.state)
      setApt(data.mailing_address.apt_number)
      setCity(data.mailing_address.city)
      setSkills(data.areas_of_expertise.on_demand)
      setStatus(data.call_status)
      setRouting_number(data.payout_info.routing_number)
      setAccount_num(data.payout_info.account_number)
    })
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
  }, [images, token]);











  return (
    <>
      <Container  >
        <Row className="mb-2">
          <div className="col-md-4 mb-2 text-center">
            <div className="img-box shadow">
              <FontAwesomeIcon className="edit profile-edit" icon={faPencil} onClick={() => setEditprofile(true)} />
              <img
                src={img}
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
              <FontAwesomeIcon
                className="edit"
                icon={faPencil}
                style={{ top: "-16", right: "26px" }}
                onClick={() => setAddresedit(true)}
              />
              <Row style={{ height: "100%", alignContent: "space-evenly" }}>
                <div className="col-md-6">
                  <span className="personal-info-title">Address :</span> {address}
                </div>
                <div className="col-md-6">
                  <span className="personal-info-title">City :</span> {city}
                  City
                </div>
                <div className="col-md-6">
                  <span className="personal-info-title">Apt No :</span> {apt}

                </div>
                <div className="col-md-6">
                  <span className="personal-info-title">State :</span> {state}
                </div>
                <div className="col-md-6">
                  <span className="personal-info-title">Country :</span> {country}
                </div>
                <div className="col-md-6">
                  <span className="personal-info-title">Postal Code :</span> {postalcode}
                </div>

                <div className="col-md-6">
                  <span className="personal-info-title">call-status:</span> {status}
                </div>
              </Row>
            </div>
          </div>
        </Row>
        <Row className="mt-4 mb-4">
          <div className="col-md-4 mb-4">
            <div className="box shadow-sm mb-4">
              <h4 className="text-center">Actions</h4>
              <Button
                onClick={() => setProfileEdit(true)}
                className="mb-2"
              >
                ProfileEdit
              </Button>
              <Button
                onClick={() => setpayoutInformationShow(true)}
                className="mb-2"
              >
                Update Payout Information
              </Button>
             
              <Button
                onClick={() => seteditAvailiblityShow(true)}
                className="mb-2"
              >
                Edit Availability
              </Button>
             
              
              <Button onClick={() => setviewPUAShow(true)} className="mb-2">
                View PlatformUser Agreement
              </Button>
              <Button
                onClick={() => setindependentContractorShow(true)}
                className="mb-2"
              >
                Independent Contractor Verification
              </Button>
              <Button
                onClick={() => setmailingAddressShow(true)}
                className="mb-2"
              >
                Mailing Address
              </Button>
              <Button
                className="mb-2"
                onClick={() => {
                  setquestionsShow(true);
                }}
              >
                Questionnaire
              </Button>
            </div>
            <div className="box shadow-sm mb-4">
              <h4 className="text-center">Skills</h4>
              {skills.map((item) => (
                <div className="skill-item">{item}</div>
              ))}
            </div>
            <div className="box shadow-sm mb-4">
              <h4 className="text-center">Payout Information</h4>
              <div className="title">Routing Number</div>
              <div className="title-data personal-info-title">{routing_number}</div>
              <div className="title">Account Number</div>
              <div className="title-data personal-info-title">{account_num}</div>
            </div>
          </div>
          <div className="col-md-8 mb-4">{questions}</div>
        </Row>

        <EditAvaliabilityModal
          show={editAvailiblityShow}
          onHide={() => seteditAvailiblityShow(false)}
        />
        <PayoutInformationModal
          show={payoutInformationShow}
          onHide={() => setpayoutInformationShow(false)}
        />
        <MailingAddressModal
          show={mailingAddressShow}
          onHide={() => setmailingAddressShow(false)}
        />


        <Editprofile
          show={editprofile}
          onHide={() => setEditprofile(false)}
        />
        <AddressEdit
          show={addresedit}
          onHide={() => setAddresedit(false)}
        />
        <ProfileEdit
        show={profileedit}
        onHide={() => setProfileEdit(false)}
      />
      </Container>
    </>
  );
};

export default PersonalSettings;
