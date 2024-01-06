// UserFetcher.js
import { useEffect, useState } from 'react';
import { IP } from '../../../Constant';

async function fetchUserData(postId) {
    try {
        const res = await fetch(`${IP}/post/fetch/${postId}`);
        if (!res.ok) {
            throw new Error(`Error fetching user data for post ${postId}`);
        }
        const data = await res.json();
        return await data;
    } catch (error) {
        console.error('Error in fetchUserData:', error.message);
        throw error; // Re-throw the error to handle it at a higher level if needed
    }
}

export { fetchUserData };
