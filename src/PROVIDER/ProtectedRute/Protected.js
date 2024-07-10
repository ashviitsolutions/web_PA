import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IP } from '../../Constant';

function Protected(props) {
  const [user, setUser] = useState("");

  const { Component } = props;
  const nav = useNavigate();



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
          setUser(result?.application_status);

        });
    } catch (error) {
      console.log(error);
    }

    let loginprotect = localStorage.getItem("providertoken");
    let approvaluser = localStorage.getItem("approvaluser");
    if (!loginprotect) {
      nav("/providers/login");
    } else {
      if (approvaluser === "approval" || user >= 3) {
        nav("/providers");
      } else {
        nav("/providers/waiting");
      }
    }

    const timeout = setTimeout(() => {
      localStorage.clear()
      nav("/providers/login");
    }, 20 * 60 * 60 * 1000);

    return () => clearTimeout(timeout);
  }, [user]);

  return (
    <div>
      <Component />
    </div>
  )
}

export default Protected