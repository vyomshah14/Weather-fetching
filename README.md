# Aura Weather

A polished React weather app that fetches live current weather and forecast data from OpenWeatherMap. It includes a responsive dashboard UI, dynamic weather themes, favorites, recent searches, temperature unit switching, and a settings panel for API key management.

## Features

- Live current weather by city
- Hourly and 5-day forecast views
- Dynamic visual themes based on weather conditions
- Celsius and Fahrenheit toggle
- Favorite cities and recent search history
- Weather brief with practical outfit/activity suggestions
- Responsive layout for desktop and mobile
- OpenWeatherMap API key support through `.env` or app settings

## Tech Stack

- React
- Vite
- Lucide React icons
- OpenWeatherMap API
- CSS custom responsive UI

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```bash
VITE_WEATHER_API_KEY=your_openweathermap_api_key_here
```

You can also add or update the key from the app by opening the settings gear. The app stores that key locally in your browser.

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://127.0.0.1:5173/
```

## Available Scripts

```bash
npm run dev
```

Runs the app in development mode.

```bash
npm run build
```

Creates a production build in `dist`.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

## API Key Notes

This app uses the OpenWeatherMap current weather and forecast endpoints. If you see a `401 Unauthorized` or `Invalid API key` error:

- Confirm the key is copied correctly.
- Restart the Vite dev server after changing `.env`.
- Newly created OpenWeatherMap keys may take some time to activate.
- If you entered a key in app settings, it is saved in browser local storage.

## Project Structure

```text
src/
  api/
    weather.js
  components/
    ForecastSection.jsx
    SettingsModal.jsx
    WeatherCard.jsx
    WeatherIcons.jsx
  App.jsx
  index.css
  main.jsx
```

## Privacy

Do not commit your real API key. The `.gitignore` file excludes `.env` and other local environment files.
