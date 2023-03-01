import React,{useState,useEffect} from 'react'



function Banner() {
    const id="63f4861c1e627c34fc1b7389"
 




    const postIds = ['63f4861c1e627c34fc1b7389'];
    const [users, setUsers] = useState([]);
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
    }, [])
  
  
  
  
  
    return (
        <>
            <div id="small_banner" style={{ backgroundImage: `url(${img})` }} >
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-6">
                            <div className="head" id="bannerservices">
                            <h1>{users.title}</h1>
                            <h3 dangerouslySetInnerHTML={{ __html: users.description }} style={{fontWeight:"500", fontSize:"15px"}}/>
                                <button className="button" type="button" >book now</button>
                                <button className="button negative" type="button">book for event</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          
        </>
    )
}

export default Banner