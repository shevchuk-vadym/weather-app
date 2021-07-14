import React from 'react';

export const DailyWeather = (props) => {
  const forACast = props.forecast;
  console.log(forACast);
  const weatherForAWeek = forACast.map((weather) => {
    return <div>{weather.temp}</div>;
  });
  console.log(weatherForAWeek);
  return null;
};
