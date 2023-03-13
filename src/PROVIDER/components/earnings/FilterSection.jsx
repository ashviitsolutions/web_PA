import React from "react";
import FilterDropDown from "./FilterDropDown";

const FilterSection = () => {
  return (
   <>
    <div className="col-2">
      <FilterDropDown
      data={{data:[2021,2022,2023]}}
      type="Year"/>
    </div>
    <div className="col-2">
      <FilterDropDown
      data={{data:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']}}
      type="Month"/>
    </div>
    <div className="col-2">
      <input
        type="text"
        className="form-control"
        placeholder="Start Date"
        onChange={(e) => console.log(e.target.value)}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
      />
    </div>
    <div className="col-2">
      <input
        type="text"
        className="form-control"
        placeholder="End Date"
        onChange={(e) => console.log(e.target.value)}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
      />
    </div>
    </>
  );
};

export default FilterSection;
