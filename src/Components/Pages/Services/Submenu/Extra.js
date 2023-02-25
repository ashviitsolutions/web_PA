import React, {useState,useEffect} from 'react'
import Corporate from '../../Home/Corporate'
import Faq from '../../Home/Faq'
import { Link } from 'react-router-dom'
// import Image1 from "../../../assets/img/Ronin+PT25.jpg"
import Image2 from "../../../assets/img/pexels-cottonbro-3997983.jpg"
import Image7 from "../../../assets/img/works/test.svg"
import Image8 from "../../../assets/img/works/agreement.svg"
import Image9 from "../../../assets/img/works/move.svg"

// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, fetchImage } from '../../Redux/productSlice';
function Corporate_Events() {

  const id='63f48daf1e627c34fc1b73e1'


  const [ images, setImages]=useState([])
  const [img, setImg] = useState();

  const [user , setuser]=useState([])




  useEffect(() => {
      fetch(`http://45.13.132.197:4000/api/post/fetch/${id}`).then((res) => {
          return res.json();
      }).then((data) => {
          console.log("data", data)
          setImages(data.attachments)
          setuser(data)
         
      })
  }, [id])


  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(`http://45.13.132.197:4000/api/file/${images}`);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImg(imageObjectURL);
    };
    fetchImage();
  }, [images]);



  return (
    <>
    <div id="small_banner" style={{ backgroundImage: `url(${img})` ,borderRadius:"7px"}}>
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <div className="head">
        
          <h1>{user && user.title}</h1>
          <h3 dangerouslySetInnerHTML={{ __html: user && user.description }} />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="alternate_post">
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <div className="bg" style={{ backgroundImage: `url(${Image2})` ,borderRadius:"7px"}}>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="heading">
            <h3>Employee Wellness</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>

            <button className="button" type="button" name="button">book now</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Corporate/>


  <div id="talent">
    <div className="container">
      <div className="row">
        <div className="col-sm-7">
          <div className="big_head">
            <h3>how <span>it works</span></h3>
            <p>if you are not very sure , you can give us a call or fill the form below and we will call back you.</p>
          </div>
        </div>
      </div>
      <div className="big_wrapper">
        <span className="line"></span>
        <div className="row">
          <div className="col-sm-6 pull-big-right">
            <div className="wrapper">
              <div className="item item_right">
                <span className="tri"></span>
                <div className="inner_wrapper">
                  <div className="content">
                    <h3> <b>01</b> Book a service</h3>
                    <p>tell us about yourself, create a profile and we book for a service.</p>
                  </div>
                </div>
                <div className="bg" style={{ backgroundImage: `url(${Image7})` ,borderRadius:"7px"}}>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="wrapper">
              <div className="item" style={{top: "70px"}}>
                <div className="inner_wrapper">
                  <div className="content">
                    <h3> <b>02</b> contractor's  check in</h3>
                    <p>get the service at comfort of your home or visit a contractor's place.</p>
                  </div>
                </div>
                <div className="bg">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 pull-big-right">
            <div className="wrapper">
              <div className="item item_right">
                <span className="tri"></span>
                <div className="inner_wrapper">
                  <div className="content">
                    <h3> <b>03</b> rejuvinate</h3>
                    <p>our service provider will provide you services that you requested.</p>
                  </div>
                </div>
                <div className="bg" style={{ backgroundImage: `url(${Image8})` ,borderRadius:"7px"}}>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="wrapper">
              <div className="item" style={{top: "70px"}}>
                <div className="inner_wrapper">
                  <div className="content">
                    <h3> <b>04</b> give us  Ratings</h3>
                    <p>provide your valuable feedback and rating for our system as well as the service provider.</p>
                  </div>
                </div>
                <div className="bg" style={{ backgroundImage: `url(${Image9})` ,borderRadius:"7px"}}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="buttons_pane">
          <Link to="sign_up.php">
            <button className="button" > get started </button>
          </Link>
        </div>
      </div>
    </div>
  </div>

  <Faq/>
    </>
  )
}

export default Corporate_Events