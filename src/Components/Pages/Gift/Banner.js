import React,{useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import { IP } from '../../../Constant';
// import Image1 from "../../assets/img/treatment-finger-keep-hand-161477.jpeg"

function Banner() {
  const postIds = ['64074080ad080eddce51fbf6'];
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
            <div className="head">
            <h1>{users.title} <span>{users.excerpt}</span></h1>
            <h3 dangerouslySetInnerHTML={{ __html: users.description }} />
              <Link to="#gift_card"><button className="button" type="button" name="button">get started</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Banner