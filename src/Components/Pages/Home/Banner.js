import React, { useState, useEffect } from 'react';
import { IP } from '../../../Constant';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, fetchImage } from '../Redux/productSlice';

function Banner() {
  // const id = '63f0cad81e627c34fc1b58e9';
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




  // const [ images, setImages]=useState([])
  // const [img, setImg] = useState();

  // const [user , setuser]=useState([])




  // useEffect(() => {
  //     fetch(`http://45.13.132.197:4000/api/post/fetch/${id}`).then((res) => {
  //         return res.json();
  //     }).then((data) => {
  //         console.log("data", data)
  //         setImages(data.attachments)
  //         setuser(data)
         
  //     })
  // }, [id])


  
  // useEffect(() => {
  //   const fetchImage = async () => {
  //     const res = await fetch(`http://45.13.132.197:4000/api/file/${images}`);
  //     const imageBlob = await res.blob();
  //     const imageObjectURL = URL.createObjectURL(imageBlob);
  //     setImg(imageObjectURL);
  //   };
  //   fetchImage();
  // }, [images]);

  const postIds = ['63f0cad81e627c34fc1b58e9'];
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
      <div id="banner" style={{ backgroundImage: `url(${img})` }}>
        <div className="container">
          <div className="row">
            <div className="head">
              <h1>{users.title} <span>{users.excerpt}</span></h1>
              <h3 dangerouslySetInnerHTML={{ __html: users.description }} style={{fontWeight:"500", fontSize:"15px"}}/>
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
