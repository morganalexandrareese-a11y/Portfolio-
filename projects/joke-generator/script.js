const getJokeBtn = document.getElementById('get-joke-btn');
const copyBtn = document.getElementById('copy-btn');
const jokeContent = document.getElementById('joke-content');
const jokeType = document.getElementById('joke-type');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const successDiv = document.getElementById('success');

let currentJoke = null;

// Fetch joke from API
async function fetchJoke() {
    try {
        // Reset UI
        errorDiv.classList.add('hidden');
        successDiv.classList.add('hidden');
        loadingDiv.classList.remove('hidden');
        getJokeBtn.disabled = true;
        copyBtn.disabled = true;

        // Fetch from Official Joke API
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }

        const data = await response.json();
        
        // Format the joke
        let jokeText = data.setup ? `${data.setup}\n\n${data.punchline}` : data.joke;
        
        currentJoke = jokeText;
        
        // Display joke
        jokeContent.innerHTML = `<p>${jokeText.replace(/\n/g, '<br>')}</p>`;
        jokeType.textContent = `Type: ${data.type}`;
        
        loadingDiv.classList.add('hidden');
        getJokeBtn.disabled = false;
        copyBtn.disabled = false;

    } catch (error) {
        console.error('Error:', error);
        errorDiv.textContent = '😞 Oops! Failed to load a joke. Please try again!';
        errorDiv.classList.remove('hidden');
        loadingDiv.classList.add('hidden');
        getJokeBtn.disabled = false;
    }
}

// Copy joke to clipboard
function copyToClipboard() {
    if (!currentJoke) return;
    
    navigator.clipboard.writeText(currentJoke).then(() => {
        successDiv.classList.remove('hidden');
        
        // Hide success message after 2 seconds
        setTimeout(() => {
            successDiv.classList.add('hidden');
        }, 2000);
    }).catch(() => {
        alert('Failed to copy joke');
    });
}

// Event listeners
getJokeBtn.addEventListener('click', fetchJoke);
copyBtn.addEventListener('click', copyToClipboard);

// Load a joke on page load
window.addEventListener('load', fetchJoke);

console.log('Joke Generator loaded successfully!');