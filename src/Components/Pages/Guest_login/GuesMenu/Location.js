
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useNavigate } from 'react-router-dom';
import LocationIcon from '../../../assets/img/crosshair.svg';

function Location() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });

  const handleSelect = async (value) => {
    try {
      const results = await geocodeByAddress(value);
      const ll = await getLatLng(results[0]);
      setAddress(value);
      setCoordinates(ll);
    } catch (error) {
      console.error("Error selecting location:", error);
    }
  }

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          try {
            const results = await geocodeByAddress(`${latLng.lat},${latLng.lng}`);
            const address = results[0].formatted_address;

            setAddress(address);
            setCoordinates(latLng);
          } catch (error) {
            console.error("Error getting current location:", error);
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      address: address,
      location: {
        type: 'Point',
        coordinates: [coordinates.lat, coordinates.lng],
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
                  value={address}
                  onChange={setAddress}
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
                {/*  
                <button
                  className="button"
                  style={{ padding: '8px', marginTop: '10px' }}
                  type="button"
                  onClick={handleGetCurrentLocation}
                >
                  Use Current Location
                </button>
                    */}
                    <p onClick={handleGetCurrentLocation} className='useLocation'><img src={LocationIcon} alt='location' height={15} /> Use my current Location</p>
                    
              </div>
              <div className="input_group">
                <button
                  className="button"
                  style={{ paddingTop: '11px' }}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Continue
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



















