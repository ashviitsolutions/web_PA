import React from 'react';
import { useState ,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice'; 
import { useNavigate } from 'react-router-dom';
import Hook from '../../Profile/Hook/Hook';


function Location() {
  const [name, setName] = useState("");
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
      nav("/select_location_type");

    }, 2000)
  };



  useEffect(() => {
   

    const fetchPosts = async () => {
      try {
        const response = await Hook.getProfile();
        if (response.data.name) {
          setName(response.data.name);
          localStorage.setItem("user_name", response.data.name);
        } else {
          const fullName = `${response.data.first_name} ${response.data.last_name}`;
          setName(fullName);
          localStorage.setItem("user_name", fullName);
        }
        localStorage.setItem("user_email", response.data.email);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };



    
    fetchPosts();
  }, []);






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
                  type="submit"
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
