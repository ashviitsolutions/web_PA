import React, { useEffect, useState } from 'react'
import { IP } from '../../../../../../Constant';
import { Link } from 'react-router-dom';
import ModalCard from '../../../../Modal/ModalCard';

function Visit() {
    const postIds = ['640ab8f5ad080eddce5218a6', '640ab999ad080eddce5218e0'];
    const [users1, setUsers1] = useState([]);
    const [img, setImg] = useState('');

    const [users2, setUsers2] = useState([]);





    useEffect(() => {
        async function fetchData() {
            const responses = await Promise.all(
                postIds.map(async id => {
                    const res = await fetch(`${IP}/post/fetch/${id}`);
                    return res.json();

                })
            );
            setUsers1(responses[0]);
            setUsers2(responses[1]);
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
    }, []);

    return (
        <>

            <ModalCard
                title={users1.title}
                description={users1.description}
                image={img[0]}
                h4={users1.excerpt}
                classImage="service-image-card"
            // id="alternate_post"

            />

            <ModalCard
                title={users2.title}
                description={users2.description}
                image={img[1]}
                h4={users2.excerpt}
                classImage="service-image-card"
            // id="alternate_post"

            />
          





        </>
    )
}

export default Visit