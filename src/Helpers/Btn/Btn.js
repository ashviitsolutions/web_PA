import React from 'react';

const FileUpload = ({ Press, title }) => {
    return (
        <button type="submit" className="button"  onClick={Press}>{title}</button>
    );
};

export default FileUpload;
