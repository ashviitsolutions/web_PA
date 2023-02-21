import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, fetchImage } from '../Redux/productSlice';

function Banner() {
  const id = '63f49f9c1e627c34fc1b7607';
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
  // }, [dispatch, user, img , id]);




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
      <div id="banner" style={{ backgroundImage: `url(${img})` }}>
        <div className="container">
          <div className="row">
            <div className="head">
              <h1>{user && user.title}</h1>
              <h3 dangerouslySetInnerHTML={{ __html: user && user.description }} />
              <button className="primary button small" type="button">
                get started
              </button>
              <button className="hollow button small" type="button">
                services
              </button>
            </div>
          </div>
        </div>
        <div className="arrow_down"></div>
      </div>
    </>
  );
}

export default Banner;
