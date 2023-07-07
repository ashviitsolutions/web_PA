import React, {useState ,useEffect} from 'react'
import { IP } from '../../../Constant';

function Banner() {


  const postIds = ['63fa025b06e32e1493232788'];
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
    <div id="small_banner" style={{ backgroundImage: `url(${img})` ,borderRadius:"7px"}} >
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <div className="head" id="bannerservices">
          <h1>{users.title} <span>{users.excerpt}</span></h1>
          <h3 dangerouslySetInnerHTML={{ __html: users.description }} style={{fontWeight:"500", fontSize:"15px"}}/>
          </div>
        </div>
      </div>
    </div>
  </div>


    </>
  )
}

export default Banner