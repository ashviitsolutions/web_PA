import React, { useState } from 'react'
const Data1 = [
    {
        id: 1,
        title: "Title Goes Here. ...  1here?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti assumenda facilis neque quae reiciendis aspernatur harum consectetur voluptatibus culpa officiis voluptas alias magnam totam cum magni nemo, cumque accusantium corrupti."
    },
    
];

const Data = [
  
    {
        id: 2,
        title: "Title Goes Here. ...  2here?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti assumenda facilis neque quae reiciendis aspernatur harum consectetur voluptatibus culpa officiis voluptas alias magnam totam cum magni nemo, cumque accusantium corrupti."
    },
    {
        id: 3,
        title: "Title Goes Here. ...  3here?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti assumenda facilis neque quae reiciendis aspernatur harum consectetur voluptatibus culpa officiis voluptas alias magnam totam cum magni nemo, cumque accusantium corrupti."
    },
    {
        id: 4,
        title: "Title Goes Here. ...  3here?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti assumenda facilis neque quae reiciendis aspernatur harum consectetur voluptatibus culpa officiis voluptas alias magnam totam cum magni nemo, cumque accusantium corrupti."
    }
];

function Faq() {
    const [toggle, setToggle] = useState(Data.map(() => false));
    const [toggle1, setToggle1] = useState(Data.map(() => false));

    const handleToggle = (index) => {
        setToggle((prev) => {
            const newToggle = [...prev];
            newToggle[index] = !newToggle[index];
            return newToggle;
        });
    };
    const handleToggle1 = (index) => {
        setToggle1((prev) => {
            const newToggle = [...prev];
            newToggle[index] = !newToggle[index];
            return newToggle;
        });
    };
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="heading content mt-5 " id='faqtext'>
                        <h3>FAQ<small>(s)</small> </h3>
                        <p>Lorem ipsum dolor sit amet</p>
                    </div>
                </div>
                <div className="row">
                    <div id="faq_page" className="card layer1" style={{ padding: 0 }}>

                    {Data1.map((curElem, index) => (
                        <div className="faq" key={curElem.id} style={{ marginLeft: "10px" }}  onClick={() => handleToggle1(index)}>
                            <div style={{display:"flex"}} className="question">
                                <span className='buttonplus' >{!toggle1[index] ? '-' : '+'}</span>
                                <h6 id='faqitem'>{curElem.title}</h6>
                            </div>

                            <div id="ans" className="answer">
                                {!toggle1[index] && (
                                    <div id="ans" className="answer">
                                        <p>{curElem.description}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    ))}







                        {Data.map((curElem, index) => (
                            <div className="faq" key={curElem.id} style={{ marginLeft: "10px" }}  onClick={() => handleToggle(index)}>
                                <div style={{display:"flex"}} className="question">
                                    <span className='buttonplus' >{toggle[index] ? '-' : '+'}</span>
                                    <h6 id='faqitem'>{curElem.title}</h6>
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