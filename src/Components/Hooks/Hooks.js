// Hooks.js
import { IP } from '../../Constant';

export async function fetchPostData(id) {
  try {
    const response = await fetch(`${IP}/post/fetch/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching post data for ID ${id}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Define the function to fetch image data by ID
export async function fetchImageDataById(imageId) {
  try {
    // Make a fetch request to the API endpoint for the image ID
    const response = await fetch(`${IP}/file/${imageId}`);

    // Check if the response is successful
    if (!response.ok) {
      // If not successful, throw an error
      throw new Error(`Error fetching image data for ID ${imageId}`);
    }

    // If successful, parse the response as a blob
    const imageBlob = await response.blob();

    // Return the URL for the object URL representing the image blob
    return URL.createObjectURL(imageBlob);
  } catch (error) {
    // Log any errors that occur during the process
    console.error(error);
    throw error;
  }
}
