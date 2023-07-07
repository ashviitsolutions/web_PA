import React, { useState, useEffect } from 'react';
import { IP } from '../../../Constant';
import ReactPaginate from 'react-paginate';

function Faq() {
//pagination
  const [data, setData] = useState(1);
  const [count, setCount] = useState(0);




  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${IP}/post/term?type=FAQ`);
        const data = await res.json();
        setUsers(data);
        setCount(data.length);
        setToggle(
          Array.from({ length: data.length }, (_, i) => i === 0)
        ); // Initialize toggle state array
       
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [data]);


  const handleToggle = (index) => {
    setToggle((prev) => {
      const newToggle = [...prev];
      newToggle[index] = !newToggle[index];
      return newToggle;
    });
  };

  
  const handlePageClick = (data) => {
    setData(data.selected + 1);
  };


  return (
    <>
      <div className="container" style={{marginTop:"4rem"}}>
        <div className="row">
          <div className="heading content mt-5 " id="faqtext">
            <h3>
              FAQ<small>(s)</small>{' '}
            </h3>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
        </div>
        
        <div className="row">
          <div id="faq_page" className="card layer1" style={{ padding: 0 }}>
            {users.map((curElem, index) => (
              <div
                className="faq"
                key={curElem.id}
                style={{ marginLeft: '10px' }}
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
                    <p  dangerouslySetInnerHTML={{ __html:curElem.description }}    />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className='pagination'  >
          <ReactPaginate
            itemsPerPage={10}
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={"..."}
            pageCount={Math.ceil(count / 10)}
            marginPagesDisplayed={3}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            // css apply on pagination
            containerClassName={'pagination justify-content-center py-3'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        </div>
        </div>
      </div>
    </>
  );
}

export default Faq;
