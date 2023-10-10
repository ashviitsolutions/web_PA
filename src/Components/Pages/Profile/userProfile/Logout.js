import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const nav=useNavigate();

  const handleLogout=()=>{
    localStorage.clear()
    nav("/")
  }
  return (
    <div onClick={handleLogout}>Logout</div>
  )
}

export default Logout