import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import EditAvaliabilityModal from "../components/personalsettings/EditAvailabilityModal";
import MailingAddressModal from "../components/personalsettings/MailingAddressModal";
import PayoutInformationModal from "../components/personalsettings/PayoutInformationModal";
import Questionaire from "../components/personalsettings/Questionaire";

const PersonalSettings = () => {
  const [editAvailiblityShow, seteditAvailiblityShow] = React.useState(false);
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
  let questions = questionsShow ? <Questionaire /> : "";
  let skills = {data:['Deep Tissue','Therapeutic Massage','Sports Message']};

  return (
    <>
      <Container  >
        <Row className="mb-2">
          <div className="col-md-4 mb-2 text-center">
            <div className="img-box shadow">
              <FontAwesomeIcon className="edit profile-edit" icon={faPencil} />
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
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
              />
              <Row style={{ height: "100%", alignContent: "space-evenly" }}>
                <div className="col-md-6">
                  <span className="personal-info-title">Address :</span> Street
                  no 1, South Ave
                </div>
                <div className="col-md-6">
                  <span className="personal-info-title">City :</span> New York
                  City
                </div>
                <div className="col-md-6">
                  <span className="personal-info-title">Apt No :</span> 123
                </div>
                <div className="col-md-6">
                  <span className="personal-info-title">State :</span> Los
                  Angeles
                </div>
                <div className="col-md-6">
                  <span className="personal-info-title">Country :</span> United
                  States of America
                </div>
                <div className="col-md-6">
                  <span className="personal-info-title">Postal Code :</span>{" "}
                  123456
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
                onClick={() => setpayoutInformationShow(true)}
                className="mb-2"
              >
                Update Payout Information
              </Button>{" "}
              <Button
                onClick={() => setidentityVerificationShow(true)}
                className="mb-2"
              >
                Identity Verification
              </Button>{" "}
              <Button
                onClick={() => seteditAvailiblityShow(true)}
                className="mb-2"
              >
                Edit Availability
              </Button>{" "}
              <Button
                onClick={() => setverificationShow(true)}
                className="mb-2"
              >
                Verification
              </Button>{" "}
              <Button
                onClick={() => seteditYourOtherInfoShow(true)}
                className="mb-2"
              >
                Edit your other Info
              </Button>{" "}
              <Button onClick={() => setviewPUAShow(true)} className="mb-2">
                View PlatformUser Agreement
              </Button>{" "}
              <Button
                onClick={() => setindependentContractorShow(true)}
                className="mb-2"
              >
                Independent Contractor Verification
              </Button>{" "}
              <Button
                onClick={() => setmailingAddressShow(true)}
                className="mb-2"
              >
                Mailing Address
              </Button>{" "}
              <Button
                className="mb-2"
                onClick={() => {
                  setquestionsShow(true);
                }}
              >
                Questionnaire
              </Button>{" "}
            </div>
            <div className="box shadow-sm mb-4">
              <h4 className="text-center">Skills</h4>
              {skills.data.map((item) => (
                <div className="skill-item">{item}</div> 
              ))}
            </div>
            <div className="box shadow-sm mb-4">
              <h4 className="text-center">Payout Information</h4>
              <div className="title">Routing Number</div>
              <div className="title-data personal-info-title">9876543212</div>
              <div className="title">Account Number</div>
              <div className="title-data personal-info-title">9876543212</div>
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
      </Container>
    </>
  );
};

export default PersonalSettings;
