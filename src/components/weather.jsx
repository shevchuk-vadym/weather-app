import React from 'react';
import '../components/App/app.css';
import './weather.css';

export const MainWeather = (props) => {
  console.log(typeof props.data.icon);
  return (
    <div className='main'>
      <div className='form-container'>{props.children}</div>
      <div className='main-content'>
        <div className='temp'>
          <div className='temp__main'>
            <div>{props.data.temp} C</div>
            <div>
              <img
                src={`http://openweathermap.org/img/wn/${props.data.icon}@2x.png`}
                alt=''
              />
            </div>
          </div>
          <div className='temp__feel'>
            <p>feels like: {props.data.feels_like} C</p>
          </div>
          <div className='wind__main'>
            <p>wind: {props.data.wind.speed} м/c</p>
          </div>
          <div className='humidity'>
            <p>humidity: {props.data.humidity}%</p>
          </div>
          {/* <div className='temp__min'>
            <p>{props.data.temp_min} C</p>
          </div>
          <div className='temp__max'>
            <p>{props.data.temp_max} C</p>
          </div> */}
        </div>
        <div className='weather'>
          <div className='weather__location'>
            <h2>city:&#160; </h2>
            <h2>{props.data.city}</h2>
          </div>
          <div classname='weather__date'></div>
          <div className='weather__description'>
            <h5>{props.data.description}</h5>
          </div>
        </div>
      </div>

      {/* <div className='location'>
        <h2>Город:</h2>
        <h2>{props.data.city}</h2>
      </div> */}
    </div>
  );
};
