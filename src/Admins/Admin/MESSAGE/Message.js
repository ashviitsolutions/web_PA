import React from 'react'
import image1 from "../../img/uploads/photo-1583864697784-a0efc8379f70.jpeg"
import image2 from "../../img/uploads/8.-sad-girls-facebook-profile-pictures.jpg"
import image3 from "../../img/uploads/images.jfif"
import image4 from "../../img/uploads/01-shutterstock_476340928-Irina-Bg.jpg"
import image5 from "../../img/uploads/52c96f6269beddb8064f26d4.jpeg"
import image6 from "../../img/uploads/photo-1570295999919-56ceb5ecca61.jpeg"

import image7 from "../../img/uploads/94079751d6b1e838b1285a91f6b744bb.jpg"
import image8 from "../../img/uploads/pexels-photo-220453.jpeg"
import image9 from "../../img/uploads/94079751d6b1e838b1285a91f6b744bb.jpg"
import image10 from "../../img/uploads/photo-1505033575518-a36ea2ef75ae.jfif"
function Message() {
  return (
    <>
    <div id="content">
    <div className="container-fluid">
    <div className="row">
        <div className="heading">
            <h3>Messages</h3>
            <span className="toggle_sidebar" ></span>
        </div>
    </div>
    <div className="row">
        <div className="col-sm-4">
            <div className="chats_holder">
                <div className="item_wrapper">
                    <div className="item" >
                        <div className="bg" style={{ backgroundImage: `url(${image1})`}}  ></div>
                        <div className="text">
                            <div className="float_wrapper">
                                <span className="name pull-left">john doe</span>
                                <span className="time pull-right">yesterday, 10:03 pm</span>
                            </div>
                            <span className="message">Lorem ipsum dolor sit amet, </span>
                        </div>
                    </div>
                </div>
                <div className="item_wrapper">
                    <div className="item" active="">
                        <div className="bg" style={{ backgroundImage: `url(${image2})`}}></div>
                        <div className="text">
                            <div className="float_wrapper">
                                <span className="name pull-left">jane doe</span>
                                <span className="time pull-right">yesterday, 10:03 pm</span>
                            </div>
                            <span className="message">Lorem ipsum dolor sit amet, </span>
                        </div>
                    </div>
                </div>
                <div className="item_wrapper">
                    <div className="item" >
                        <div className="bg" style={{ backgroundImage: `url(${image3})`}}></div>
                        <div className="text">
                            <div className="float_wrapper">
                                <span className="name pull-left">miller joe</span>
                                <span className="time pull-right">yesterday, 10:03 pm</span>
                            </div>
                            <span className="message">Lorem ipsum dolor sit amet, </span>
                        </div>
                    </div>
                </div>
                <div className="item_wrapper">
                    <div className="item" >
                        <div className="bg" style={{ backgroundImage: `url(${image4})`}}></div>
                        <div className="text">
                            <div className="float_wrapper">
                                <span className="name pull-left">alice jake</span>
                                <span className="time pull-right">yesterday, 10:03 pm</span>
                            </div>
                            <span className="message">Lorem ipsum dolor sit amet, </span>
                        </div>
                    </div>
                </div>
                <div className="item_wrapper">
                    <div className="item" >
                        <div className="bg" style={{ backgroundImage: `url(${image5})`}}></div>
                        <div className="text">
                            <div className="float_wrapper">
                                <span className="name pull-left">alice jake</span>
                                <span className="time pull-right">yesterday, 10:03 pm</span>
                            </div>
                            <span className="message">Lorem ipsum dolor sit amet, </span>
                        </div>
                    </div>
                </div>
                <div className="item_wrapper">
                    <div className="item" >
                        <div className="bg" style={{ backgroundImage: `url(${image6})`}}></div>
                        <div className="text">
                            <div className="float_wrapper">
                                <span className="name pull-left">alice jake</span>
                                <span className="time pull-right">yesterday, 10:03 pm</span>
                            </div>
                            <span className="message">Lorem ipsum dolor sit amet, </span>
                        </div>
                    </div>
                </div>
                <div className="item_wrapper">
                    <div className="item" >
                        <div className="bg" style={{ backgroundImage: `url(${image7})`}}></div>
                        <div className="text">
                            <div className="float_wrapper">
                                <span className="name pull-left">alice jake</span>
                                <span className="time pull-right">yesterday, 10:03 pm</span>
                            </div>
                            <span className="message">Lorem ipsum dolor sit amet, </span>
                        </div>
                    </div>
                </div>
                <div className="item_wrapper">
                    <div className="item" >
                        <div className="bg" style={{ backgroundImage: `url(${image8})`}}></div>
                        <div className="text">
                            <div className="float_wrapper">
                                <span className="name pull-left">alice jake</span>
                                <span className="time pull-right">yesterday, 10:03 pm</span>
                            </div>
                            <span className="message">Lorem ipsum dolor sit amet, </span>
                        </div>
                    </div>
                </div>
                <div className="item_wrapper">
                    <div className="item" >
                        <div className="bg" style={{ backgroundImage: `url(${image9})`}}></div>
                        <div className="text">
                            <div className="float_wrapper">
                                <span className="name pull-left">alice jake</span>
                                <span className="time pull-right">yesterday, 10:03 pm</span>
                            </div>
                            <span className="message">Lorem ipsum dolor sit amet, </span>
                        </div>
                    </div>
                </div>
                <div className="item_wrapper">
                    <div className="item" >
                        <div className="bg" style={{ backgroundImage: `url(${image10})`}}></div>
                        <div className="text">
                            <div className="float_wrapper">
                                <span className="name pull-left">alice jake</span>
                                <span className="time pull-right">yesterday, 10:03 pm</span>
                            </div>
                            <span className="message">Lorem ipsum dolor sit amet, </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="col-sm-8">
            <div id="modal_chat">
                <div className="scrollable">
                    <div className="top_bar fixed">
                        <span className="back_button" ></span>
                        <span className="title">John Doe</span>
                        <span className="more_icon"></span>
                    </div>

                    <div className="message_holder">
                        <div className="item_wrapper">
                            <div className="item message">
                                <div className="content">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae laudantium nobis.
                                </div>
                                <span className="time">2:13pm</span>
                            </div>
                        </div>
                        <div className="item_wrapper">
                            <div className="item reply">
                                <div className="content">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae laudantium nobis.
                                </div>
                                <span className="time">2:13pm</span>
                            </div>
                        </div>
                    </div>

                    <div className="writing_pad">
                        <textarea className="input" placeholder="write a new message.." cols="1"></textarea>
                        <span className="send_icon"></span>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
</div>
    </>
  )
}

export default Message