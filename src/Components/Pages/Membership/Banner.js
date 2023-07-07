import React,{useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import { IP } from '../../../Constant';

function Banner() {
  const postIds = ['64073ef5ad080eddce51fae5'];
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
    <div id="small_banners" style={{ backgroundImage: `url(${img})` }}>
    <div className="container">
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <div className="heads" style={{textAlign: "center"}}>
          <h1>{users.title} <span>{users.excerpt}</span></h1>
          <h3 dangerouslySetInnerHTML={{ __html: users.description }} />
            <Link to="book">
              <button className="button" type="button" name="button">Get Started</button>
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