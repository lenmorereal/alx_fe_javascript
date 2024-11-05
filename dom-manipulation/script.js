// Initial quotes array loaded from local storage or empty
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Display a random quote on the page
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.textContent = quotes[randomIndex]?.text || 'No quotes available.';
}

// Populate category dropdown based on unique categories in quotes
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];

    // Clear existing options
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter quotes by selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all' 
        ? quotes 
        : quotes.filter(quote => quote.category === selectedCategory);

    // Display filtered quotes or message if no quotes match
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (filteredQuotes.length) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        quoteDisplay.textContent = filteredQuotes[randomIndex].text;
    } else {
        quoteDisplay.textContent = 'No quotes available for this category.';
    }
}

// Add a new quote to quotes array and update storage
function addQuote(text, category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    displayRandomQuote();
    populateCategories();
    postQuoteToServer(newQuote);  // Sync with server
}

// Post new quote to the server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: quote.text,
                body: quote.category,
                userId: 1
            })
        });
        const result = await response.json();
        console.log('Quote posted to server:', result);
    } catch (error) {
        console.error('Error posting quote to server:', error);
    }
}

// Sync quotes with server data periodically
async function syncQuotes() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const serverQuotes = await response.json();

        // Convert server response to match local format
        const parsedQuotes = serverQuotes.map(item => ({
            text: item.title,
            category: 'General' // Placeholder category
        }));

        resolveConflicts(parsedQuotes);
    } catch (error) {
        console.error('Error syncing quotes from server:', error);
    }
}

// Resolve conflicts between server and local data
function resolveConflicts(serverQuotes) {
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

    // Merge quotes, giving precedence to server data
    const mergedQuotes = [...serverQuotes, ...localQuotes.filter(localQuote =>
        !serverQuotes.some(serverQuote => serverQuote.text === localQuote.text)
    )];

    // Update local storage and display with resolved quotes
    localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
    quotes = mergedQuotes;
    displayRandomQuote();
    populateCategories();
    notifyUser('Quotes have been updated from the server.');
}

// Periodically sync quotes from the server
function setupPeriodicSync() {
    setInterval(syncQuotes, 300000); // 300000 ms = 5 minutes
}

// Notify user of updates or conflicts
function notifyUser(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'notification'; // Style in CSS for visibility
    document.body.appendChild(notification);

    // Remove notification after a few seconds
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        localStorage.setItem('quotes', JSON.stringify(quotes));
        displayRandomQuote();
        populateCategories();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Export quotes to a JSON file
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    link.click();
    URL.revokeObjectURL(url);
}

// Initialize the application on page load
document.addEventListener('DOMContentLoaded', () => {
    displayRandomQuote();      // Display a random quote initially
    populateCategories();      // Populate category filter
    setupPeriodicSync();       // Start periodic server syncing

    // Event listeners for importing/exporting quotes
    document.getElementById('exportButton').addEventListener('click', exportToJsonFile);
    document.getElementById('importFile').addEventListener('change', importFromJsonFile);

    // Event listener for adding a new quote
    document.getElementById('addQuoteForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const quoteText = document.getElementById('quoteText').value;
        const quoteCategory = document.getElementById('quoteCategory').value;
        addQuote(quoteText, quoteCategory);
    });
});
// Fetch quotes from a mock API
async function fetchQuotesFromServer() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data; // Adjust based on your expected quote structure
}

// Post a new quote to the mock API
async function postQuoteToServer(quote) {
    await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(quote)
    });
}

// Sync local quotes with server
async function syncQuotes() {
    const serverQuotes = await fetchQuotesFromServer();
    // Logic to update local storage with server quotes
}

// Set an interval to check for new quotes
setInterval(syncQuotes, 60000);

// Notify user about updates
function notifyUserAboutUpdate() {
    alert('Data has been updated from the server!');
}

// Initialization logic
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes(); // Load local quotes
    syncQuotes(); // Sync with server
});
