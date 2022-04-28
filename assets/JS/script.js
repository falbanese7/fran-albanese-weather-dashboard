const userInput = document.getElementById('search-input');
// const searchBtn = document.getElementById('search-button');
const searchForm = document.getElementById('search-form');
const resultEl = document.getElementById('results');
const displayInput = document.getElementById('search-text');
const displayResults = document.getElementById('search-content');
const displayHistory = document.getElementById('search-section');

function getWeather() {
   let weatherApi = 'https://api.openweathermap.org/data/2.5/weather?q='+userInput.value+'&appid=1158e7e2e205b37a0d1f795667970aaf&units=imperial'

  

   fetch(weatherApi)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        const weatherData = document.createElement('div');
        const temp = document.createElement('p');
        const wind = document.createElement('p');
        const humid = document.createElement('p');
        // const uvIndex = document.createElement('p');

        displayInput.innerHTML = '<h1>'+ 'Selected Location: ' + data.name + '<h1>';
        temp.textContent = 'Temp: ' + data.main.temp + '°F';
        wind.textContent = 'Wind speed: ' + data.wind.speed + ' mph';
        humid.textContent = 'Humidity: ' + data.main.humidity + ' %';
        // uvIndex.textContent = data[i].

        weatherData.appendChild(temp);
        weatherData.appendChild(wind);
        weatherData.appendChild(humid);
        displayResults.appendChild(displayInput);
        displayResults.appendChild(weatherData);
        resultEl.classList.add('border', 'border-dark');
   })
}

function handleSearchSubmit(event) {
    event.preventDefault();

    if (!userInput) {
        alert(response.message)
    }

    getWeather();
}

searchForm.addEventListener('submit', handleSearchSubmit);

// const createContainer = document.createElement('div');
// const titleEl = document.createElement('h1');
// const temp = document.createElement('p');
// const wind = document.createElement('p');
// const humid = document.createElement('p');
// const uvIndex = document.createElement('p');


// titleEl.textContent = data[i].html_url;



// tableData.appendChild(link);
// createTableRow.appendChild(tableData);
// tableBody.appendChild(createTableRow);