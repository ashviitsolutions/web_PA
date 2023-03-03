import React , {useEffect , useState} from 'react'

function Visit() {
    const postIds = ['63f9c8ce06e32e1493231487', '63f9c8dd06e32e149323149e'];
    const [users1, setUsers1] = useState([]);
    const [img, setImg] = useState('');

    const [users2, setUsers2] = useState([]);





    useEffect(() => {
        async function fetchData() {
            const responses = await Promise.all(
                postIds.map(async id => {
                    const res = await fetch(`http://45.13.132.197:4000/api/post/fetch/${id}`);
                    return res.json();

                })
            );
            setUsers1(responses[0]);
            setUsers2(responses[1]);
            setImg(
                await Promise.all(
                    responses.flatMap(response => response.attachments).map(async image => {
                        const res = await fetch(`http://45.13.132.197:4000/api/file/${image}`);
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

        <div id="alternate_post">
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <div className="bg" style={{
                        backgroundImage: `url(${img[0]})`,
                        borderRadius: '7px',
                    }}>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="heading">
                        <h3>{users1.title}</h3>
                        <h4 >{users1.excerpt}</h4>
                        <p dangerouslySetInnerHTML={{ __html: users1.description }}  />

                        <button className="button" type="button" name="button">book now</button>
                    </div>
                </div>
            </div>


            <div className="row">
            <div className="col-sm-6">
                <div className="heading">
                <h3>{users2.title}</h3>
                <h4 >{users2.excerpt}</h4>

                <p dangerouslySetInnerHTML={{ __html: users2.description }}  />

                    <button className="button" type="button" name="button">book now</button>
                </div>
            </div>
            <div className="col-sm-6">
            <div className="bg" style={{
                backgroundImage: `url(${img[1]})`,
                borderRadius: '7px',
            }}>
            </div>
            </div>
        </div>
        </div>
    </div>




        
        </>
    )
}

export default Visit