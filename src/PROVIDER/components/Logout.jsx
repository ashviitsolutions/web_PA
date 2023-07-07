import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    const nav = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem("providertoken")){
            localStorage.clear()
            nav('/providers/login')

        }else{
            nav('/providers/login')
        }
  
    },[])
 
}

export default Logout