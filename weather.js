const apiKey = "ceb5a18fa616dc99996090ccacfe318e"; // Replace with your OpenWeatherMap API Key

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found! Please enter a valid city name.");
            return;
        }

        document.getElementById("cityName").textContent = `Weather in ${data.name}`;
        document.getElementById("temperature").textContent = `🌡️ Temp: ${data.main.temp}°C`;
        document.getElementById("description").textContent = `🌥️ Condition: ${data.weather[0].description}`;
        document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
        document.getElementById("windSpeed").textContent = `💨 Wind Speed: ${data.wind.speed} m/s`;

        document.getElementById("weatherInfo").style.display = "block";
    } catch (error) {
        alert("Error fetching weather data. Please try again later.");
    }
}

// Listen for Enter key press
document.getElementById("cityInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
