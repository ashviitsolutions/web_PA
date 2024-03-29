import React, { useState, useEffect } from 'react'
import { IP } from '../../../../../Constant';

function Banner() {
    const postIds = ['640aba03ad080eddce52195a'];
    const [users, setUsers] = useState([]);
    const [img, setImg] = useState('');

    console.log("users", users)
    console.log("image value of coroport iamge", img)


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
    }, []);

    return (
        <>
            <div id="small_banner" style={{ backgroundImage: `url(${img})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="head">
                                <h1>{users.title} </h1>
                                <h3 dangerouslySetInnerHTML={{ __html: users.description }} style={{ fontWeight: "500", fontSize: "15px" }} />
                                <a href='#showcard'><button className="button" >get started</button></a>
                    {/* <button className="button hollow" >services</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner