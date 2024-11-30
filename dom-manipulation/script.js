// Initialize quotes array and load from local storage if available
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Function to load quotes into the DOM
function loadQuotes() {
    const quotesContainer = document.getElementById('quotes-container');
    quotesContainer.innerHTML = ''; // Clear previous quotes

    if (quotes.length === 0) {
        quotesContainer.innerHTML = '<p>No quotes available. Please add some quotes.</p>';
        return;
    }

    quotes.forEach((quote, index) => {
        const quoteElement = document.createElement('div');
        quoteElement.classList.add('quote');
        quoteElement.innerHTML = `
            <p>${quote}</p>
            <button onclick="viewQuote(${index})">View</button>
            <button onclick="deleteQuote(${index})">Delete</button>
        `;
        quotesContainer.appendChild(quoteElement);
    });
}

// Function to add a new quote
function addQuote() {
    const newQuote = document.getElementById('new-quote').value;
    if (newQuote) {
        quotes.push(newQuote);
        localStorage.setItem('quotes', JSON.stringify(quotes));
        document.getElementById('new-quote').value = ''; // Clear the input
        loadQuotes();
    } else {
        alert('Please enter a quote');
    }
}

// Function to delete a quote
function deleteQuote(index) {
    quotes.splice(index, 1); // Remove the quote at the specified index
    localStorage.setItem('quotes', JSON.stringify(quotes)); // Save updated quotes
    loadQuotes();
}

// Function to view a quote (saving the last viewed quote in session storage)
function viewQuote(index) {
    const quote = quotes[index];
    sessionStorage.setItem('lastViewedQuote', quote); // Save the last viewed quote
    alert(`You are viewing: ${quote}`);
}

// Function to export quotes as a JSON file
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

// Function to import quotes from a JSON file
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

// Check for any saved last viewed quote in session storage
function displayLastViewedQuote() {
    const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastViewedQuote) {
        alert(`Your last viewed quote: ${lastViewedQuote}`);
    }
}

// Initialize the page by loading quotes and displaying the last viewed quote
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    displayLastViewedQuote();

    // Attach event listener for adding a new quote
    document.getElementById('add-quote').addEventListener('click', addQuote);
    document.getElementById('import-quotes').addEventListener('change', importFromJsonFile);
});
