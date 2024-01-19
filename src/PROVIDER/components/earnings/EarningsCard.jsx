import React from "react";

const EarningsCard = (props) => {
  return (
    <div className="col-md-12 col-lg-6 mb-6">
       <div
         className="shadow-sm earning-income-card card text-center"
       >
         <div className="earning-label">{props.label}</div>
         <div
           className="earning-amt text-primary"
         >
           ${props.amt}
         </div>
       </div>
    </div>
  );
};

export default EarningsCard;
