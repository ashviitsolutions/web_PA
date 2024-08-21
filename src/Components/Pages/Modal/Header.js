import React from 'react';


const Header = ({ heading_Text, sub_Text }) => {

    return (
        <div className='Header_container'>
            <div className="row">
                <div className="gutter">
                    <div className="heading">
                        <h3 >{heading_Text}</h3>
                        <p>{sub_Text}</p>
                    </div>
                </div>
            </div>
        </div>



    );
}

export default Header;
