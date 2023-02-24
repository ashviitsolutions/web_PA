import React , {useState , useEffect} from 'react'

// import Image1 from "../../assets/img/pexels-ivan-samkov-5659057.jpg"
function Provider() {
    const postIds = ['63f8ad3d5a71849662bd26b8'];

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
            <div id="provider">                  
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="heading">
                                <h3>{users.title}</h3>
                                <h2>{users.excerpt}</h2>
                                <p  dangerouslySetInnerHTML={{ __html:users.description }}    />
                                <button className="button" type="button">become provider</button>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="right_half">
                            <img src={img} alt="..." style={{borderRadius:"7px"}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Provider