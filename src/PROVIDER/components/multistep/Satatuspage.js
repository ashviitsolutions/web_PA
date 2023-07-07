import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
const Satatuspage = () => {


    return (
        <Container className="schudulecard">

            <div className="callstatus">
                <h3 className="mt-3" style={{ marginTop: "8rem" }}>Your application_status approved</h3>
                <Link to="/providers">
                    <Button variant="primary" type="submit">
                        Go to Home
                    </Button>
                </Link>

            </div>



        </Container>
    );
};

export default Satatuspage;
