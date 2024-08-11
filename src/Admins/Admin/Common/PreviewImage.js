import React, { useState, useEffect } from 'react';
import { IP } from '../../../Constant';

function PreviewImage({ attachments, className }) {
    const [imageObjectURL, setImageObjectURL] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await fetch(`${IP}/file/${attachments}`);
                const imageBlob = await res.blob();
                const objectURL = URL.createObjectURL(imageBlob);
                setImageObjectURL(objectURL);
            } catch (error) {
                console.error("Error fetching the image:", error);
            }
        };

        fetchImage();
    }, [attachments]);

    return (
        <div className={className}>
            {imageObjectURL ? (
                <img src={imageObjectURL} alt="Preview" className="previewimage" />
            ) : (
                <div>No image available</div>
            )}
        </div>
    );
}

export default PreviewImage;
