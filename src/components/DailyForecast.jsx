import React from 'react';
import './dailyforecast.css';

export const DailyWeather = (props) => {
  console.log(props);
  const forACast = props.forecast;
  const weatherForAWeek = forACast.map((weather) => {
    return (
      <div>
        {/* <div>{weather.date}</div> */}
        <div>
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt=''
            />
          </div>
          <h5>
            <br /> {weather.temp}&#8451;
          </h5>
        </div>
        <div>
          <h5>
            чувствуется как: <br /> {weather.feels_like}&#8451;
          </h5>
        </div>
        <div>
          <h5>
            минимальная температура: <br /> {weather.temp_min}&#8451;
          </h5>
        </div>
        <div>
          <h5>
            максимальная температура: <br /> {weather.temp_max}&#8451;
          </h5>
        </div>
        <div>
          <h5>
            давление: <br /> {weather.pressure}
          </h5>
        </div>
      </div>
    );
  });
  return (
    <div className='week_weather'>
      <div className='week_weather_temp'>{weatherForAWeek}</div>
    </div>
  );
};
