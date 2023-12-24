import React, { useState, useEffect } from 'react';
import { IP } from '../../../Constant';
import { Link } from 'react-router-dom';
function Faq() {
  const postIds = [
    '640c174fff3c39ffa38ee85c',
    '640c176dff3c39ffa38ee870',
    '640c17ddff3c39ffa38ee8ca',
    '640c17e0ff3c39ffa38ee8d4',
  ];

  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState([]);

  useEffect(() => {
    async function fetchusers() {
      const responses = await Promise.all(
        postIds.map(async (id) => {
          const res = await fetch(`${IP}/post/fetch/${id}`);
          return res.json();
        })
      );
      setUsers(responses);
      setToggle(
        Array.from({ length: responses.length }, (_, i) => i === 9)
      ); // Initialize toggle state array
    }
    fetchusers();
  }, []);

  const handleToggle = (index) => {
    setToggle((prev) => {
      const newToggle = [...prev];
      newToggle[index] = !newToggle[index];
      return newToggle;
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="heading content mt-5 " id="faqtext">
            <h3>
              FAQ<small>(s)</small>{' '}
            </h3>
            <p>Feel free to provide more specific details or questions you'd like to include in the FAQ section!</p>
          </div>
        </div>
        <div className="row">
          <div id="faq_page" className="card layer1">
            {users.map((curElem, index) => (
              <div
                className="faq"
                key={curElem.id}

                onClick={() => handleToggle(index)}
              >
                <div style={{ display: 'flex' }} className="question">
                  <span className="buttonplus">
                    {toggle[index] ? '-' : '+'}
                  </span>
                  <h6 id="faqitem">{curElem.title}</h6>
                </div>

                <div id="ans" className="answer">
                  {toggle[index] && (
                    <div id="ans" className="answer">
                      <p dangerouslySetInnerHTML={{ __html: curElem.description }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>





        </div>
      </div>

      <div className='faqbutton'>
        <Link to="/faqpage">
          <button id="memershipbuttons" className="button">View More</button>
        </Link>

      </div>
    </>
  );
}

export default Faq;
