import React,{useState,useEffect} from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, fetchImage } from '../Redux/productSlice';
// import Image1 from "../../assets/img/treatment-finger-keep-hand-161477.jpeg"


function Banner() {
    const id="63f4861c1e627c34fc1b7389"
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




    const postIds = ['63f4861c1e627c34fc1b7389'];
    const [users, setUsers] = useState([]);
    const [images, setImages] = useState([]);
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
            setImages(responses.flatMap(response => response.attachments));
        }
        fetchData();
    }, []);
    
    useEffect(() => {
        async function fetchImages() {
            const imageObjects = await Promise.all(
                images.map(async image => {
                    const res = await fetch(`http://45.13.132.197:4000/api/file/${image}`);
                    const imageBlob = await res.blob();
                    return URL.createObjectURL(imageBlob);
                })
            );
            setImg(imageObjects); // Set the first image URL as the state value
        }
        if (images.length > 0) {
            fetchImages();
        }
    }, [images]);
  
  
  
  
    return (
        <>
            <div id="small_banner" style={{ backgroundImage: `url(${img})` }} >
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-6">
                            <div className="head" id="bannerservices">
                            <h1>{users.title}</h1>
                            <h3 dangerouslySetInnerHTML={{ __html: users.description }} style={{fontWeight:"500", fontSize:"15px"}}/>
                                <button className="button" type="button" >book now</button>
                                <button className="button negative" type="button">book for event</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          
        </>
    )
}

export default Banner