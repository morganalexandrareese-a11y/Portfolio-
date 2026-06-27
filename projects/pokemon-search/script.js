const pokemonInput = document.getElementById('pokemon-input');
const searchBtn = document.getElementById('search-btn');
const pokemonInfo = document.getElementById('pokemon-info');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

async function searchPokemon() {
    const pokemon = pokemonInput.value.toLowerCase().trim();
    
    if (!pokemon) {
        errorDiv.textContent = '❌ Please enter a Pokemon name or ID';
        errorDiv.classList.remove('hidden');
        return;
    }
    
    try {
        loadingDiv.classList.remove('hidden');
        errorDiv.classList.add('hidden');
        pokemonInfo.classList.add('hidden');
        
        const response = await fetch(`${API_URL}/${pokemon}`);
        
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        
        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        errorDiv.textContent = '❌ ' + error.message;
        errorDiv.classList.remove('hidden');
        loadingDiv.classList.add('hidden');
    }
}

function displayPokemon(data) {
    document.getElementById('pokemon-image').src = data.sprites.other['official-artwork'].front_default;
    document.getElementById('pokemon-name').textContent = data.name;
    document.getElementById('pokemon-id').textContent = `#${data.id}`;
    
    const typesDiv = document.getElementById('pokemon-types');
    typesDiv.innerHTML = data.types.map(t => `<span class="type-badge">${t.type.name}</span>`).join('');
    
    document.getElementById('height').textContent = (data.height / 10) + ' m';
    document.getElementById('weight').textContent = (data.weight / 10) + ' kg';
    
    const abilities = data.abilities.map(a => a.ability.name).join(', ');
    document.getElementById('abilities').textContent = abilities;
    
    pokemonInfo.classList.remove('hidden');
    loadingDiv.classList.add('hidden');
}

searchBtn.addEventListener('click', searchPokemon);
pokemonInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchPokemon();
});