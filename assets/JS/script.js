const userInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
const resultEl = document.getElementById('results');
const displayInput = document.getElementById('search-text');
const displayResults = document.getElementById('search-content');
const displayHistory = document.getElementById('search-section');
const fiveDay = document.getElementById('five-day');
let day = moment().format('M/DD/YYYY');

function getCoordinates() {
    const cityConvert = 'http://api.openweathermap.org/geo/1.0/direct?q='+userInput.value+'&limit=1&appid=1158e7e2e205b37a0d1f795667970aaf'
 
    fetch(cityConvert)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
     renderWeatherData(data);
    })
 }

function renderWeatherData(data) {
    const coordinates = data;
    console.log(coordinates);

    let cityName = coordinates[0].name;
    let lat = coordinates[0].lat;
    let lon = coordinates[0].lon;

    let currentWeatherAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid=1158e7e2e205b37a0d1f795667970aaf&units=imperial'

   fetch(currentWeatherAPI)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        refreshResults();
        const weatherData = document.createElement('div');
        const temp = document.createElement('p');
        const wind = document.createElement('p');
        const humid = document.createElement('p');
        const uvIndex = document.createElement('p');
        const weatherIcon = data.current.weather[0].icon

        displayInput.innerHTML = '<h1>'+ cityName + ' ' + '(' + day + ')' +'<img src=http://openweathermap.org/img/wn/'+ weatherIcon + '@2x.png>' + '</h1>';
        temp.textContent = 'Temp: ' + data.current.temp + '°F';
        wind.textContent = 'Wind speed: ' + data.current.wind_speed + ' mph';
        humid.textContent = 'Humidity: ' + data.current.humidity + ' %';
        uvIndex.textContent = 'UV Index: ' + data.current.uvi;

        if (data.current.uvi < 3) {
            uvIndex.classList.add('lowUVI')
        } else if ( data.current.uvi < 5) {
            uvIndex.classList.add('moderateUVI')
        } else if (data.current.uvi > 5) {
            uvIndex.classList.add('severeUVI')
        } else {
            console.log('UV Index is astronomically high')
        }

        weatherData.appendChild(temp);
        weatherData.appendChild(wind);
        weatherData.appendChild(humid);
        weatherData.appendChild(uvIndex);
        displayResults.appendChild(displayInput);
        displayResults.appendChild(weatherData);
        displayResults.classList.add('border', 'border-dark');

    let fiveDayAPI = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid=1158e7e2e205b37a0d1f795667970aaf&units=imperial'

    fetch(fiveDayAPI)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);

        for (i = 1; i < data.list.length; i+=6) {
            const fiveDayCol = document.createElement('div');
            fiveDayCol.setAttribute('class', 'col-12 col-md-6 col-lg mb-3')
            const fiveDayCard = document.createElement('div');
            fiveDayCard.setAttribute('class', 'card')
            const fiveDayCardBody = document.createElement('div');
            fiveDayCardBody.setAttribute('class', 'card-body')
            const fiveDayDate = moment(data.list[i].dt_txt).format('M/DD/YYYY');
            const fiveDayIcon = data.list[i].weather[i].icon;
            const fiveTemp = document.createElement('p');
            const fiveWind = document.createElement('p');
            const fiveHumid = document.createElement('p');

            fiveDay.appendChild(fiveDayCol);
            fiveDayCol.appendChild(fiveDayCard);
            fiveDayCard.appendChild(fiveDayCardBody);

            fiveDayCardBody.appendChild(fiveDayDate);
            fiveDayCardBody.appendChild(fiveTemp);
            fiveDayCardBody.appendChild(fiveWind);
            fiveDayCardBody.appendChild(fiveHumid);
            
            fiveDayDate.innerHTML = '<h5>'+ fiveDayDate + '</h5>';
            fiveDayIcon.innerHTML = '<img src=http://openweathermap.org/img/wn/'+ fiveDayIcon + '@2x.png>';
            fiveTemp.textContent = 'Temp: ' + data.list[i].main.temp + '°F';
            fiveWind.textContent = 'Wind speed: ' + data.list[i].wind.speed  + ' mph';
            fiveHumid.textContent = 'Humidity: ' + data.list[i].main.humidity + ' %';
    
        }
    })
})
}

function refreshResults() {
    displayInput.innerHTML = '';
    displayResults.innerHTML = '';
    fiveDay.innerHTML = '';
}

function handleSearchSubmit(event) {
    event.preventDefault();

    if (!userInput) {
        alert(response.message)
    }

    getCoordinates();
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