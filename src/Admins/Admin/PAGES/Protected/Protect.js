import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function Protect(props) {
    const {Component}=props;
    const nav=useNavigate();
    useEffect(()=>{
        let login=localStorage.getItem("tokenadmin");
        if(!login){
            nav('/admin/login')
        }
        const timeout = setTimeout(() => {
          localStorage.clear()
          nav("/admin/login");
        }, 20 * 60 * 60 * 1000);
    
        return () => clearTimeout(timeout);
    },[nav])



  return (
    <div>
    <Component/>
    </div>
  )
}

export default Protect