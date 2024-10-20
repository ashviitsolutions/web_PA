import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function UserRoutes(props) {
    const token = localStorage.getItem("token");

    const { Component } = props;
    const nav = useNavigate();



    useEffect(() => {

        if (!token) {
            nav("/login");
        }

    }, []);

    return (
        <div>
            <Component />
        </div>
    )
}

export default UserRoutes