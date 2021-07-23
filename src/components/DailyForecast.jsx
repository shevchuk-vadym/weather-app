import React from 'react';
import './dailyforecast.css';

export const DailyWeather = (props) => {
  const forACast = props.forecast;
  console.log(forACast);
  const weatherForAWeek = forACast.map((weather) => {
    return (
      <div>
        {/* <div>{weather.date}</div> */}
        <div>
          <h5>t: {weather.temp}</h5>
        </div>
        <div>
          <h5>fells: {weather.feels_like}</h5>
        </div>
        <div>
          <h5>t. min.: {weather.temp_min}</h5>
        </div>
        <div>
          <h5>t. max: {weather.temp_max}</h5>
        </div>
        <div>
          <h5>pressure: {weather.pressure}</h5>
        </div>
      </div>
    );
  });
  console.log(weatherForAWeek);
  return (
    <div className='week_weather'>
      <div className='week_weather_temp'>{weatherForAWeek}</div>
    </div>
  );
};
