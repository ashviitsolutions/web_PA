import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header({ startDate,
  endDate,
  setStartDate,
  setEndDate,
  searchText,
  setSearchText,
  nav,
  type,
  selectedType,
  setSelectedType,
  title,
  btn_name,
  infor,
  sub_title,
  searchField }) {

  const navigateback = useNavigate()


  return (
    <div className="row">
      <div className="">
        <div className="headings float_wrapper">
          <div className="gutter pull-left">

            <h3>
              <span className='cursor title backarrow' onClick={() => navigateback(-1)}>&larr;</span>{title}
            </h3>
            <p>{sub_title}</p>
          </div>
          {infor && (
            <div className="headings">
              <div className="gutter pull-right">
                <small className='sub'>
                  <p>{infor?.para1}</p>
                  <p>{infor?.para2}</p>
                  <p>{infor?.para3}</p>
                </small>
              </div>
              <span className="toggle_sidebar"></span>
            </div>
          )}

          {
            btn_name && (
              <>
                <div className="gutter pull-left">
                  <Link to={nav}>
                    <button className="button small primary" type="button" name="button">{btn_name}</button>
                  </Link>
                </div>
                <span className="toggle_sidebar"></span>
              </>
            )
          }

        </div>
      </div>
      <div className="row">
        <div className="gutter">
          <div className="card layer1 filters">
            {/* Render select dropdown if `type` is provided */}
            {type && type.length > 0 && (
              <div className="input_group">
                <select
                  id="select-type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="input"

                >
                  <option value="">Select Type</option>
                  {type.map((cur) => (
                    <option key={cur._id} value={cur._id}>
                      {cur.name}
                    </option>
                  ))}
                </select>
                <span className="highlight"></span>
              </div>
            )}

            {/* Render date inputs if `startDate` or `endDate` is provided */}
            {(startDate || endDate) && (
              <>
                <span className="highlight"> from </span>
                <div className="input_group">
                  <input
                    type="date"
                    className="input"
                    placeholder="Start Date"
                    onChange={e => setStartDate(e.target.value)}
                    value={startDate}
                  />
                  <span className="highlight"></span>
                </div>
                <span className="highlight"> to </span>
                <div className="input_group">
                  <input
                    type="date"
                    className="input"
                    placeholder="End Date"
                    onChange={e => setEndDate(e.target.value)}
                    value={endDate}
                  />
                  <span className="highlight"></span>
                </div>
              </>
            )}

            {/* Render search input if `searchText` is provided */}
            {searchField && (
              <div className="input_group pull-right" style={{ maxWidth: "20%" }}>
                <input
                  type="text"
                  className="input"
                  placeholder="Search here..."
                  onChange={e => setSearchText(e.target.value)}
                  value={searchText}
                />
                <span className="highlight"></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
