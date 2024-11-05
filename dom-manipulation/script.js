let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "In the end, we only regret the chances we didn't take.", category: "Regret" }
];

function showRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById('quoteDisplay').innerHTML = "No quotes available. Add a new quote to get started!";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `${quote.text} - ${quote.category}`;
}

function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        localStorage.setItem('quotes', JSON.stringify(quotes));
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        showRandomQuote();
    } else {
        alert("Please enter both a quote and a category.");
    }
}

function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    const inputText = document.createElement('input');
    const inputCategory = document.createElement('input');
    const addButton = document.createElement('button');
    inputText.id = 'newQuoteText';
    inputText.type = 'text';
    inputText.placeholder = 'Enter a new quote';
    inputCategory.id = 'newQuoteCategory';
    inputCategory.type = 'text';
    inputCategory.placeholder = 'Enter quote category';
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote;
    formContainer.appendChild(inputText);
    formContainer.appendChild(inputCategory);
    formContainer.appendChild(addButton);
    document.body.appendChild(formContainer);
}

function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    if (storedQuotes.length > 0) {
        quotes = storedQuotes;
    }
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    createAddQuoteForm();
    showRandomQuote();
});
// Function to save quotes array to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Load quotes from Local Storage when the page loads
function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    if (storedQuotes.length > 0) {
        quotes = storedQuotes;
    }
}

// Modify addQuote function to include saveQuotes
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        saveQuotes(); // Save to local storage
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        displayRandomQuote();
    } else {
        alert("Please enter both a quote and a category.");
    }
}

// Optional: Use Session Storage to store the last displayed quote
function saveLastViewedQuote(quote) {
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
}

// Function to display a random quote and save it in session storage
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.textContent = `${quote.text} - ${quote.category}`;
    saveLastViewedQuote(quote); // Save to session storage
}
// Function to export quotes array as a JSON file
function exportToJson() {
    const dataStr = JSON.stringify(quotes, null, 2); // Pretty-print JSON
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Add event listener to the export button
document.getElementById('exportButton').addEventListener('click', exportToJson);
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];

    // Clear existing options
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    // Add categories to dropdown
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    // Save selected category in local storage
    localStorage.setItem('selectedCategory', selectedCategory);

    const filteredQuotes = selectedCategory === 'all'
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);

    // Display filtered quotes
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = ''; // Clear previous quotes

    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement('p');
        quoteElement.textContent = `${quote.text} - ${quote.category}`;
        quoteDisplay.appendChild(quoteElement);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();              // Load saved quotes
    populateCategories();      // Populate categories in filter
    const savedCategory = localStorage.getItem('selectedCategory') || 'all';
    document.getElementById('categoryFilter').value = savedCategory;
    filterQuotes();            // Apply filter based on saved category
});
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        
        quotes.push(newQuote);
        localStorage.setItem('quotes', JSON.stringify(quotes));

        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        populateCategories();  // Refresh categories in filter
        filterQuotes();        // Reapply current filter to include new quote
    } else {
        alert("Please enter both a quote and a category.");
    }
}
