

// todayContainer.textContent = dayjs().format('MM-YYYY');


var today = document.getElementById('today-container');

fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}')
    .then(response => response.json())
    .then(data => {
        // Process the weather data here
        console.log(data);
    })
    .catch(error => {
        console.log('Error:', error);
});

window.onload = () => {
    today.textContent = dayjs().format('MM/DD/YYYY');
}


