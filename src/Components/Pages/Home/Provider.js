import React, { useState, useEffect } from 'react'
import { IP } from '../../../Constant';
import { Link } from 'react-router-dom';
import ModalCard from '../Modal/ModalCard';

// import Image1 from "../../assets/img/pexels-ivan-samkov-5659057.jpg"
function Provider() {
    const postIds = ["63f8ad3d5a71849662bd26b8"];

    const [users, setUsers] = useState([]);
    const [images, setImages] = useState([]);
    const [img, setImg] = useState("");

    useEffect(() => {
        async function fetchData() {
            const responses = await Promise.all(
                postIds.map(async id => {
                    const res = await fetch(`${IP}/post/fetch/${id}`);
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
                    const res = await fetch(`${IP}/file/${image}`);
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
            <ModalCard
                title={users.title}
                h2={users.excerpt}
                p="Book your desired on demand service using our app in less than 5 minutes . Your provider can be at your door as quick as within an hour!"
                description={users.description}
                btn_name1='become provider'

                srcImage={img}
                btnClass1='button'
                // className="headinghome"
                redirect1="become_provider"
                className="provider_background"

            />
         

        </>
    )
}

export default Provider;
