// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { IP } from "../../Constant";

// function Protected(props) {
//   const [user, setUser] = useState("");
//   const token = localStorage.getItem("providertoken");
//   const nav = useNavigate();
//  const {Component}=props;
//   useEffect(() => {
//     fetch(`${IP}/provider/profile`, {
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((resp) => {
//         return resp.json();
//       })
//       .then((result) => {
//         setUser(result.call_status);
//         console.log("call status check", result.call_status);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   if (user === "approved") {
//     nav("/providers");
//     return <div />;
//   } else if (user === "waiting") {
//     nav("/providers/waiting");
//     return <div />;
//   } else {
//     return
//     <div>
//     <Component />;

//     </div>
//   }
// }

// export default Protected;






















// import React,{useEffect ,useState} from 'react'
// import { useNavigate } from 'react-router-dom'
// import { IP } from '../../Constant';

// function Protected(props) {
//   const [user, setUser] = useState("");
//   const token = localStorage.getItem("providertoken");

//   useEffect(() => {
//     fetch(`${IP}/provider/profile`, {
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((resp) => {
//         return resp.json();
//       })
//       .then((result) => {
//         setUser(result.call_status);
//         console.log("call status check", result.call_status)
//       })
//       .catch((err) => {
       
//         console.log(err);
//       });
//   }, []);

 
//     const {Component}=props;
//     const nav=useNavigate();



//     useEffect(()=>{
//         let loginprotect=localStorage.getItem("providertoken");
//         let expirytime = localStorage.getItem("providerlogintime")
//         let currentTime = new Date().getTime()
//         if(!loginprotect){
//             nav('/providers/login')
//         }else{
//           if (user === "approved") {
//           nav("/providers");

//         }else{
//           nav("/providers/waiting");
//         }
//         }



       
//     },[user])
//   return (
//     <div>
//     <Component/>
//     </div>
//   )
// }

// export default Protected