import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchImage } from '../Redux/productSlice';

function Banner() {
  const [img, setImg] = useState('');
  const id = '63f0cad81e627c34fc1b58e9';
  const dispatch = useDispatch();

  const user = useSelector((state) => state.product.data);

  useEffect(() => {
    dispatch(fetchProducts(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (img === '' && user && user.attachments) {
      dispatch(fetchImage(user.attachments[0])).then((result) => {
        setImg(result.payload);
      });
    }
  }, [dispatch, user, img]);




  return (
    <>
      <div id="banner" style={{ backgroundImage: `url(${img})` }}>
        <div className="container">
          <div className="row">
            <div className="head">
              <h1>{user && user.title}</h1>
              <h3 dangerouslySetInnerHTML={{ __html: user && user.description }} />
              <button className="primary button small" type="button">
                get started
              </button>
              <button className="hollow button small" type="button">
                services
              </button>
            </div>
          </div>
        </div>
        <div className="arrow_down"></div>
      </div>
    </>
  );
}

export default Banner;
