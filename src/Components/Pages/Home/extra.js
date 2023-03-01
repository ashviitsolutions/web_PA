// // import React, {useState, useEffect} from 'react'


// // function Banner() {
// //     const id='63f0cad81e627c34fc1b58e9'
// //     const [ images, setImages]=useState([])
// //     const [img, setImg] = useState();

// //     const [user , setuser]=useState([])
  
// //     console.log("img" , img)
// //     console.log("img path" , images)


// //     useEffect(() => {
// //         fetch(`http://45.13.132.197:4000/api/post/fetch/${id}`).then((res) => {
// //             return res.json();
// //         }).then((data) => {
// //             console.log("data", data)
// //             setImages(data.attachments[0])
// //             setuser(data)
           
// //         })
// //     }, [id])

// //     const fetchImage = async () => {
// //         const res = await fetch(`http://45.13.132.197:4000/api/file/${images}`);
// //         const imageBlob = await res.blob();
// //         const imageObjectURL = URL.createObjectURL(imageBlob);
// //         setImg(imageObjectURL);
// //       };
    
// //       useEffect(() => {
// //         fetchImage();
// //       },[images]);


// //     return (
// //         <>
// //             <div id="banner" style={{ backgroundImage: `url(${img})` }}>       
// //                 <div className="container">
// //                     <div className="row">
// //                         <div className="head" >
// //                             <h1>{user.title} </h1>
// //                             <h3 dangerouslySetInnerHTML={{__html:user.description}}/>
// //                             <button className="primary button small" type="button" >get started</button>
// //                             <button className="hollow button small" type="button" >services</button>
// //                         </div>
// //                     </div>
// //                 </div>
// //                 <div className="arrow_down">
// //                 </div>
// //             </div>

           
            
        

// //         </>
// //     )
// // }

// // export default Banner











// import React,{useEffect,useState} from 'react'
// import { Link } from 'react-router-dom';
// import Imge1 from "../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg"
// import Imge2 from "../../assets/img/masseur-doing-massage-backbone-man-body-spa-salon-beauty-treatment-concept.jpg";
// import Imge3 from "../../assets/img/tender-african-woman-relaxing-enjoying-healthy-spa-massage-with-oil.jpg"
// // import Imge4 from "../../assets/img/pexels-andrea-piacquadio-3764568.jpg"


// function Corporate() {

//     const postIds = ['63f89ed75a71849662bd1bb7', '63f89f065a71849662bd1bdd', '63f8a05e5a71849662bd1c05'];

// const [users, setUsers] = useState([]);
// const [images, setImages] = useState([]);
// const [img, setImg] = useState('');

// useEffect(() => {
//     async function fetchData() {
//         const responses = await Promise.all(
//             postIds.map(async id => {
//                 const res = await fetch(`http://45.13.132.197:4000/api/post/fetch/${id}`);
//                 return res.json();
//             })
//         );
//         setUsers(responses);
//         setImages(responses.flatMap(response => response.attachments));
//     }
//     fetchData();
// }, []);

// useEffect(() => {
//     async function fetchImages() {
//         const imageObjects = await Promise.all(
//             images.map(async image => {
//                 const res = await fetch(`http://45.13.132.197:4000/api/file/${image}`);
//                 const imageBlob = await res.blob();
//                 return URL.createObjectURL(imageBlob);
//             })
//         );
//         setImg(imageObjects); // Set the first image URL as the state value
//     }
//     if (images.length > 0) {
//         fetchImages();
//     }
// }, [images]);

    

//     return (
//         <>
//             <div id="types" >
//                 <div className="container" >
//                     <div className="row">
//                         <div className="gutter">
//                             <div className="heading">
//                                 <h3 >corporate event services</h3>
//                                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
//                             </div>
//                         </div>
//                     </div>
                   
//                     <div className="row">
//                         <div className="col-sm-10 col-sm-offset-1">
//                             <div className="container-fluid">
//                                 <div className="row">
//                                     <div className="col-sm-4 col-xs-12">
//                                         <div className="item_wrapper">
//                                             <div className="item">
//                                                 <div className="bg" style={{ backgroundImage: `url(${img})` ,borderRadius:"7px"}} >
//                                                 </div>
//                                                 <div className="text content">
//                                                     <h3>Title Goes here</h3>
//                                                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
//                                                     <div className="text">
//                                                         <Link to="#" className="anchor" id='anchors'>book now</Link>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-sm-4 col-xs-6">
//                                         <div className="item_wrapper">
//                                             <div className="item">
//                                                 <div className="bg" style={{ backgroundImage: `url(${img})` ,borderRadius:"7px"}} >
//                                                 </div>
//                                                 <div className="text content">
//                                                     <h3>Title Goes here</h3>
//                                                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
//                                                     <div className="text">
//                                                         <Link to="#" className="anchor" id='anchors'>book now</Link>
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-sm-4 col-xs-6">
//                                         <div className="item_wrapper">
//                                             <div className="item">
//                                                 <div className="bg" style={{ backgroundImage: `url(${img})` ,borderRadius:"7px"}} >
//                                                 </div>
//                                                 <div className="text content">
//                                                     <h3>Title Goes here</h3>
//                                                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
//                                                     <div className="text">
//                                                         <Link to="#" className="anchor" id='anchors'>book now</Link>
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                     </div>
                                    
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>




//         </>
//     )
// }

// export default Corporate





import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';

// import Imge4 from "../../assets/img/pexels-andrea-piacquadio-3764568.jpg"


function Corporate() {

const postIds = ['63f89ed75a71849662bd1bb7', '63f89f065a71849662bd1bdd', '63f8a05e5a71849662bd1c05'];

const [users, setUsers] = useState([]);
const [img, setImg] = useState('');

useEffect(() => {
    async function fetchData() {
      const responses = await Promise.all(
        postIds.map(async id => {
          const res = await fetch(`http://45.13.132.197:4000/api/post/fetch/${id}`);
          return res.json();
          
        })
      );
      setUsers(responses);
      setImg(
        await Promise.all(
          responses.flatMap(response => response.attachments).map(async image => {
            const res = await fetch(`http://45.13.132.197:4000/api/file/${image}`);
            const imageBlob = await res.blob();
            return URL.createObjectURL(imageBlob);
          })
        )
      );
    }
    fetchData();
  }, [])
    

    return (
        <>
            <div id="types" >
                <div className="container" >
                    <div className="row">
                        <div className="gutter">
                            <div className="heading">
                                <h3 >corporate event services</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </div>
                    </div>
                   
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-1">
                            <div className="container-fluid">
                                <div className="row">
                                {users.map((user, index) => (
                                    <div className="col-sm-4 col-xs-12" key={user._id}>
                                      <div className="item_wrapper">
                                        <div className="item">
                                          <div
                                            className="bg"
                                            style={{
                                              backgroundImage: `url(${img[index]})`,
                                              borderRadius: '7px',
                                            }}
                                          ></div>
                                          <div className="text content">
                                            <h3>{user.title}</h3>
                                            <p dangerouslySetInnerHTML={{ __html: user.description }} />
                                            <div className="text">
                                              <Link to="#" className="anchor" id="anchors">
                                                book now
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </>
    )
}

export default Corporate