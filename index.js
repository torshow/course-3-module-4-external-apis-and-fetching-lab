// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
document.getElementById('fetch-alerts').addEventListener('click', () => {
    const input = document.getElementById('state-input')
    const state = input.value.trim().toUpperCase()

    if (!/^[A-Z]{2}$/.test(state)){
        showError('Please enter a valid 2-letter state abbreviation')
        return
    }

    fetchWeatherAlerts(state)
})

async function fetchWeatherAlerts(state) {
    const errorDiv = document.getElementById('error-message')

    errorDiv.textContent = '';
    errorDiv.classList.add('hidden')

    try {
        const response = await fetch(weatherApi + state);
        if (! response.ok) throw new  Error(`Bad response: ${response.status}`)

        const data = await response.json()
        console.log(data)
        displayAlerts(data)
        
        document.getElementById('state-input').value = ''
    } catch (errorObject) {
        console.error(errorObject.message)
        showError(errorObject.message)
    }
    
}

function displayAlerts(data) {
    const alertsDisplay = document.getElementById('alerts-display')
    alertsDisplay.innerHTML = '';

    const count = data.features ? data.features.length: 0;
    const title = data.title || 'Weather Alerts'

    const summary = document.createElement('p')
    summary.textContent = `${title}: ${count}`

    alertsDisplay.appendChild(summary)

    if (data.features) {
        const ul = document.createElement('ul')
        data.features.forEach(alert => {
            const li = document.createElement('li');
            li.textContent = alert.properties.headline
            ul.appendChild(li)
            
        });
        alertsDisplay.appendChild(ul)
    }

}


function showError(msg){
    const errorDiv = document.getElementById('error-message')
    errorDiv.textContent = msg
    errorDiv.classList.remove('hidden')
    document.getElementById('alerts-display').innerHTML = '';

}