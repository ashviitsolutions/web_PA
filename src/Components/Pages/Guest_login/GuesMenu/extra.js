// import React from 'react';
// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateInputData } from '../../Redux/counterSlice';
// import { useNavigate } from 'react-router-dom';
// import Hook from '../../Profile/Hook/Hook';


// function Location() {
//   const [name, setName] = useState("");
//   const [latitude, setLatitude] = useState()
//   const [longitude, setLongitude] = useState()
//   // Use useSelector with the correct selector to get the formData
//   const formData = useSelector((state) => state.counter.formData);
//   console.log(formData);

//   const dispatch = useDispatch();
//   const nav = useNavigate();
//   const [Input, setInput] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const config = {
//       location: {
//         type: 'Point',
//         coordinates: [latitude, longitude],
//       },
//     };

//     // Dispatch the updateInputData action with the Input value
//     dispatch(updateInputData({ formName: 'locationForm', inputData: config }));


//     setTimeout(() => {
//       nav("/book");

//     }, 2000)
//   };




//   //Get lattituide
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       setLatitude(position.coords.latitude)
//       setLongitude(position.coords.longitude)
//       console.log("latitide", position.coords.latitude)
//       console.log("longitude", position.coords.longitude)
//     })


//   }, [])









//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await Hook.getProfile();
//         console.log("profile view", response)
//         if (response.data.name) {
//           setName(response.data.name);
//           localStorage.setItem("user_name", response.data.name);
//         } else {
//           const fullName = `${response.data.first_name} ${response.data.last_name}`;
//           setName(fullName);
//           localStorage.setItem("user_name", fullName);
//         }
//         localStorage.setItem("user_email", response.data.email);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };




//     fetchPosts();
//   }, []);






//   return (
//     <>
//       <div id="over_banner">
//         <div className="container">
//           <div className="row">
//             <form className="location card layer1">

//               <h3>Where would you like our provider to meet you.</h3>
//               <div className="input_group">
//                 <input
//                   className="input"
//                   type="text"
//                   onChange={(e) => setInput(e.target.value)}
//                   value={Input}
//                   placeholder="Search for an address here..."
//                 />
//               </div>
//               <div className="input_group">
//                 <button
//                   className="button"
//                   style={{ paddingTop: '11px' }}
//                   type="submit"
//                   onClick={handleSubmit}
//                 >
//                   continue
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Location;


// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateInputData } from '../../Redux/counterSlice';
// import { useNavigate } from 'react-router-dom';
// import Hook from '../../Profile/Hook/Hook';
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

// function Location() {
//   const [name, setName] = useState("");
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const formData = useSelector((state) => state.counter.formData);
//   const dispatch = useDispatch();
//   const nav = useNavigate();
//   const [Input, setInput] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const config = {
//       location: {
//         type: 'Point',
//         coordinates: [latitude, longitude],
//       },
//     };

//     dispatch(updateInputData({ formName: 'locationForm', inputData: config }));

//     setTimeout(() => {
//       nav("/book");
//     }, 2000);
//   };

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       setLatitude(position.coords.latitude);
//       setLongitude(position.coords.longitude);
//       console.log("latitude", position.coords.latitude);
//       console.log("longitude", position.coords.longitude);
//     }, (error) => {
//       console.error("Error getting user's location:", error);
//     });
//   }, []);



//   const handleSelect = async (value) => {
//     console.log("value", value);
//     try {
//       navigator.geolocation.getCurrentPosition((position) => {
//         setLatitude(position.coords.latitude);
//         setLongitude(position.coords.longitude);
//         console.log("latitude", position.coords.latitude);
//         console.log("longitude", position.coords.longitude);
//       }, (error) => {
//         console.error("Error getting user's location:", error);
//       });
//     } catch (error) {
//       console.error("Error geocoding the selected location:", error);
//     }
//   };

