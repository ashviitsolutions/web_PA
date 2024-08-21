import React from 'react';
import './ModalCard.css'; // Import your regular CSS for additional styling
import { Link } from 'react-router-dom';

const ModalCard = ({
    image,
    srcImage,
    title,
    description,
    h2,
    h4,
    p,
    classImage,
    className,
    btn_name1,
    btn_name2,
    btnClass1,
    dowonload1,
    dowonload2,
    btnClass2,
    redirect1,
    redirect2,
    type1 = "button",
    type2 = "button"
}) => {
    return (
        <div id='donwload_page_container' className={className}>
            <div className="container" >
                <div className="row">
                    <div className="col-md-6">
                        {
                            image && (
                                <div
                                    className={classImage}
                                    style={{ backgroundImage: `url(${image})` }}
                                ></div>
                            )
                        }

                        {
                            srcImage && (
                                <div>
                                    <img className="service-image-card" src={srcImage} alt="" />
                                </div>
                            )
                        }


                    </div>
                    <div className="col-md-6">
                        <div className="content-right">
                            {
                                title && (
                                    <h3 className="title-card">{title}</h3>
                                )
                            }

                            {
                                h2 && (
                                    <p className="description-card">{h2}</p>
                                )
                            }

                            {
                                h4 && (
                                    <h4>{h4}</h4>
                                )
                            }

                          

                            {
                                p && (
                                    <p className="description-card">{p}</p>
                                )
                            }

                            {
                                description && (
                                    <p className="description-card" dangerouslySetInnerHTML={{ __html: description }} />
                                )
                            }

                            {
                                (btn_name1 || btn_name2) && (
                                    <div className="button-card">
                                        {btn_name1 && (
                                            <Link to={`/${redirect1}`}>
                                                <button className={btnClass1} type={type1}>{btn_name1}</button>


                                            </Link>
                                        )}

                                        {btn_name2 && (
                                            <Link to={`/${redirect2}`}>
                                                <button className={btnClass2} type={type2}>{btn_name2}</button>

                                            </Link>
                                        )}
                                    </div>
                                )
                            }
                            {
                                (dowonload1 || dowonload2) && (
                                    <div className="button-card">
                                        {dowonload1 && (
                                            <Link to={`/${redirect1}`}>


                                                <img id='downloadimage' src={dowonload1} alt="" />
                                            </Link>
                                        )}

                                        {dowonload2 && (
                                            <Link to={`/${redirect2}`}>

                                                <img id='downloadimage' src={dowonload2} alt="" />
                                            </Link>
                                        )}
                                    </div>
                                )
                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ModalCard;
