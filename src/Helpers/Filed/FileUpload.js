import React from "react";

const FileUpload = ({ label, Press, name, id, type }) => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        className="form-input"
        id={id}
        name={name}
        onChange={Press}
      />
    </div>
  );
};

export default FileUpload;
