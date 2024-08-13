import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const nav = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("providertoken")) {
            localStorage.removeItem("providertoken");
            nav('/providers/login');
        } else {
            nav('/providers/login');
        }
    }, [nav]);

    return null;
}

export default Logout;
