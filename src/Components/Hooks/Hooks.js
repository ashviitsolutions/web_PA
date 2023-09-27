// Hooks.js
import { IP } from '../../Constant';

export async function fetchPostDataById(id) {
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

export async function fetchImageDataById(imageId) {
  try {
    const response = await fetch(`${IP}/file/${imageId}`);
    if (!response.ok) {
      throw new Error(`Error fetching image data for ID ${imageId}`);
    }
    const imageBlob = await response.blob();
    return URL.createObjectURL(imageBlob);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
