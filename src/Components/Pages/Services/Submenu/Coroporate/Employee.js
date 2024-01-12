import React, { useEffect, useState } from 'react'
import { IP } from '../../../../../Constant';

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
            <div id="alternate_post">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="bg" style={{ backgroundImage: `url(${img})` }}>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="heading">
                                <h3>{users.title}</h3>
                                <p dangerouslySetInnerHTML={{ __html: users.description }} />

                                {/* <button className="button" type="button" name="button">book now</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Employee

