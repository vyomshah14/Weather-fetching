import { useState, useEffect } from 'react';
import { Settings, X, Key, Info, RefreshCw } from 'lucide-react';

export const SettingsModal = ({ 
  isOpen, 
  onClose, 
  apiKey, 
  onSaveApiKey, 
  isCelsius, 
  onToggleUnit,
  onClearHistory 
}) => {
  const [keyInput, setKeyInput] = useState(apiKey || '');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setKeyInput(apiKey || '');
  }, [apiKey, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveApiKey(keyInput.trim());
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings size={22} />
            <h3>Configuration</h3>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close settings">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {/* API Key management */}
          <div className="form-group">
            <label htmlFor="api-key-input" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Key size={16} style={{ opacity: 0.8 }} />
              OpenWeatherMap API Key
            </label>
            <input
              id="api-key-input"
              type="password"
              placeholder="Paste your appid key here..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
            />
            <div className="hint-text" style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', marginTop: '4px' }}>
              <Info size={14} style={{ flexShrink: 0, marginTop: '1px' }} />
              <span>
                To retrieve real weather data, you need a free key from{' '}
                <a 
                  href="https://openweathermap.org/api" 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ color: '#fff', textDecoration: 'underline' }}
                >
                  openweathermap.org
                </a>.
              </span>
            </div>
          </div>

          {/* Unit selection toggling */}
          <div className="form-group">
            <label>Temperature Units</label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button
                type="button"
                className={`unit-toggle ${isCelsius ? 'active' : ''}`}
                onClick={() => !isCelsius && onToggleUnit()}
                style={{
                  flex: 1,
                  background: isCelsius ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: isCelsius ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '10px',
                  borderRadius: '10px',
                  fontWeight: '600',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                Metric (°C, m/s)
              </button>
              <button
                type="button"
                className={`unit-toggle ${!isCelsius ? 'active' : ''}`}
                onClick={() => isCelsius && onToggleUnit()}
                style={{
                  flex: 1,
                  background: !isCelsius ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: !isCelsius ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '10px',
                  borderRadius: '10px',
                  fontWeight: '600',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                Imperial (°F, mph)
              </button>
            </div>
          </div>

          {/* Maintenance / Cache utilities */}
          <div className="form-group" style={{ marginTop: '10px' }}>
            <label>Maintenance</label>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your favorites and search history?')) {
                  onClearHistory();
                  alert('History cleared successfully!');
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '10px',
                fontSize: '0.85rem',
                borderRadius: '10px',
                background: 'rgba(255, 74, 74, 0.1)',
                border: '1px solid rgba(255, 74, 74, 0.2)',
                color: '#ff8a8a',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={14} />
              Clear App Cache & History
            </button>
          </div>

          <div className="modal-footer" style={{ marginTop: '10px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
