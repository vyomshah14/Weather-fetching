import { useState } from 'react';
import { CalendarDays, Clock } from 'lucide-react';
import { WeatherIcon } from './WeatherIcons';

export const ForecastSection = ({ forecastData, isCelsius }) => {
  const [viewMode, setViewMode] = useState('hourly'); // 'hourly' or 'daily'

  if (!forecastData || !forecastData.list) return null;

  const convertTemp = (tempC) => {
    if (isCelsius) return `${Math.round(tempC)}°C`;
    return `${Math.round((tempC * 9) / 5 + 32)}°F`;
  };

  // Get next 8 forecasts for hourly (24 hours)
  const hourlyForecasts = forecastData.list.slice(0, 8);

  // Group by day for 5-day forecasts (selecting approximate mid-day forecast around 12:00 PM / noon)
  const dailyForecasts = forecastData.list.filter(item => {
    return item.dt_txt.includes('12:00:00');
  });

  // If daily is empty due to API timezone matching issues, grab every 8th item
  const displayDaily = dailyForecasts.length > 0 
    ? dailyForecasts 
    : forecastData.list.filter((_, idx) => idx % 8 === 0).slice(0, 5);

  const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatDate = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="glass-panel forecast-panel animate-fade">
      <div className="forecast-header">
        <h3>Forecast</h3>
        
        <div className="segmented-control">
          <button
            onClick={() => setViewMode('hourly')}
            className={`segment-btn ${viewMode === 'hourly' ? 'active' : ''}`}
          >
            <Clock size={14} />
            Hourly
          </button>
          <button
            onClick={() => setViewMode('daily')}
            className={`segment-btn ${viewMode === 'daily' ? 'active' : ''}`}
          >
            <CalendarDays size={14} />
            5-Day
          </button>
        </div>
      </div>

      <div className="forecast-row">
        {viewMode === 'hourly' ? (
          hourlyForecasts.map((item, idx) => (
            <div key={idx} className="forecast-card">
              <span className="forecast-time">{formatTime(item.dt_txt)}</span>
              <WeatherIcon condition={item.weather[0]?.main} size={48} />
              <span className="forecast-temp">{convertTemp(item.main.temp)}</span>
              <span className="forecast-desc">{item.weather[0]?.description}</span>
            </div>
          ))
        ) : (
          displayDaily.map((item, idx) => (
            <div key={idx} className="forecast-card">
              <span className="forecast-time strong">
                {idx === 0 ? 'Today' : formatDate(item.dt_txt)}
              </span>
              <WeatherIcon condition={item.weather[0]?.main} size={48} />
              <span className="forecast-temp">{convertTemp(item.main.temp)}</span>
              <span className="forecast-desc">{item.weather[0]?.description}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
