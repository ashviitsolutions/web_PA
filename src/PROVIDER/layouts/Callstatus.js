import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { IP } from "../../Constant";
import { useSelector } from 'react-redux';

const Callstatus = () => {
    const formData = useSelector((state) => state?.counter?.formData);
    const provider_profile = formData.provider_profile && formData.provider_profile[0] ? formData.provider_profile[0] : "";



    return (
        <Container className="schudulecard">
            <div className="callstatus">
                {provider_profile.application_status === 0 ? (
                    <>
                        <h3 className="mt-5" style={{ marginTop: "18rem" }}>
                            Please fill out the application form to continue
                        </h3>
                        <Link to="/providers/application-form">
                            <Button variant="primary" type="submit">
                                Go to Form
                            </Button>
                        </Link>
                    </>
                ) : null}
                {provider_profile.application_status === 1 ? (
                    <>
                        <h3 className="mt-3" style={{ marginTop: "8rem" }}>
                            Application form submitted,call interview pending
                        </h3>
                        <Link to="/providers/application-form">
                            <Button variant="primary" type="submit">
                                Go to Form
                            </Button>
                        </Link>
                    </>
                ) : null}
                {provider_profile.application_status === 2 ? (
                    <>
                        <h3 className="mt-3" style={{ marginTop: "8rem" }}>
                            call interview done, verification pending
                        </h3>
                        <Link to="/providers/application-form">
                            <Button variant="primary" type="submit">
                                Go to Form
                            </Button>
                        </Link>
                    </>
                ) : null}
            </div>
        </Container>
    );
};

export default Callstatus;
