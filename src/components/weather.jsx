import React from 'react';
import '../components/App/app.css';

export const MainWeather = (props) => {
  console.log(props);
  return (
    <div className='main'>
      <div className='temp'>
        <div className='temp__main'>
          <p>темепатура:</p>
          <p>{props.data.temp} C</p>
        </div>
        <div className='temp__feel'>
          <p>ощущается как:</p>
          <p>{props.data.feels_like} C</p>
        </div>
        <div className='temp__min'>
          <p>мин. темепатура:</p>
          <p>{props.data.temp_min} C</p>
        </div>
        <div className='temp__max'>
          <p>макс. температура:</p>
          <p>{props.data.temp_max} C</p>
        </div>
      </div>
      <div className='weather'>
        <div className='wind'>
          <div className='wind__main'>
            <p>скорость ветра:</p>
            <p>{props.data.wind.speed} м/c</p>
          </div>
          <div className='wind__gust'>
            <p>порывы ветра:</p>
            <p>{props.data.wind.gust} м/c</p>
          </div>
        </div>
      </div>
      {props.children}
      <div className='location'>
        <h2>Город:</h2>
        <h2>{props.data.name}</h2>
      </div>
    </div>
  );
};
