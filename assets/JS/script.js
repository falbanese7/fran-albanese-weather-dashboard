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
        const uvSpan = document.createElement('span');
        const weatherIcon = data.current.weather[0].icon;

        displayInput.innerHTML = '<h1>'+ cityName + ' ' + '(' + day + ')' +'<img src=http://openweathermap.org/img/wn/'+ weatherIcon + '@2x.png>' + '</h1>';
        temp.textContent = 'Temp: ' + data.current.temp + '°F';
        wind.textContent = 'Wind speed: ' + data.current.wind_speed + ' mph';
        humid.textContent = 'Humidity: ' + data.current.humidity + ' %';
        uvIndex.textContent = 'UV Index: ';
        uvSpan.textContent = data.current.uvi;

        if (data.current.uvi < 3) {
            uvSpan.classList.add('lowUVI')
        } else if ( data.current.uvi < 5) {
            uvSpan.classList.add('moderateUVI')
        } else if (data.current.uvi > 5) {
            uvSpan.classList.add('severeUVI')
        } else {
            console.log('UV Index is astronomically high')
        }

        uvIndex.appendChild(uvSpan)
        weatherData.appendChild(temp);
        weatherData.appendChild(wind);
        weatherData.appendChild(humid);
        weatherData.appendChild(uvIndex);
        displayResults.appendChild(displayInput);
        displayResults.appendChild(weatherData);
        displayResults.classList.add('border', 'border-dark');

    let fiveDayAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=current,minutely,hourly,alerts&appid=1158e7e2e205b37a0d1f795667970aaf&units=imperial'

    fetch(fiveDayAPI)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        
        const fiveDayTitle = document.getElementById('five-day-title')
        fiveDayTitle.innerHTML = 'Five Day Forecast'

        for (i = 1; i < 6; i++) {
            const fiveDayCol = document.createElement('div');
            fiveDayCol.setAttribute('class', 'col-12 col-md-6 col-lg mb-3')
            const fiveDayCard = document.createElement('div');
            fiveDayCard.setAttribute('class', 'card five-day-card')
            const fiveDayCardBody = document.createElement('div');
            fiveDayCardBody.setAttribute('class', 'card-body')
            const fiveDayDateData = moment.unix(data.daily[i].dt).format('M/DD/YYYY');
            const fiveDayIconData = data.daily[i].weather[0].icon;
            const fiveDayDate = document.createElement('p')
            const fiveDayIcon = document.createElement('img')
            const fiveTemp = document.createElement('p');
            const fiveWind = document.createElement('p');
            const fiveHumid = document.createElement('p');

            fiveDay.appendChild(fiveDayCol);
            fiveDayCol.appendChild(fiveDayCard);
            fiveDayCard.appendChild(fiveDayCardBody);

            fiveDayCardBody.appendChild(fiveDayDate);
            fiveDayCardBody.appendChild(fiveDayIcon);
            fiveDayCardBody.appendChild(fiveTemp);
            fiveDayCardBody.appendChild(fiveWind);
            fiveDayCardBody.appendChild(fiveHumid);
            
            fiveDayDate.innerHTML = '<h5>'+ fiveDayDateData + '</h5>';
            fiveDayIcon.src = 'http://openweathermap.org/img/wn/'+ fiveDayIconData + '@2x.png';
            fiveTemp.textContent = 'High temp: ' + data.daily[i].temp.max + '°F';
            fiveWind.textContent = 'Wind speed: ' + data.daily[i].wind_speed  + ' mph';
            fiveHumid.textContent = 'Humidity: ' + data.daily[i].humidity + ' %';
    
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
