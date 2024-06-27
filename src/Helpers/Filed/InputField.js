import React from "react";

const InputField = ({ label, inputdata, id, placeholder, Press, name, type, required }) => (
    <div className="form-group">
        <label htmlFor={id} className="form-label">
            {label}
        </label>
        {type === 'file' ? (
            <input
                id={id}
                name={name}
                className="input"
                type={type}
                onChange={Press}
                required={required}
            />
        ) : (
            <input
                id={id}
                className="input"
                name={name}
                type={type}
                value={inputdata}
                onChange={Press}
                placeholder={placeholder}
                required={required}
            />
        )}
    </div>
);




export default InputField;
