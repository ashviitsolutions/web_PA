import React, { useEffect, useState } from 'react'
import { IP } from '../../../../../Constant';
import ModalCard from '../../../Modal/ModalCard';

function Employee() {

    const postIds = ['640aba5dad080eddce521992'];
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
            <ModalCard
                title={users.title}
                description={users.description}
                image={img}
                classImage="service-image-card"
                // id="alternate_post"

            />
          
        </>
    )
}

export default Employee

