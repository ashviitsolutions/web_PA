import React,{useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import image1 from "../../assets/img/treatment-finger-keep-hand-161477.jpeg"

function Banner() {
  const postIds = ['64007bf761c43a17d60e95e8'];
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
        setUsers(responses[0]);
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
    <div id="small_banner" style={{ backgroundImage: `url(${image1})` }}>
    <div className="container">
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <div className="head" style={{textAlign: "center"}}>
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