// Custom CSS animation injections for SVGs (kept inline or within stylesheet)
const styleBlock = `
  @keyframes rotate-sun {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes float-cloud-1 {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    50% { transform: translateY(-4px) translateX(2px); }
  }
  @keyframes float-cloud-2 {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    50% { transform: translateY(3px) translateX(-3px); }
  }
  @keyframes drip-rain {
    0% { transform: translateY(-8px); opacity: 0; }
    30% { opacity: 1; }
    100% { transform: translateY(12px); opacity: 0; }
  }
  @keyframes pulse-lightning {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 1; }
    52% { opacity: 0.3; }
    54% { opacity: 1; }
  }
  @keyframes drift-snow {
    0% { transform: translateY(-6px) translateX(0px) rotate(0deg); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(14px) translateX(4px) rotate(360deg); opacity: 0; }
  }
  @keyframes drift-mist {
    0%, 100% { transform: translateX(-4px); opacity: 0.6; }
    50% { transform: translateX(4px); opacity: 0.9; }
  }
`;

export const WeatherIcon = ({ condition, size = 120 }) => {
  const iconStyle = {
    display: 'block',
    width: size,
    height: size,
  };

  // Resolve simplified condition key
  const getConditionKey = (cond) => {
    if (!cond) return 'clear-day';
    const c = cond.toLowerCase();
    if (c.includes('rain') || c.includes('drizzle')) return 'rainy';
    if (c.includes('thunder') || c.includes('storm')) return 'stormy';
    if (c.includes('snow') || c.includes('ice') || c.includes('hail')) return 'snowy';
    if (c.includes('cloud') || c.includes('overcast')) return 'cloudy';
    if (c.includes('mist') || c.includes('fog') || c.includes('haze') || c.includes('smoke') || c.includes('dust')) return 'misty';
    if (c.includes('night') || c.includes('clear night')) return 'clear-night';
    return 'clear-day';
  };

  const key = getConditionKey(condition);

  return (
    <>
      <style>{styleBlock}</style>
      <div style={iconStyle} className="weather-icon-lg">
        {key === 'clear-day' && (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle 
              cx="32" 
              cy="32" 
              r="12" 
              fill="url(#sun-grad)" 
              style={{ transformOrigin: '32px 32px', animation: 'rotate-sun 12s linear infinite' }}
            />
            {/* Sun rays */}
            <g style={{ transformOrigin: '32px 32px', animation: 'rotate-sun 25s linear infinite' }}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <line
                  key={i}
                  x1="32"
                  y1="8"
                  x2="32"
                  y2="14"
                  stroke="#FFB300"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  transform={`rotate(${angle} 32 32)`}
                />
              ))}
            </g>
            <defs>
              <linearGradient id="sun-grad" x1="20" y1="20" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFF176" />
                <stop offset="100%" stopColor="#F57C00" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {key === 'clear-night' && (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M45.5 35.5A16.5 16.5 0 1131.25 15.12a12.5 12.5 0 0014.25 20.38z"
              fill="url(#moon-grad)"
              stroke="#FFF9C4"
              strokeWidth="1.5"
              style={{ transformOrigin: '32px 32px', animation: 'float-cloud-1 6s ease-in-out infinite' }}
            />
            {/* Star sparkles */}
            <circle cx="18" cy="18" r="1.5" fill="#FFF" style={{ animation: 'pulse-lightning 3s infinite' }} />
            <circle cx="48" cy="12" r="1" fill="#FFF" style={{ animation: 'pulse-lightning 2s infinite 0.5s' }} />
            <circle cx="20" cy="40" r="1" fill="#FFF" style={{ animation: 'pulse-lightning 4s infinite 1s' }} />
            <defs>
              <linearGradient id="moon-grad" x1="20" y1="15" x2="45" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ECEFF1" />
                <stop offset="100%" stopColor="#546E7A" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {key === 'cloudy' && (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Back cloud */}
            <path
              d="M44 38c0-3.87-3.13-7-7-7a6.9 6.9 0 00-2.58.5A10 10 0 0016 35c0 5.52 4.48 10 10 10h18z"
              fill="url(#cloud-back)"
              opacity="0.7"
              style={{ transformOrigin: '30px 35px', animation: 'float-cloud-2 8s ease-in-out infinite' }}
            />
            {/* Front cloud */}
            <path
              d="M48 42c0-4.42-3.58-8-8-8a7.9 7.9 0 00-3.52.82A12 12 0 0018 38c0 6.63 5.37 12 12 12h18z"
              fill="url(#cloud-front)"
              style={{ transformOrigin: '33px 40px', animation: 'float-cloud-1 6s ease-in-out infinite' }}
            />
            <defs>
              <linearGradient id="cloud-back" x1="16" y1="28" x2="44" y2="45" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#CFD8DC" />
                <stop offset="100%" stopColor="#78909C" />
              </linearGradient>
              <linearGradient id="cloud-front" x1="18" y1="30" x2="48" y2="50" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#B0BEC5" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {key === 'rainy' && (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M46 32c0-4.42-3.58-8-8-8a7.9 7.9 0 00-3.52.82A12 12 0 0016 28c0 6.63 5.37 12 12 12h18z"
              fill="url(#cloud-rain)"
              style={{ transformOrigin: '31px 30px', animation: 'float-cloud-1 5s ease-in-out infinite' }}
            />
            {/* Raindrops */}
            <g stroke="#64B5F6" strokeWidth="2.5" strokeLinecap="round">
              <line x1="22" y1="46" x2="20" y2="52" style={{ animation: 'drip-rain 1.2s infinite linear' }} />
              <line x1="30" y1="46" x2="28" y2="52" style={{ animation: 'drip-rain 1.2s infinite linear 0.4s' }} />
              <line x1="38" y1="46" x2="36" y2="52" style={{ animation: 'drip-rain 1.2s infinite linear 0.8s' }} />
            </g>
            <defs>
              <linearGradient id="cloud-rain" x1="16" y1="20" x2="46" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#90A4AE" />
                <stop offset="100%" stopColor="#455A64" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {key === 'stormy' && (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M46 32c0-4.42-3.58-8-8-8a7.9 7.9 0 00-3.52.82A12 12 0 0016 28c0 6.63 5.37 12 12 12h18z"
              fill="url(#cloud-storm)"
              style={{ transformOrigin: '31px 30px', animation: 'float-cloud-1 4s ease-in-out infinite' }}
            />
            {/* Lightning bolt */}
            <path
              d="M32 38l-4 8h5l-2 8 8-10h-5z"
              fill="#FFD54F"
              style={{ animation: 'pulse-lightning 1.5s infinite' }}
            />
            <defs>
              <linearGradient id="cloud-storm" x1="16" y1="20" x2="46" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#546E7A" />
                <stop offset="100%" stopColor="#263238" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {key === 'snowy' && (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M46 32c0-4.42-3.58-8-8-8a7.9 7.9 0 00-3.52.82A12 12 0 0016 28c0 6.63 5.37 12 12 12h18z"
              fill="url(#cloud-snow)"
              style={{ transformOrigin: '31px 30px', animation: 'float-cloud-1 6s ease-in-out infinite' }}
            />
            {/* Snowflakes */}
            <g fill="#E0F7FA">
              <circle cx="21" cy="46" r="2.5" style={{ transformOrigin: '21px 46px', animation: 'drift-snow 2s infinite linear' }} />
              <circle cx="31" cy="47" r="2" style={{ transformOrigin: '31px 47px', animation: 'drift-snow 2s infinite linear 0.7s' }} />
              <circle cx="41" cy="45" r="2.5" style={{ transformOrigin: '41px 45px', animation: 'drift-snow 2s infinite linear 1.4s' }} />
            </g>
            <defs>
              <linearGradient id="cloud-snow" x1="16" y1="20" x2="46" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ECEFF1" />
                <stop offset="100%" stopColor="#90A4AE" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {key === 'misty' && (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Horizontal mist lines */}
            <g stroke="url(#mist-grad)" strokeWidth="4" strokeLinecap="round">
              <line x1="16" y1="22" x2="48" y2="22" style={{ animation: 'drift-mist 4s ease-in-out infinite' }} />
              <line x1="12" y1="30" x2="52" y2="30" style={{ animation: 'drift-mist 4s ease-in-out infinite 0.8s' }} />
              <line x1="20" y1="38" x2="44" y2="38" style={{ animation: 'drift-mist 4s ease-in-out infinite 1.6s' }} />
              <line x1="16" y1="46" x2="48" y2="46" style={{ animation: 'drift-mist 4s ease-in-out infinite 2.4s' }} />
            </g>
            <defs>
              <linearGradient id="mist-grad" x1="12" y1="30" x2="52" y2="30" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#B0BEC5" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#ECEFF1" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#B0BEC5" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>
    </>
  );
};
