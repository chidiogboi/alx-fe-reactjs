import axios from 'axios';

// Base URL for GitHub API
const BASE_URL = 'https://api.github.com';

// Function to fetch user data by username
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};