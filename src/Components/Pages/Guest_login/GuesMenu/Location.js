import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice'; 
import { useNavigate } from 'react-router-dom';

function Location() {
  // Use useSelector with the correct selector to get the formData
  const formData = useSelector((state) => state.counter.formData);
  console.log(formData);

  const dispatch = useDispatch();
  const nav = useNavigate();
  const [Input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      location: {
        type: 'Point',
        coordinates: [28.586445, 77.365726],
      },
    };

    // Dispatch the updateInputData action with the Input value
    dispatch(updateInputData({ formName: 'locationForm', inputData: config }));


    setTimeout(() => {
      nav("/guest_login");

    }, 2000)
  };

  return (
    <>
      <div id="over_banner">
        <div className="container">
          <div className="row">
            <form className="location card layer1">
              <h3>Where would you like our provider to meet you.</h3>
              <div className="input_group">
                <input
                  className="input"
                  type="text"
                  onChange={(e) => setInput(e.target.value)}
                  value={Input}
                  placeholder="Search for an address here..."
                />
              </div>
              <div className="input_group">
                <button
                  className="button"
                  style={{ paddingTop: '11px' }}
                  type="button"
                  onClick={handleSubmit}
                >
                  continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Location;
