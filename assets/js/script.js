window.onload = () => {
    const buttonAtlanta = document.getElementById('btnAtlanta');
    const buttonDenver = document.getElementById('btnDenver');
    const buttonSanFrancisco = document.getElementById('btnSanFrancisco');
    const buttonNewYork = document.getElementById('btnNewYork');
    const cityHeader = document.getElementById('city');
    const searchBar = document.getElementById('searchBar');

    // Function to fetch weather data based on city coordinates
    function fetchWeatherByCoordinates(latitude, longitude) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=ce15f8e5dea9dd22cf9e619358d56919`)
            .then(response => response.json())
            .then(data => {
                updateWeatherData(data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Function to fetch weather data based on city name
    function fetchWeatherByCity(cityName) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ce15f8e5dea9dd22cf9e619358d56919`)
            .then(response => response.json())
            .then(data => {
                const latitude = data.coord.lat;
                const longitude = data.coord.lon;
                fetchWeatherByCoordinates(latitude, longitude);
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Function to update weather data
    function updateWeatherData(data) {
        for (let i = 0; i < 5; i++) {
            const tempElement = document.getElementById(`temp${i + 1}`);
            tempElement.textContent = `Temp: ${data.list[i * 8].main.temp}°F`;

            const windElement = document.getElementById(`wind${i + 1}`);
            windElement.textContent = `Wind: ${data.list[i * 8].wind.speed}`;

            const humidityElement = document.getElementById(`humidity${i + 1}`);
            humidityElement.textContent = `Humidity: ${data.list[i * 8].main.humidity}`;

            const weatherIcon = document.getElementById(`icon${i + 1}`);
            const weatherCode = data.list[i * 8].weather[0].icon;
            weatherIcon.src = `https://openweathermap.org/img/wn/${weatherCode}.png`;
            weatherIcon.alt = data.list[i * 8].weather[0].description;
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        const cityName = searchBar.value.trim();

        if (cityName) {
            fetchWeatherByCity(cityName);
            searchBar.value = '';
            cityHeader.textContent = cityName
        }
         // Retrieve existing search history from local storage or initialize an empty array
         const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

         // Add the searched city to the search history array
         searchHistory.push(cityName);
 
         // Store the updated search history array in local storage
         localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    }
    

    // Add event listener to form submission
    const form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);

    

    // Add event listeners to buttons
    buttonAtlanta.addEventListener('click', () => {
        fetchWeatherByCity('Atlanta');
        cityHeader.textContent = 'Atlanta'
    });

    buttonDenver.addEventListener('click', () => {
        fetchWeatherByCity('Denver');
        cityHeader.textContent = 'Denver'
    });

    buttonSanFrancisco.addEventListener('click', () => {
        fetchWeatherByCity('San Francisco');
        cityHeader.textContent = 'San Francisco'
    });

    buttonNewYork.addEventListener('click', () => {
        fetchWeatherByCity('New York');
        cityHeader.textContent = 'New York'
    });

    // Initial weather data for default city
    fetchWeatherByCity('Atlanta');

    const today = document.getElementById('today-container');
  const nextDay = document.getElementById('todayPlus1');
  const dayAfterNext = document.getElementById('todayPlus2');
  const dayAfterNextPlusOne = document.getElementById('todayPlus3');
  const dayAfterNextPlusTwo = document.getElementById('todayPlus4');

  today.textContent = dayjs().format('MM/DD/YYYY');
  nextDay.textContent = dayjs().add(1, 'day').format('MM/DD/YYYY');
  dayAfterNext.textContent = dayjs().add(2, 'day').format('MM/DD/YYYY');
  dayAfterNextPlusOne.textContent = dayjs().add(3, 'day').format('MM/DD/YYYY');
  dayAfterNextPlusTwo.textContent = dayjs().add(4, 'day').format('MM/DD/YYYY');

};
