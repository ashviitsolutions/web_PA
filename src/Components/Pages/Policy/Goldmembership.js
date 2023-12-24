import React, { useState, useEffect } from 'react';
import { IP } from '../../../Constant';
import "./Private.css";


function Goldmembership() {
    const postIds = ['658841b6c6a57813d662403b'];
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

    console.log("users", users)

    const createMarkup = (htmlString) => {
        return { __html: htmlString };
    };

    return (
        <div className='Privacy_Policy'>
            <div className='privacy_container'>
                <div className='policy_image_logo'>
                    <img src={img} alt='' />
                </div>
                <div
                    className='Privacy_content'
                    dangerouslySetInnerHTML={createMarkup(users.description)}
                />
            </div>
        </div>
    );
}

export default Goldmembership;
