import React, {useState ,useEffect} from 'react'

function Banner() {
  const id="63f4c0f81e627c34fc1b7a2d"

  
  const [ images, setImages]=useState([])
  const [img, setImg] = useState();

  const [user , setuser]=useState([])



  useEffect(() => {
      fetch(`http://45.13.132.197:4000/api/post/fetch/${id}`).then((res) => {
          return res.json();
      }).then((data) => {
          console.log("data", data)
          setImages(data.attachments[0])
          setuser(data)
         
      })
  }, [id])

  const fetchImage = async () => {
      const res = await fetch(`http://45.13.132.197:4000/api/file/${images}`);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImg(imageObjectURL);
    };
  
    useEffect(() => {
      fetchImage();
    },[images]);

  return (
    <>
    <div id="small_banner" style={{ backgroundImage: `url(${img})` ,borderRadius:"7px"}} >
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <div className="head" id="bannerservices">
          <h1>{user && user.title}</h1>
          <h3 dangerouslySetInnerHTML={{ __html: user && user.description }} />
          </div>
        </div>
      </div>
    </div>
  </div>


    </>
  )
}

export default Banner