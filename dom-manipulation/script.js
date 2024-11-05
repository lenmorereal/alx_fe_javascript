// Array to store quotes with their text and category
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "In the end, we only regret the chances we didn't take.", category: "Regret" }
];

// Function to display a random quote from the quotes array
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Display the selected quote in the quoteDisplay element
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.textContent = `${quote.text} - ${quote.category}`;
}

// Function to add a new quote from user input to the quotes array and update the DOM
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    // Check if both text and category are provided
    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        
        // Add the new quote to the quotes array
        quotes.push(newQuote);
        
        // Update local storage to persist the new quote
        localStorage.setItem('quotes', JSON.stringify(quotes));

        // Clear the form fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        // Optionally, display the new quote immediately
        displayRandomQuote();
    } else {
        alert("Please enter both a quote and a category.");
    }
}

// Function to create the form for adding new quotes
function createAddQuoteForm() {
    // Create form elements
    const formContainer = document.createElement('div');
    const inputText = document.createElement('input');
    const inputCategory = document.createElement('input');
    const addButton = document.createElement('button');

    // Set attributes and placeholder texts
    inputText.id = 'newQuoteText';
    inputText.type = 'text';
    inputText.placeholder = 'Enter a new quote';
    
    inputCategory.id = 'newQuoteCategory';
    inputCategory.type = 'text';
    inputCategory.placeholder = 'Enter quote category';
    
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote; // Set the onclick event to call addQuote function

    // Append elements to the form container
    formContainer.appendChild(inputText);
    formContainer.appendChild(inputCategory);
    formContainer.appendChild(addButton);

    // Append the form container to the DOM
    document.body.appendChild(formContainer);
}

// Load quotes from Local Storage when the page loads
function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    if (storedQuotes.length > 0) {
        quotes = storedQuotes;
    }
}

// Event listener for the “Show New Quote” button
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);

// Initialize application on page load
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();        // Load any saved quotes from Local Storage
    createAddQuoteForm(); // Create the form to add new quotes
    displayRandomQuote(); // Display a random quote on page load
});
