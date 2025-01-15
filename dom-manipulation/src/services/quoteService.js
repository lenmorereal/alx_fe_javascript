// src/services/quoteService.js
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchQuotes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const postQuote = async (quote) => {
  const response = await axios.post(API_URL, quote);
  return response.data;
};
