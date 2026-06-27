const fromAmount = document.getElementById('from-amount');
const toAmount = document.getElementById('to-amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const swapBtn = document.getElementById('swap-btn');
const errorDiv = document.getElementById('error');
const rateFrom = document.getElementById('rate-from');
const rateTo = document.getElementById('rate-to');
const rateValue = document.getElementById('rate-value');

const API_URL = 'https://api.exchangerate-api.com/v4/latest';

async function convertCurrency() {
    try {
        errorDiv.classList.add('hidden');
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const amount = fromAmount.value;
        
        if (!amount || amount <= 0) {
            toAmount.value = '';
            return;
        }
        
        const response = await fetch(`${API_URL}/${from}`);
        const data = await response.json();
        
        const rate = data.rates[to];
        const converted = (amount * rate).toFixed(2);
        
        toAmount.value = converted;
        rateFrom.textContent = from;
        rateTo.textContent = to;
        rateValue.textContent = rate.toFixed(4);
    } catch (error) {
        errorDiv.textContent = '❌ Failed to fetch exchange rates';
        errorDiv.classList.remove('hidden');
    }
}

fromAmount.addEventListener('input', convertCurrency);
fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);

swapBtn.addEventListener('click', () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
});

convertCurrency();