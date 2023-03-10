import React,{useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import { IP } from '../../../Constant';
// import Image1 from "../../assets/img/treatment-finger-keep-hand-161477.jpeg"

function Banner() {
  const postIds = ['6407358aad080eddce51f5ae'];
    const [users, setUsers] = useState([]);
  const [img, setImg] = useState('');
  
  useEffect(() => {
      async function fetchData() {
        const responses = await Promise.all(
          postIds.map(async id => {
            const res = await fetch(`${IP}/post/fetch/${id}`);
            return res.json();
            
          })
        );
        setUsers(responses[0]);
        setImg(
          await Promise.all(
            responses.flatMap(response => response.attachments).map(async image => {
              const res = await fetch(`${IP}/file/${image}`);
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
    <div id="small_banner" style={{ backgroundImage: `url(${img})` }}>
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <div className="head" >
         
          <h1>{users.title} <span>{users.excerpt}</span></h1>
          <h3 dangerouslySetInnerHTML={{ __html: users.description }} style={{fontWeight:"500", fontSize:"15px"}}/>
       
            <Link to="#services_tabs">
              <button className="button" >Join Our Team</button>
            </Link>
            <Link target="_blank" to="http://45.13.132.197:8082/">
              <button className="button negative">login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default Banner