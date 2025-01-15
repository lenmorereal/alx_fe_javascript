// API URL for the mock server
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Fetch quotes from the mock server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const quotes = await response.json();
    return quotes;  // Return the fetched quotes
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];  // Return an empty array in case of an error
  }
}

// Post a new quote to the mock server
async function postQuoteToServer(quote) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',  // Use POST method
      headers: {
        'Content-Type': 'application/json',  // Set Content-Type to application/json
      },
      body: JSON.stringify(quote),  // Convert the quote object to a JSON string
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;  // Return the new quote data (including the ID)
  } catch (error) {
    console.error('Error posting quote:', error);
    return null;  // Return null if there is an error
  }
}

// Sync quotes with the server and handle conflicts (prefer server data)
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

  // Handle conflict resolution (prefer server data)
  const updatedQuotes = serverQuotes.map((serverQuote) => {
    const localQuote = localQuotes.find((quote) => quote.id === serverQuote.id);
    return localQuote && localQuote.timestamp > serverQuote.timestamp
      ? localQuote
      : serverQuote;
  });

  localStorage.setItem('quotes', JSON.stringify(updatedQuotes));  // Update local storage
  return updatedQuotes;  // Return the synced quotes
}

// Periodically check for new quotes from the server (every 5 minutes)
setInterval(async () => {
  const quotes = await syncQuotes();
  showNotification('Quotes successfully synced');
  console.log('Quotes synchronized with the server', quotes);
}, 5 * 60 * 1000);  // 5 minutes interval

// Function to show notifications to the user
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.bottom = '10px';
  notification.style.right = '10px';
  notification.style.padding = '10px';
  notification.style.backgroundColor = 'green';
  notification.style.color = 'white';
  notification.style.borderRadius = '5px';
  document.body.appendChild(notification);

  // Remove the notification after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Fetch quotes from the server and log them (this can be triggered manually)
async function fetchQuotesManually() {
  const quotes = await fetchQuotesFromServer();
  console.log('Fetched quotes:', quotes);
}

// Manually post a new quote (example usage)
const newQuote = {
  title: 'A new quote',
  body: 'This is a new quote added through the app.',
  userId: 1,
};

async function postNewQuote() {
  const postedQuote = await postQuoteToServer(newQuote);
  if (postedQuote) {
    console.log('New quote posted:', postedQuote);
  }
}

// Manually trigger a sync (for testing purposes)
async function manualSync() {
  const syncedQuotes = await syncQuotes();
  console.log('Synced quotes:', syncedQuotes);
}