//   return (
//     <>
//       <div id="over_banner">
//         <div className="container">
//           <div className="row">
//             <form className="location card layer1">
//               <h3>Where would you like our provider to meet you.</h3>
//               <div className="input_group">
//                 <PlacesAutocomplete
//                   value={Input}
//                   onChange={(e) => setInput(e)}
//                   onSelect={handleSelect}
//                 >
//                   {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//                     <div>
//                       <input
//                         className="input"
//                         {...getInputProps()}
//                         placeholder="Search for an address here..."
//                       />
//                       <div>
//                         {loading ? <div>Loading...</div> : null}
//                         {suggestions.map((suggestion) => {
//                           const style = {
//                             backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
//                           };
//                           return (
//                             <div {...getSuggestionItemProps(suggestion, { style })}>
//                               {suggestion.description}
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   )}
//                 </PlacesAutocomplete>
//               </div>
//               <div className="input_group">
//                 <button
//                   className="button"
//                   style={{ paddingTop: '11px' }}
//                   type="submit"
//                   onClick={handleSubmit}
//                 >
//                   continue
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Location;

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateInputData } from '../../Redux/counterSlice';
// import { useNavigate } from 'react-router-dom';
// import Hook from '../../Profile/Hook/Hook';
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

// function Location() {
//   const [name, setName] = useState("");
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const formData = useSelector((state) => state.counter.formData);
//   const dispatch = useDispatch();
//   const nav = useNavigate();
//   const [Input, setInput] = useState('');



//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       setLatitude(position.coords.latitude);
//       setLongitude(position.coords.longitude);
//       console.log("latitude", position.coords.latitude);
//       console.log("longitude", position.coords.longitude);
//     }, (error) => {
//       console.error("Error getting user's location:", error);
//     });
//   }, []);



//   const handleSelect =() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       setLatitude(position.coords.latitude);
//       setLongitude(position.coords.longitude);
//       console.log("latitude", position.coords.latitude);
//       console.log("longitude", position.coords.longitude);
//     }, (error) => {
//       console.error("Error getting user's location:", error);
//     });
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const config = {
//       location: {
//         type: 'Point',
//         coordinates: [latitude, longitude],
//       },
//     };

//     dispatch(updateInputData({ formName: 'locationForm', inputData: config }));

//     setTimeout(() => {
//       nav("/book");
//     }, 2000);
//   };




//   return (
//     <>
//       <div id="over_banner">
//         <div className="container">
//           <div className="row">
//             <form className="location card layer1">
//               <h3>Where would you like our provider to meet you.</h3>
//               <div className="input_group">
//                 <PlacesAutocomplete
//                   value={Input}
//                   onChange={(e) => setInput(e)}
//                   onSelect={handleSelect}
//                 >
//                   {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//                     <div>
//                       <input
//                         className="input"
//                         {...getInputProps()}
//                         placeholder="Search for an address here..."
//                       />
//                       <div>
//                         {loading ? <div>Loading...</div> : null}
//                         {suggestions.map((suggestion) => {
//                           const style = {
//                             backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
//                           };
//                           return (
//                             <div {...getSuggestionItemProps(suggestion, { style })}>
//                               {suggestion.description}
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   )}
//                 </PlacesAutocomplete>
//               </div>
//               <div className="input_group">
//                 <button
//                   className="button"
//                   style={{ paddingTop: '11px' }}
//                   type="submit"
//                   onClick={handleSubmit}
//                 >
//                   continue
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Location;


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice';
import { useNavigate } from 'react-router-dom';
import Hook from '../../Profile/Hook/Hook';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

function Location() {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const formData = useSelector((state) => state.counter.formData);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [Input, setInput] = useState('');



  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log("latitude", position.coords.latitude);
      console.log("longitude", position.coords.longitude);
    }, (error) => {
      console.error("Error getting user's location:", error);
    });
  }, []);



  const handleSelect =() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log("latitude", position.coords.latitude);
      console.log("longitude", position.coords.longitude);
    }, (error) => {
      console.error("Error getting user's location:", error);
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      location: {
        type: 'Point',
        coordinates: [latitude, longitude],
      },
    };

    dispatch(updateInputData({ formName: 'locationForm', inputData: config }));

    setTimeout(() => {
      nav("/book");
    }, 2000);
  };




  return (
    <>
      <div id="over_banner">
        <div className="container">
          <div className="row">
            <form className="location card layer1">
              <h3>Where would you like our provider to meet you.</h3>
              <div className="input_group">
                <PlacesAutocomplete
                  value={Input}
                  onChange={(e) => setInput(e)}
                  onSelect={handleSelect}
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                      <input
                        className="input"
                        {...getInputProps()}
                        placeholder="Search for an address here..."
                      />
                      <div>
                        {loading ? <div>Loading...</div> : null}
                        {suggestions.map((suggestion) => {
                          const style = {
                            backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                          };
                          return (
                            <div {...getSuggestionItemProps(suggestion, { style })}>
                              {suggestion.description}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
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



