import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useNavigate, useLocation } from 'react-router-dom';
import LocationIcon from '../../../assets/img/crosshair.svg';

function Location() {
  const location = useLocation();
  const locationType = location.state?.location?.location_type || "";
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage("");
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

    if (!address) {
      setErrorMessage("Please fill the address");
      return;
    } else {
      setErrorMessage("");
    }

    const config = {
      address: address,
      location: {
        type: 'Point',
        coordinates: [coordinates.lat, coordinates.lng],
      },
    };

    nav(`/book`, { state: { locationForm: config, location_type: locationType } });
  };

  console.log("locationType", locationType);

  return (
    <>
      <div id="over_banner">
        <div className="container">
          <div className="row">
            <form className="location card layer1">
              <h3>Where would you like our provider to meet you?</h3>
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

                <p onClick={handleGetCurrentLocation} className='useLocation'>
                  <img src={LocationIcon} alt='location' height={20} /> Use my current location
                </p>
              </div>
              <div className="error-message">{errorMessage}</div>
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
              <a className='small' href='/'>&larr; Back to Home</a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Location;
