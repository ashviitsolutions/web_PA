import React from 'react';


const Header = ({ title, searchTerm, onSearchChange, iconsImgs, navigation }) => {


  return (
    <div className="main-header">
      <h3 className="grid-c-title-text">{title}</h3>
      <div className="header-right">
        <input
          type="text"
          className="search-box"
          placeholder="Search..."
          value={searchTerm}
          onChange={onSearchChange}

        />

        {
          iconsImgs ? (
            <button className="grid-c-title-icon" onClick={navigation}>
              <img src={iconsImgs} alt="Add" />
            </button>
          ) : null
        }


      </div>
    </div>
  );
};

export default Header;
