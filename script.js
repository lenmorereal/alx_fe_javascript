// Array to hold quotes with text and category
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "Success is not final; failure is not fatal: It is the courage to continue that counts.", category: "Success" }
];

// Function to show a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Display the selected quote
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><em>- Category: ${randomQuote.category}</em></p>`;
}

// Event listener for "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
// Function to add a new quote based on user input
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;

    // Check for non-empty input
    if (quoteText && quoteCategory) {
        // Create a new quote object
        const newQuote = { text: quoteText, category: quoteCategory };
        
        // Add the new quote to the array
        quotes.push(newQuote);
        
        // Clear the input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        // Optionally, show a confirmation message
        document.getElementById('quoteDisplay').innerHTML = `<p>New quote added! Click "Show New Quote" to view it.</p>`;
    } else {
        // Show an error if input is incomplete
        document.getElementById('quoteDisplay').innerHTML = `<p>Please enter both a quote and a category.</p>`;
    }
}
