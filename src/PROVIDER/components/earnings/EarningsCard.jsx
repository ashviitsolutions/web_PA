import React from "react";

const EarningsCard = (props) => {
  return (
    <div className="col-md-6 col-lg-3 mb-3">
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
