

// todayContainer.textContent = dayjs().format('MM-YYYY');


var today = document.getElementById('today-container');
var nextDay = document.getElementById('todayPlus1');
var dayAfterNext = document.getElementById('todayPlus2');
var dayAfterNextPlusOne = document.getElementById('todayPlus3')
var dayAfterNextPlusTwo = document.getElementById('todayPlus4')


function fetchWeather(){
    var cityName = 'Atlanta'

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=ce15f8e5dea9dd22cf9e619358d56919`)
        .then(response => response.json())
        .then(data => {
            // Process the fetched data here
            console.log(data);
            console.log(data.list[0].main.temp)
            for (var i = 0;i < 5; i++){
                var temp1 = document.getElementById(`temp${i + 1}`);
                temp1.textContent ="Temp: " + data.list[i * 8].main.temp + '°F'
                var wind1 = document.getElementById(`wind${i + 1}`);
                wind1.textContent ="Wind: " + data.list[i * 8].wind.speed
                var humidity1 = document.getElementById(`humidity${i + 1}`);
                humidity1.textContent = 'Humidity: ' + data.list[i * 8].main.humidity;
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch request
            console.log(error);
    });
}

window.onload = () => {
    today.textContent = dayjs().format('MM/DD/YYYY');
    nextDay.textContent = dayjs().add(1, 'day').format('MM/DD/YYYY');
    dayAfterNext.textContent = dayjs().add(2, 'day').format('MM/DD/YYYY');
    dayAfterNextPlusOne.textContent = dayjs().add(3, 'day').format('MM/DD/YYYY');
    dayAfterNextPlusTwo.textContent = dayjs().add(4, 'day').format('MM/DD/YYYY');

}


