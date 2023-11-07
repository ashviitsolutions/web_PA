import React, { useState, useEffect } from 'react';
import Hook from '../Hook/Hook';
import { useNavigate } from 'react-router-dom';



function Setting() {
  const token = localStorage.getItem("token");
  const nav = useNavigate();
  const username = localStorage.getItem('user_name');
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState(username);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Hook.getProfile();
        setPosts(response.data);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setName(response.data.name);
        console.log('get setting', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleHandle = () => {
    setToggle(!toggle);
  };

  const isPasswordValid = () => {
    return password.length >= 8;
  };

  const handleUpdatePassword = () => {
    if (!isPasswordValid()) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }

    const data = {
      password: password,
      confirm_password: confirmPassword,
    };

    fetch('http://45.13.132.197:5000/api/user/change-pass', {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          setToggle(false);
          return response.json();
        } else {
          throw new Error('Password update failed');
        }
      })
      .then((data) => {
        setMessage('Password updated successfully');
        setPasswordError('');
        // You can perform any additional actions upon a successful update here
      })
      .catch((error) => {
        setMessage('Password update failed');
        // Handle the error or show an error message to the user
      });
  };



  const handleUpdateData = () => {


    const data = {
      name: name,
      email: email,
      phone: phone
    };

    fetch('http://45.13.132.197:5000/api/user/update', {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          setToggle(false);
          return response.json();
        } else {
          throw new Error('Password update failed');
        }
      })
      .then((data) => {
        setMessage('Password updated successfully');
        setPasswordError('');
        // You can perform any additional actions upon a successful update here
      })
      .catch((error) => {
        setMessage('Password update failed');
        // Handle the error or show an error message to the user
      });
  };

  return (
    <div id="profile_page">
      <div className="settings_form">
        <div className="gutter">
          <h3 className="profile_heading">{username}</h3>
        </div>
        <div className="gutter">
          <h3 className="small_heading">Profile Setting</h3>
        </div>

        <div className="profile_info">
          <div className="input_group">
            <label htmlFor="" className="static">
              Your Name
            </label>
            <input
              type="text"
              className="input"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <span className="highlight"></span>
          </div>
          <div className="input_group">
            <label htmlFor="" className="static">
              Your Email
            </label>
            <input
              type="email"
              value={email}
              className="input"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="highlight"></span>
          </div>
          <div className="input_group">
            <label htmlFor="" className="static">
              Your Contact Number
            </label>
            <input
              type="number"
              value={phone}
              className="input"
              required
              onChange={(e) => setPhone(e.target.value)}
            />
            <span className="highlight"></span>
          </div>
          {toggle && (
            <>
              <div className="input_group">
                <label htmlFor="" className="static">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  className="input"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="highlight"></span>
                <p className="error-message">{passwordError}</p>
              </div>
              <div className="input_group">
                <label htmlFor="" className="static">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  className="input"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className="highlight"></span>
              </div>
              <div className="input_group" >
                <button type="submit" className="button small" onClick={handleUpdatePassword}>
                  Update
                </button>
              </div>
            </>
          )}

          <div className="float_wrapper">
            <label className="static" onClick={handleHandle}>Change password</label>
            <button className="update_button" onClick={handleUpdateData}>
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
