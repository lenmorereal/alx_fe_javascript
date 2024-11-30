// Quotes Array (initialize from localStorage if available)
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Load Quotes on Initialization
window.onload = () => {
    loadQuotes();
    const lastQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastQuote) {
        displayQuote(lastQuote);
    }
};

// Display a Quote
function displayQuote(quote) {
    const quoteDisplay = document.getElementById('quote-display');
    quoteDisplay.textContent = quote;
    sessionStorage.setItem('lastViewedQuote', quote); // Save to session storage
}

// Show a Random Quote
function showRandomQuote() {
    if (quotes.length === 0) {
        alert('No quotes available. Add some quotes first.');
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    displayQuote(quotes[randomIndex]);
}

// Add a New Quote
function addNewQuote() {
    const newQuoteInput = document.getElementById('new-quote');
    const newQuote = newQuoteInput.value.trim();
    if (!newQuote) {
        alert('Please enter a valid quote.');
        return;
    }
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes)); // Save to local storage
    newQuoteInput.value = ''; // Clear input
    loadQuotes();
}

// Load Quotes into the Quotes Container
function loadQuotes() {
    const quotesContainer = document.getElementById('quotes-container');
    quotesContainer.innerHTML = '';
    quotes.forEach((quote, index) => {
        const quoteItem = document.createElement('div');
        quoteItem.textContent = `${index + 1}: ${quote}`;
        quotesContainer.appendChild(quoteItem);
    });
}

// Export Quotes to JSON File
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Import Quotes from JSON File
function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importedQuotes = JSON.parse(e.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes = quotes.concat(importedQuotes);
                localStorage.setItem('quotes', JSON.stringify(quotes));
                loadQuotes();
            } else {
                alert('Invalid JSON file. Please upload a valid quotes file.');
            }
        } catch (error) {
            alert('Error reading file. Please check the file format.');
        }
    };
    reader.readAsText(file);
}
