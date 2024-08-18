import React from 'react';

const Card = ({ user, image, index, isActive, onReadMoreClick, onViewMoreClick }) => {
  return (
    <div className="item_wrapper">
      <div className="item">
        <div
          className="bg"
          style={{
            backgroundImage: `url(${image})`,
            borderRadius: '7px',
            height: '200px', // Fixed height for consistency
            backgroundSize: 'cover', // Ensure image covers the area
            backgroundPosition: 'center', // Center the image
          }}
        ></div>
        <div className="content">
          <h3>{user.title}</h3>
          <p dangerouslySetInnerHTML={{
            __html: user.description ? (
              isActive
                ? user.description
                : user.description.slice(0, 200) + (user.description.length > 180 ? "...." : "")
            ) : ''
          }} />
          <button onClick={onReadMoreClick} className="Read_More">
            {isActive ? 'Show less' : 'Read more'}
          </button>
          <button className="button small" onClick={onViewMoreClick}>
                      View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
