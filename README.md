# Fran-Albanese's-Weather-Dashboard

Welcome to my weather dashboard! In this README file are instructions on how to use the application.

Link to application - https://falbanese7.github.io/fran-albanese-weather-dashboard/

## Searching for a city

To start, the user will need to type in their desired city name. The name must be spelled correctly or the application will yield no result. Once the user inputs text, they will need to click the "Search" button.

![Screen Shot 2022-04-30 at 3 15 15 PM](https://user-images.githubusercontent.com/98659683/166119955-34c3e608-602e-486f-8052-23b740bd86bd.png)

## Seeing Results

Once the "Search" button is clicked, the user will see a larger section displaying the current day's weather. The values include:

- The name of their selected city and the current day's date
- A small image representing the weather conditions
- Temperature in Farenheit
- Wind speed in miles per hour
- Humidity percentage
- The UV Index

The user should also see a section under the current day's weather that displays the five day forecast for their chosen city. The metrics shown here include:

- The forecasted day's date
- A small image representing the weather conditions
- Temperature in Farenheit
- Wind speed in miles per hour
- Humidity percentage

![Screen Shot 2022-04-30 at 3 15 44 PM](https://user-images.githubusercontent.com/98659683/166119988-837221c6-04f7-4459-a32d-1d718bbc6b47.png)

The UV Index value will change color indicating whether the conditions are favorable (green), moderate (yellow), or severe (red).

## Search History

The user's search history will be saved to their Local Storage and displayed under the search button in a vertical format. The search results are clickable buttons that the user can click to be presented with that corresponding city's weather once again.

![gif showing how to use recent history buttons](https://videoapi-muybridge.vimeocdn.com/animated-thumbnails/image/0615eb28-9257-49ce-ab4a-1d8ee0ec186c.gif?ClientID=vimeo-core-prod&Date=1651346496&Signature=da6021a0a18092199e9750526ead4aee887fb3ef)

## Clearing the Search History

When the user wants to reset their search history, they can click the "Clear Recent Searches" button. The application will clear the items it saved in their Local Storage, remove the previously searched city buttons, and clear the weather results.

![gif showing how to use the clear history button](https://videoapi-muybridge.vimeocdn.com/animated-thumbnails/image/b8582720-fa02-4437-b4ac-a09df6f3475f.gif?ClientID=vimeo-core-prod&Date=1651347860&Signature=9c5ba969cb56d489c4a6bf43e715aeb608109aeb)

## Credits and Relevant Frameworks

Developer - Francesco Albanese

Styling:
Bootstrap,
Google Fonts

Interactivity:
jQuery,
Moment.js
