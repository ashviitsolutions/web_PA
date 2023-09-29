import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Protectuser(props) {
    const [user, setUser] = useState("");
    const token = localStorage.getItem("token");

    const { Component } = props;
    const nav = useNavigate();



    // useEffect(() => {

    //     if (!token) {
    //         nav("/guest_login");
    //     } else {

    //         nav("/select_location");

    //     }

    // }, []);

    return (
        <div>
            <Component />
        </div>
    )
}

export default Protectuser