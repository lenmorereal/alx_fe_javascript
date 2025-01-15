// src/utils/syncQuotes.js
import { fetchQuotes } from '../services/quoteService';

const syncQuotesWithServer = async () => {
  const serverQuotes = await fetchQuotes();
  const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
  
  const mergedQuotes = mergeQuotes(localQuotes, serverQuotes);
  localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
};

const mergeQuotes = (local, server) => {
  // Simple conflict resolution: server data takes precedence
  return server;
};

export default syncQuotesWithServer;
