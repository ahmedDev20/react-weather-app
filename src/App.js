import { useState } from 'react';

const API = {
  key: process.env.REACT_APP_API_KEY,
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${API.base}/weather?q=${query}&appid=${API.key}`)
        .then(response => response.json())
        .then(response => {
          setQuery('');
          setWeather(response);
        });
    }
  };

  const dateBuilder = d => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className={`app ${Math.round(weather?.main?.temp - 273.15) > 25 ? 'warm' : ''}`}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>

        {weather.main ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp - 273.15)}°C</div>
              <div className="weather">Sunny</div>
            </div>
          </>
        ) : (
          <div className="no-result">Sorry, no result 💩</div>
        )}
      </main>
    </div>
  );
}

export default App;
