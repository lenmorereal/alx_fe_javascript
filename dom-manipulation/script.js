// script.js
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

async function fetchQuotesFromServer() {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return []; // Return an empty array in case of an error
  }
}

export default fetchQuotesFromServer;
