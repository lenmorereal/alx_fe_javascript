// script.js

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

async function fetchQuotesFromServer() {
  try {
    const response = await fetch(API_URL);  // Fetch the data from the server
    if (!response.ok) {  // Check if the response is successful
      throw new Error('Network response was not ok');
    }
    const data = await response.json();  // Parse the response as JSON
    return data;  // Return the fetched data
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];  // Return an empty array in case of an error
  }
}

export default fetchQuotesFromServer;
