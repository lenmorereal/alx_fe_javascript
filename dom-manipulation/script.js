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
