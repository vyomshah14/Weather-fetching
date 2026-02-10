// weather.js
require('dotenv').config();

const apiKey = process.env.WEATHER_API_KEY; 
const city = "Mumbai"; 

async function getWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found or API issue");
        }

        const data = await response.json();

        console.log("📍 City:", data.name);
        console.log("🌡 Temperature:", data.main.temp, "°C");
        console.log("☁ Weather:", data.weather[0].description);
        console.log("💧 Humidity:", data.main.humidity, "%");

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

getWeather();
