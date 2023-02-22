import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, fetchImage } from '../../Redux/productSlice';


// import Image1 from "../../../assets/img/pexels-sergey-torbik-7365442.jpg"
import Image2 from "../../../assets/img/pexels-cottonbro-3997983.jpg"
import Image7 from "../../../assets/img/works/test.svg"
import Image8 from "../../../assets/img/works/agreement.svg"
import Image9 from "../../../assets/img/works/move.svg"
import Faq from '../../Home/Faq'
import Imge1 from "../../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg"
import Imge2 from "../../../assets/img/masseur-doing-massage-backbone-man-body-spa-salon-beauty-treatment-concept.jpg";
import Imge3 from "../../../assets/img/tender-african-woman-relaxing-enjoying-healthy-spa-massage-with-oil.jpg"

function Private_Events() {
  const id='63f49c8a1e627c34fc1b74f4'
  // const [img, setImg] = useState('');

  // const dispatch = useDispatch();

  // const user = useSelector((state) => state.product.data);

  // useEffect(() => {
  //   dispatch(fetchProducts(id));
  // }, [dispatch, id]);

  // useEffect(() => {
  //   if (img === '' && user && user.attachments) {
  //     dispatch(fetchImage(user.attachments[0])).then((result) => {
  //       setImg(result.payload);
  //     });
  //   }
  // }, [dispatch, user, img]);


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
      <div id="small_banner" style={{ backgroundImage: `url(${img})`, borderRadius: "7px" }}>
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
              <div className="bg" style={{ backgroundImage: `url(${Image2})`, borderRadius: "7px" }}>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="heading">
                <h3>Give a new life to your events</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>

                <button className="button" type="button" name="button">book now</button>
              </div>
            </div>
          </div>
        </div>
      </div>


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
                          <div className="col-sm-4 col-xs-12">
                              <div className="item_wrapper">
                                  <div className="item">
                                      <div className="bg" style={{ backgroundImage: `url(${Imge1})` ,borderRadius:"7px"}} >
                                      </div>
                                      <div className="text content">
                                          <h3>Title Goes here</h3>
                                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                                          <div className="text">
                                              <Link to="#" className="anchor" id='anchors'>book now</Link>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-sm-4 col-xs-6">
                              <div className="item_wrapper">
                                  <div className="item">
                                      <div className="bg" style={{ backgroundImage: `url(${Imge2})` ,borderRadius:"7px"}} >
                                      </div>
                                      <div className="text content">
                                          <h3>Title Goes here</h3>
                                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                                          <div className="text">
                                              <Link to="#" className="anchor" id='anchors'>book now</Link>
                                          </div>
                                      </div>

                                  </div>
                              </div>
                          </div>
                          <div className="col-sm-4 col-xs-6">
                              <div className="item_wrapper">
                                  <div className="item">
                                      <div className="bg" style={{ backgroundImage: `url(${Imge3})` ,borderRadius:"7px"}} >
                                      </div>
                                      <div className="text content">
                                          <h3>Title Goes here</h3>
                                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                                          <div className="text">
                                              <Link to="#" className="anchor" id='anchors'>book now</Link>
                                          </div>
                                      </div>

                                  </div>
                              </div>
                          </div>
                          
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>


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
                    <div className="bg" style={{ backgroundImage: `url(${Image7})`, borderRadius: "7px" }}>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="wrapper">
                  <div className="item" style={{ top: "70px" }}>
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
                    <div className="bg" style={{ backgroundImage: `url(${Image8})`, borderRadius: "7px" }}>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="wrapper">
                  <div className="item" style={{ top: "70px" }}>
                    <div className="inner_wrapper">
                      <div className="content">
                        <h3> <b>04</b> give us  Ratings</h3>
                        <p>provide your valuable feedback and rating for our system as well as the service provider.</p>
                      </div>
                    </div>
                    <div className="bg" style={{ backgroundImage: `url(${Image9})`, borderRadius: "7px" }}>
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
      <Faq />
    </>
  )
}

export default Private_Events