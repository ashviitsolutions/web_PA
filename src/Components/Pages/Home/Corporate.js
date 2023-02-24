import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import Imge1 from "../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg"
import Imge2 from "../../assets/img/masseur-doing-massage-backbone-man-body-spa-salon-beauty-treatment-concept.jpg";
import Imge3 from "../../assets/img/tender-african-woman-relaxing-enjoying-healthy-spa-massage-with-oil.jpg"
// import Imge4 from "../../assets/img/pexels-andrea-piacquadio-3764568.jpg"


function Corporate() {

const postIds = ['63f89ed75a71849662bd1bb7', '63f89f065a71849662bd1bdd', '63f8a05e5a71849662bd1c05'];

const [users, setUsers] = useState([]);
const [images, setImages] = useState([]);
const [img, setImg] = useState('');

console.log("users", users)
console.log("image value", img)


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
                                          <div className="text content">
                                            <h3>{user.title}</h3>
                                            <p dangerouslySetInnerHTML={{ __html: user.description }} />
                                            <div className="text">
                                              <Link to="#" className="anchor" id="anchors">
                                                book now
                                              </Link>
                                            </div>
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

export default Corporate