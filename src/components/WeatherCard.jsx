import { WeatherIcon } from './WeatherIcons';
import {
  Compass,
  Droplets,
  Eye,
  Shirt,
  Sparkles,
  Star,
  Thermometer,
  Waves,
  Wind,
} from 'lucide-react';

export const WeatherCard = ({
  weather,
  isCelsius,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!weather) return null;

  const { name, main, weather: conds, wind, visibility, coord } = weather;
  const description = conds[0]?.description || 'Clear sky';
  const conditionMain = conds[0]?.main || 'Clear';
  const currentTemp = isCelsius
    ? Math.round(main.temp)
    : Math.round((main.temp * 9) / 5 + 32);
  const windSpeed = isCelsius
    ? `${wind.speed.toFixed(1)} m/s`
    : `${(wind.speed * 2.237).toFixed(1)} mph`;

  const convertTemp = (tempC) => {
    if (isCelsius) return `${Math.round(tempC)}°C`;
    return `${Math.round((tempC * 9) / 5 + 32)}°F`;
  };

  const getDailyBrief = () => {
    const temp = main.temp;
    const desc = description.toLowerCase();

    if (desc.includes('rain') || desc.includes('drizzle')) {
      return {
        comment: 'Rain is in the picture. Carry an umbrella, pick shoes that can handle wet streets, and keep plans flexible.',
        suggestions: ['Umbrella', 'Raincoat', 'Waterproof shoes'],
      };
    }
    if (desc.includes('thunder') || desc.includes('storm')) {
      return {
        comment: 'Stormy conditions are active. Indoor plans are the smarter call until things settle down.',
        suggestions: ['Indoor plans', 'Charged phone', 'Warm drink'],
      };
    }
    if (desc.includes('snow') || desc.includes('ice')) {
      return {
        comment: 'Cold weather gear earns its keep today. Layer well and choose shoes with good grip.',
        suggestions: ['Heavy coat', 'Gloves', 'Insulated boots'],
      };
    }
    if (desc.includes('mist') || desc.includes('fog') || desc.includes('haze')) {
      return {
        comment: 'Visibility may feel muted. Give yourself extra travel time and stay sharp on the road.',
        suggestions: ['Reflective layer', 'Slow commute', 'Warm coffee'],
      };
    }
    if (temp < 6) {
      return {
        comment: 'It is properly cold outside. Thermal layers and a wind-blocking jacket are worth it.',
        suggestions: ['Thermal layer', 'Heavy coat', 'Scarf'],
      };
    }
    if (temp < 16) {
      return {
        comment: 'There is a crisp chill in the air. Go with layers so you can adjust through the day.',
        suggestions: ['Sweater', 'Light jacket', 'Sneakers'],
      };
    }
    if (temp < 26) {
      return {
        comment: 'Beautifully comfortable weather. It is a good window for walking, errands, or outdoor time.',
        suggestions: ['Light shirt', 'Denim', 'Comfy shoes'],
      };
    }
    if (temp < 35) {
      return {
        comment: 'Warm conditions today. Breathable fabrics and hydration will keep the day comfortable.',
        suggestions: ['Sunglasses', 'Sunscreen', 'Cold water'],
      };
    }

    return {
      comment: 'Serious heat today. Limit harsh sun exposure and keep fluids close.',
      suggestions: ['Wide hat', 'SPF 50+', 'Hydration pack'],
    };
  };

  const { comment, suggestions } = getDailyBrief();

  return (
    <div className="main-display animate-fade">
      <div className="glass-panel hero-weather-card">
        <div className="hero-main">
          <div className="location-info">
            <span className="eyebrow">Current conditions</span>
            <h2>
              {name}
              <button
                onClick={() => onToggleFavorite(name)}
                className="fav-btn"
                aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
              >
                <Star
                  size={24}
                  fill={isFavorite ? '#ffd166' : 'none'}
                  stroke={isFavorite ? '#ffb703' : 'currentColor'}
                />
              </button>
            </h2>
            <div className="location-meta">
              Lat: {coord?.lat?.toFixed(2)} / Lon: {coord?.lon?.toFixed(2)}
            </div>
          </div>

          <div className="weather-condition">
            <WeatherIcon condition={conditionMain} size={112} />
            <div className="condition-text">{description}</div>
          </div>
        </div>

        <div className="temperature-row">
          <div className="temp-huge-box">
            <span className="temp-number">{currentTemp}</span>
            <span className="temp-unit">°{isCelsius ? 'C' : 'F'}</span>
          </div>

          <div className="quick-stats">
            <div className="quick-stat">
              <Thermometer size={20} />
              <div>
                <span>Feels like</span>
                <strong>{convertTemp(main.feels_like)}</strong>
              </div>
            </div>
            <div className="quick-stat">
              <Droplets size={20} />
              <div>
                <span>Humidity</span>
                <strong>{main.humidity}%</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="side-stack">
        <div className="glass-panel copilot-panel">
          <div className="copilot-header">
            <div className="copilot-avatar">
              <Waves size={16} />
            </div>
            <h3>Aura Brief</h3>
          </div>
          <p className="copilot-message">{comment}</p>

          <div className="copilot-divider"></div>

          <div className="suggestion-box">
            <span className="suggestion-title">
              <Shirt size={14} />
              Pack list
            </span>
            <div className="suggestions-list">
              {suggestions.map((item) => (
                <span key={item} className="suggestion-tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="metrics-grid">
          <div className="metric-item">
            <div className="metric-icon-box">
              <Wind size={20} />
            </div>
            <div className="metric-info">
              <span>Wind</span>
              <strong>{windSpeed}</strong>
            </div>
          </div>

          <div className="metric-item">
            <div className="metric-icon-box">
              <Compass size={20} />
            </div>
            <div className="metric-info">
              <span>Direction</span>
              <strong>{wind.deg}°</strong>
            </div>
          </div>

          <div className="metric-item">
            <div className="metric-icon-box">
              <Eye size={20} />
            </div>
            <div className="metric-info">
              <span>Visibility</span>
              <strong>{(visibility / 1000).toFixed(1)} km</strong>
            </div>
          </div>

          <div className="metric-item">
            <div className="metric-icon-box">
              <Sparkles size={20} />
            </div>
            <div className="metric-info">
              <span>Pressure</span>
              <strong>{main.pressure} hPa</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
