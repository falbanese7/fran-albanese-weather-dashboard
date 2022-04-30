// Declaring variables needed from html elements.
const userInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
const resultEl = document.getElementById('results');
const displayInput = document.getElementById('search-text');
const displayResults = document.getElementById('search-content');
const displayHistory = document.getElementById('history');
const buttonList = document.createElement('button');
const fiveDay = document.getElementById('five-day');
const clearRecentSearchBtn = document.getElementById('clear-history')

// The current day's date.
let day = moment().format('M/DD/YYYY');

// This function calls the OpenWeather Geocoding API in order to gather the latitudinal and longitudinal coordinates of the user's selected city.
function getCoordinates() {
    const cityConvert = 'http://api.openweathermap.org/geo/1.0/direct?q='+userInput.value+'&limit=1&appid=1158e7e2e205b37a0d1f795667970aaf'
 
    fetch(cityConvert)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
     renderWeatherData(data); // Calling the renderWeatherData function so we can use the results from the Geocoding call in the renderWeatherData function.
    })
 }

//This function uses the latitudinal and longitudinal data from the previous function inside of the OneCall API from OpenWeather. 
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
        // Creating HTML elements
        const weatherData = document.createElement('div');
        const temp = document.createElement('p');
        const wind = document.createElement('p');
        const humid = document.createElement('p');
        const uvIndex = document.createElement('p');
        const uvSpan = document.createElement('span');
        const weatherIcon = data.current.weather[0].icon;

        // Giving text and HTML values to the previously declared variables.
        displayInput.innerHTML = '<h1>'+ cityName + ' ' + '(' + day + ')' +'<img src=http://openweathermap.org/img/wn/'+ weatherIcon + '@2x.png>' + '</h1>';
        temp.textContent = 'Temp: ' + data.current.temp + '°F';
        wind.textContent = 'Wind speed: ' + data.current.wind_speed + ' mph';
        humid.textContent = 'Humidity: ' + data.current.humidity + ' %';
        uvIndex.textContent = 'UV Index: ';
        uvSpan.textContent = data.current.uvi;

        // Using if else to automatically change the uvSpan's class which contains the appropriate color for the value.
        if (data.current.uvi < 3) {
            uvSpan.classList.add('lowUVI')
        } else if ( data.current.uvi < 5) {
            uvSpan.classList.add('moderateUVI')
        } else if (data.current.uvi > 5) {
            uvSpan.classList.add('severeUVI')
        } else {
            console.log('UV Index is astronomically high')
        }

        // Appending variables to parents to render them to the page.
        uvIndex.appendChild(uvSpan)
        weatherData.appendChild(temp);
        weatherData.appendChild(wind);
        weatherData.appendChild(humid);
        weatherData.appendChild(uvIndex);
        displayResults.appendChild(displayInput);
        displayResults.appendChild(weatherData);
        displayResults.classList.add('border', 'border-dark');

    // Calling OneCall API again for the five day forecast.    
    let fiveDayAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=current,minutely,hourly,alerts&appid=1158e7e2e205b37a0d1f795667970aaf&units=imperial'

    fetch(fiveDayAPI)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        
        const fiveDayTitle = document.getElementById('five-day-title')
        fiveDayTitle.innerHTML = 'Five Day Forecast'

        // This for loop creates 5 cards that render each of the day's forecast in the five day forecast.
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

// This function will clear the currently displayed results when the user inputs a new result.
function refreshResults() {
    displayInput.innerHTML = '';
    displayResults.innerHTML = '';
    fiveDay.innerHTML = '';
}

// Checking for a value in the userInput and firing several functions when the "Search" button is clicked.
function handleSearchSubmit(event) {
    event.preventDefault();

    if (!userInput) {
        alert(response.message)
    }
    getCoordinates();
    addInputToLocal(userInput);
    renderHistory();  
}

// Clears the local storage and recently searched buttons.
function clearRecentSearch () {
    localStorage.clear();
    displayHistory.innerHTML = '';
    location.reload();
}

// Renders recent search buttons to the page.
function renderHistory() {
    const readData = localStorage.getItem('userInputs');
    const readDataArr = JSON.parse(readData) || [];
    displayHistory.innerHTML = '';

    for (let i = 0; i < readDataArr.length; i++) {
        let historyButton = document.createElement('button');
        historyButton.setAttribute('class', 'custom-clear btn btn-secondary')
        historyButton.textContent = readDataArr[i];
        
        displayHistory.appendChild(historyButton);
    }
    
}

// Checking for clicks on the recently searched buttons.
function historyClickHandler(event) {
    const element = event.target;

    if (element.matches('button')) {
        userInput.value = element.textContent;
        buttonList.click();
    }   
}

// Saves user inputs to local storage and reads the data.
function addInputToLocal(userInput){
    let userInputs = []; 
    const readData = localStorage.getItem('userInputs');
    if (readData) {
        userInputs = JSON.parse(readData);
    }
    if (!userInputs.includes(userInput.value)){
        userInputs.push(userInput.value);
        localStorage.setItem('userInputs', JSON.stringify(userInputs));
    } 
}

// Event listeners for various buttons and form.
searchForm.addEventListener('submit', handleSearchSubmit);

buttonList.addEventListener('click', handleSearchSubmit);

clearRecentSearchBtn.addEventListener('click', clearRecentSearch);

displayHistory.addEventListener('click', historyClickHandler);

renderHistory();