import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { IP } from "../../Constant";
const Callstatus = () => {
    const [user, setUser] = useState("");
    const [data, setData] = useState("");
  const users=localStorage.getItem("applicationstatus")
    useEffect(() => {
        const token = localStorage.getItem("providertoken");

        try {

            fetch(`${IP}/provider/application-status`, {
                headers: {
                    Authorization: token,
                },
            })
                .then((resp) => {
                    return resp.json();
                })
                .then((result) => {
                    setUser(result.application_status);
                    setData(result);
                    localStorage.setItem("applicationstatus",result.application_status);
                    console.log("application-status", result)
                    if (result.application_status >= 3) {
                        localStorage.setItem("approvaluser", "approval");
                       

                    }

                })

        } catch (error) {
            console.log(error);
        }

    }, []);



    return (
        <Container className="schudulecard">

            <div className="callstatus">
                {
                    users === "0" ? (
                        <>
                            <h3 className="mt-5" style={{ marginTop: "18rem" }}>please fill out application form to continue</h3>
                            <Link to="/providers/application-form">
                                <Button variant="primary" type="submit">
                                    Go to Form
                                </Button>
                            </Link>
                        </>

                    ) : null
                }
                {
                    users === "1" ? (
                        <>
                            <h3 className="mt-3" style={{ marginTop: "8rem" }}>{data.application_status_text}</h3>
                            <Link to="/providers/application-form">
                                <Button variant="primary" type="submit">
                                    Go to Form
                                </Button>
                            </Link>
                        </>

                    ) : null
                }
                {
                    user === 2 ? (
                        <>
                            <h3 className="mt-3" style={{ marginTop: "8rem" }}>{data.application_status_text}</h3>
                            <Link to="/providers/application-form">
                                <Button variant="primary" type="submit">
                                    Go to Form
                                </Button>
                            </Link>
                        </>

                    ) : null
                }


            </div>



        </Container>
    );
};

export default Callstatus;
