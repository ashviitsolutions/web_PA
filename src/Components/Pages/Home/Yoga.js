import React , {useState , useEffect} from 'react'



function Yoga() {

    const postIds = ['63f898655a71849662bd1755', '63f89bb15a71849662bd1a8b', '63f89c1e5a71849662bd1ac2'];

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
            setUsers(responses);
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
            <div id="types" >
                <div className="container" >
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-1">
                            <div className="container-fluid">
                                <div className="row">

                                {users.map((user, index) => (
                                    <div className="col-sm-4 col-xs-12" key={user._id}>
                                      <div className="item_wrapper">
                                        <div className="item">
                                          <div
                                            className="bg"
                                            style={{
                                              backgroundImage: `url(${img[index]})`,
                                              borderRadius: '7px',
                                            }}
                                          ></div>
                                          <div className="content">
                                            <h3>{user.title}</h3>
                                            <p dangerouslySetInnerHTML={{ __html: user.description }} />
                                            <button className="button small" type="button">book now</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}


















                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>





        </>
    )
}

export default Yoga