import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { CloudSun, Search, Settings, CloudOff, MapPin, X } from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';
import { ForecastSection } from './components/ForecastSection';
import { SettingsModal } from './components/SettingsModal';
import { fetchCurrentWeather, fetchForecast } from './api/weather';

// Resolve the weather theme class based on condition + time-of-day
function getThemeClass(weather) {
  if (!weather) return 'theme-default';
  const main = weather.weather?.[0]?.main?.toLowerCase() || '';
  const icon = weather.weather?.[0]?.icon || '';
  const isNight = icon.endsWith('n');

  if (main.includes('thunder')) return 'theme-stormy';
  if (main.includes('rain') || main.includes('drizzle')) return 'theme-rainy';
  if (main.includes('snow')) return 'theme-snowy';
  if (main.includes('mist') || main.includes('fog') || main.includes('haze') || main.includes('smoke') || main.includes('dust')) return 'theme-misty';
  if (main.includes('cloud')) return 'theme-cloudy';
  if (isNight) return 'theme-clear-night';
  return 'theme-clear-day';
}

function App() {
  // API key: prefer the key saved in Settings, then fall back to .env.
  const envKey = (import.meta.env.VITE_WEATHER_API_KEY || '').trim();
  const [apiKey, setApiKey] = useState(() => {
    return (localStorage.getItem('owm_api_key') || envKey).trim();
  });

  const [city, setCity] = useState('Mumbai');
  const [searchInput, setSearchInput] = useState('Mumbai');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favorites') || '[]'); } catch { return []; }
  });
  const [recentSearches, setRecentSearches] = useState(() => {
    try { return JSON.parse(localStorage.getItem('recent_searches') || '[]'); } catch { return []; }
  });

  const isFavorite = favorites.includes(weather?.name || city);

  const toggleFavorite = (cityName) => {
    setFavorites((prev) => {
      const updated = prev.includes(cityName)
        ? prev.filter((c) => c !== cityName)
        : [...prev, cityName];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const addRecent = (cityName) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== cityName.toLowerCase());
      const updated = [cityName, ...filtered].slice(0, 5);
      localStorage.setItem('recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const removeRecent = (cityName) => {
    setRecentSearches((prev) => {
      const updated = prev.filter((c) => c !== cityName);
      localStorage.setItem('recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const loadWeather = useCallback(async (targetCity) => {
    const activeApiKey = apiKey.trim();
    const storedKey = (localStorage.getItem('owm_api_key') || '').trim();
    const keyCandidates = [...new Set([activeApiKey, storedKey, envKey].filter(Boolean))];

    if (keyCandidates.length === 0) {
      setError('No API key set. Click the ⚙ gear icon to add your OpenWeatherMap key.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      let curData;
      let fcData;
      let successfulKey = '';
      let lastError;

      for (const candidateKey of keyCandidates) {
        try {
          [curData, fcData] = await Promise.all([
            fetchCurrentWeather(targetCity, candidateKey),
            fetchForecast(targetCity, candidateKey),
          ]);
          successfulKey = candidateKey;
          break;
        } catch (e) {
          lastError = e;
          if (e.status !== 401) break;
        }
      }

      if (!curData || !fcData) {
        throw lastError || new Error('Something went wrong');
      }

      if (successfulKey && successfulKey !== activeApiKey) {
        setApiKey(successfulKey);
        localStorage.setItem('owm_api_key', successfulKey);
      }

      setWeather(curData);
      setForecast(fcData);
      addRecent(curData.name);
    } catch (e) {
      setError(e.message || 'Something went wrong');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, [apiKey, envKey]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadWeather(city);
  }, [city, loadWeather]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed) {
      setCity(trimmed);
    }
  };

  const handleSaveApiKey = (key) => {
    const trimmedKey = key.trim();
    setApiKey(trimmedKey);
    localStorage.setItem('owm_api_key', trimmedKey);
  };

  const handleClearHistory = () => {
    setRecentSearches([]);
    setFavorites([]);
    localStorage.removeItem('recent_searches');
    localStorage.removeItem('favorites');
  };

  const themeClass = getThemeClass(weather);

  return (
    <div className={themeClass} style={{ minHeight: '100vh' }}>
      <div className="glass-container">
        {/* ─── Header Bar ─── */}
        <div className="header-bar">
          <div className="brand">
            <div className="brand-mark">
              <CloudSun size={24} />
            </div>
            <div>
              <h1>Aura Weather</h1>
              <span className="brand-subtitle">Live city forecast</span>
            </div>
          </div>

          <div className="search-wrapper">
            <form onSubmit={handleSearch} className="search-box">
              <Search size={18} className="search-icon" />
              <input
                className="search-input"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search any city..."
                id="city-search"
              />
              <button type="submit" className="search-btn">Search</button>
            </form>

            {/* Recent searches pills */}
            {recentSearches.length > 0 && (
              <div className="recent-searches">
                <span>Recent:</span>
                {recentSearches.map((r) => (
                  <span
                    key={r}
                    className="recent-tag"
                    onClick={() => { setSearchInput(r); setCity(r); }}
                  >
                    {r}
                    <span
                      className="recent-tag-remove"
                      onClick={(e) => { e.stopPropagation(); removeRecent(r); }}
                    >
                      <X size={12} />
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="controls-group">
            <button
              className="unit-toggle"
              onClick={() => setIsCelsius((c) => !c)}
            >
              {isCelsius ? '°C' : '°F'}
            </button>
            <button
              className="icon-btn"
              onClick={() => setShowSettings(true)}
              aria-label="Open settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* ─── Favorites Bar ─── */}
        {favorites.length > 0 && (
          <div className="favorites-bar">
            <span>Favorites</span>
            {favorites.map((f) => (
              <span
                key={f}
                className="favorite-pill"
                onClick={() => { setSearchInput(f); setCity(f); }}
              >
                <MapPin size={12} />
                {f}
              </span>
            ))}
          </div>
        )}

        {/* ─── Loading State ─── */}
        {loading && (
          <div className="loading-box">
            <div className="loading-spinner"></div>
            <p style={{ opacity: 0.7 }}>Fetching weather for {city}...</p>
          </div>
        )}

        {/* ─── Error State ─── */}
        {!loading && error && (
          <div className="empty-state animate-fade">
            <CloudOff size={64} style={{ opacity: 0.5 }} />
            <h3>Oops!</h3>
            <p>{error}</p>
            {!apiKey && (
              <button className="btn-primary" onClick={() => setShowSettings(true)}>
                Add API Key
              </button>
            )}
          </div>
        )}

        {/* ─── Main Weather Display ─── */}
        {!loading && !error && weather && (
          <>
            <WeatherCard
              weather={weather}
              isCelsius={isCelsius}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />

            {forecast && (
              <ForecastSection
                forecastData={forecast}
                isCelsius={isCelsius}
              />
            )}
          </>
        )}

        {/* ─── Empty State (no data, no error) ─── */}
        {!loading && !error && !weather && (
          <div className="empty-state animate-fade">
            <h3>Welcome to Aura Weather</h3>
            <p>Type a city above and press Go to see beautiful, real-time forecasts.</p>
          </div>
        )}

        {/* ─── Footer ─── */}
        <div className="app-footer">
          <span>Built by Vyom</span>
        </div>
      </div>

      {/* ─── Settings Modal ─── */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
        isCelsius={isCelsius}
        onToggleUnit={() => setIsCelsius((c) => !c)}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}

export default App;
