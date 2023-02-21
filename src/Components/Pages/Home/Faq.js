import React, { useState } from 'react'
const Data = [
    {
        id: 1,
        title: "Title Goes Here. ...  here?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti assumenda facilis neque quae reiciendis aspernatur harum consectetur voluptatibus culpa officiis voluptas alias magnam totam cum magni nemo, cumque accusantium corrupti."
    },
    {
        id: 2,
        title: "Title Goes Here. ...  here?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti assumenda facilis neque quae reiciendis aspernatur harum consectetur voluptatibus culpa officiis voluptas alias magnam totam cum magni nemo, cumque accusantium corrupti."
    },
    {
        id: 3,
        title: "Title Goes Here. ...  here?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti assumenda facilis neque quae reiciendis aspernatur harum consectetur voluptatibus culpa officiis voluptas alias magnam totam cum magni nemo, cumque accusantium corrupti."
    }
];

function Faq() {
    const [toggle, setToggle] = useState(Data.map(() => false));

    const handleToggle = (index) => {
        setToggle((prev) => {
            const newToggle = [...prev];
            newToggle[index] = !newToggle[index];
            return newToggle;
        });
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="heading content mt-5">
                        <h3>FAQ<small>(s)</small> </h3>
                        <p>Lorem ipsum dolor sit amet</p>
                    </div>
                </div>
                <div className="row">
                    <div id="faq_page" className="card layer1" style={{ padding: 0 }}>


                        {Data.map((curElem, index) => (
                            <div className="faq" key={curElem.id} style={{ marginLeft: "10px" }}>
                                <div style={{display:"flex"}} className="question">
                                    <span className='buttonplus' onClick={() => handleToggle(index)}>{toggle[index] ? '-' : '+'}</span>
                                    <h6>{curElem.title}</h6>
                                </div>

                                <div id="ans" className="answer">
                                    {toggle[index] && (
                                        <div id="ans" className="answer">
                                            <p>{curElem.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        ))}








                    </div>
                </div>
            </div>
        </>
    )
}

export default Faq