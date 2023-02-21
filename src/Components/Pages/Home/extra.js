import React, {useState, useEffect} from 'react'


function Banner() {
    const id='63f0cad81e627c34fc1b58e9'
    const [ images, setImages]=useState([])
    const [img, setImg] = useState();

    const [user , setuser]=useState([])
  
    console.log("img" , img)
    console.log("img path" , images)


    useEffect(() => {
        fetch(`http://45.13.132.197:4000/api/post/fetch/${id}`).then((res) => {
            return res.json();
        }).then((data) => {
            console.log("data", data)
            setImages(data.attachments[0])
            setuser(data)
           
        })
    }, [id])

    const fetchImage = async () => {
        const res = await fetch(`http://45.13.132.197:4000/api/file/${images}`);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
      };
    
      useEffect(() => {
        fetchImage();
      },[images]);


    return (
        <>
            <div id="banner" style={{ backgroundImage: `url(${img})` }}>       
                <div className="container">
                    <div className="row">
                        <div className="head" >
                            <h1>{user.title} </h1>
                            <h3 dangerouslySetInnerHTML={{__html:user.description}}/>
                            <button className="primary button small" type="button" >get started</button>
                            <button className="hollow button small" type="button" >services</button>
                        </div>
                    </div>
                </div>
                <div className="arrow_down">
                </div>
            </div>

            

        </>
    )
}

export default Banner

















