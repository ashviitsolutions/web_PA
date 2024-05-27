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
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from "../../Components/Pages/Redux/counterSlice";


const PersonalSettings = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state?.counter?.formData);
  const user = formData.provider_profile && formData.provider_profile[0] ? formData.provider_profile[0] : "";
  const profileimage = formData.provider_profile_pic && formData.provider_profile_pic[0] ? formData.provider_profile_pic[0] : "";
  // const [user, setUser] = React.useState()

  const [addresedit, setAddresedit] = React.useState(false)

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
    const fetchData = async () => {
      try {
        const response = await fetch(`${IP}/provider/profile`, {
          headers: {
            'Authorization': token
          }
        });
        const result = await response.json();
        console.log("provider perofile data", result)
        // setUser(result)
        dispatch(updateInputData({ formName: 'provider_profile', inputData: result }));
        setImages(result.profile_pic);
      } catch (err) {
        console.log(err);
      }
    };

    console.log("provider perofile user", user)

    const fetchImage = async () => {
      try {
        const res = await fetch(`${IP}/file/${images}`);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
        dispatch(updateInputData({ formName: 'provider_profile_pic', inputData: imageObjectURL }));
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
        <Row className="mb-2 mt-5">
          <div className="col-md-4 mb-2 text-center">
            <div className="img-box shadow">
              <FontAwesomeIcon className="edit profile-edit" icon={faPencil} onClick={() => setEditprofile(true)} />
              <img
                src={profileimage}
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
                  <span className="personal-info-title">Address :</span> {user?.mailing_address?.address}
                </div>
                <div className="col-md-6">
                  <span className="personal-info-title">Postal Code :</span> {user?.mailing_address?.postal_code}
                </div>
                <div className="col-md-6">
                  <span className="personal-info-title">DOB :</span> {user?.DOB}

                </div>
                <div className="col-md-6">
                  <span className="personal-info-title">phone :</span> {user.phone}

                </div>
                <div className="col-md-6">
                  <span className="personal-info-title">working shift :</span> {user.working_shift}
                </div>
                <div className="col-md-6">
                  <span className="personal-info-title">Status:</span> {user.call_status}
                </div>
              </Row>
            </div>
          </div>
        </Row>
        <Row className="mt-12 mb-12">
          <div className="col-md-12 mb-12">
            <div className="box profileBtn shadow-sm mb-12" style={{ textAlign: "center" }}>
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


            { /*    <div className="box shadow-sm mb-4">
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
              </div> */}


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
