// PreviewImage.jsx
import React, { useState, useEffect } from 'react';
import { IP } from "../../../../Constant";
const PreviewImage = ({ attachments }) => {
    const [imageObjectURL, setImageObjectURL] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await fetch(`${IP}/file/${attachments}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch image');
                }

                const imageBlob = await res.blob();
                const objectURL = URL.createObjectURL(imageBlob);
                setImageObjectURL(objectURL);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [attachments]);

    if (!imageObjectURL) {
        // You might want to return some loading state here
        return <p>Loading...</p>;
    }

    return <img className="book-image" src={imageObjectURL} alt="Book Cover" />;
};

export default PreviewImage;
