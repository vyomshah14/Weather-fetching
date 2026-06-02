export const fetchCurrentWeather = async (city, apiKey) => {
  const params = new URLSearchParams({
    q: city,
    units: 'metric',
    appid: apiKey.trim(),
  });
  const url = `https://api.openweathermap.org/data/2.5/weather?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.message || 'Failed to fetch weather');
    error.status = response.status;
    throw error;
  }
  return response.json();
};

export const fetchForecast = async (city, apiKey) => {
  const params = new URLSearchParams({
    q: city,
    units: 'metric',
    appid: apiKey.trim(),
  });
  const url = `https://api.openweathermap.org/data/2.5/forecast?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.message || 'Failed to fetch forecast');
    error.status = response.status;
    throw error;
  }
  return response.json();
};
