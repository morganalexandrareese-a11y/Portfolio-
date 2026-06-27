const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const tweetBtn = document.getElementById('tweet-btn');
const copyBtn = document.getElementById('copy-btn');
const successMsg = document.getElementById('success');

let currentQuote = '';
let currentAuthor = '';

async function fetchQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        
        currentQuote = data.content;
        currentAuthor = data.author.split(',')[0];
        
        quoteText.textContent = `"${currentQuote}"`;
        quoteAuthor.textContent = `— ${currentAuthor}`;
        
        tweetBtn.href = `https://twitter.com/intent/tweet?text="${currentQuote}" — ${currentAuthor}`;
    } catch (error) {
        quoteText.textContent = 'Failed to load quote. Try again!';
    }
}

newQuoteBtn.addEventListener('click', fetchQuote);

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(`"${currentQuote}" — ${currentAuthor}`).then(() => {
        successMsg.classList.remove('hidden');
        setTimeout(() => {
            successMsg.classList.add('hidden');
        }, 2000);
    });
});

// Load quote on page load
window.addEventListener('load', fetchQuote);