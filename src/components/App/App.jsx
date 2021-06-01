import React from 'react';
import './app.css';
const { REACT_APP_APP_ID } = process.env;

export class App extends React.Component {
  state = {
    data: undefined,
  };
  async componentDidMount() {
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${REACT_APP_APP_ID}&q=London&units=metric`;
    const response = await fetch(requestUrl);
    const data = await response.json();
    this.setState({ data });
    console.log(this.state.data);
  }
  render() {
    if (!this.state.data || !this.state.data.main) {
      return <h2>LOADING...</h2>;
    }

    return (
      <div className='main'>
        <div className='temp'>
          <div className='temp__main'>
            <p>темепатура:</p>
            <p>{this.state.data.main.temp} C</p>
          </div>
          <div className='temp__feel'>
            <p>ощущается как:</p>
            <p>{this.state.data.main.feels_like} C</p>
          </div>
          <div className='temp__min'>
            <p>мин. темепатура:</p>
            <p>{this.state.data.main.temp_min} C</p>
          </div>
          <div className='temp__max'>
            <p>макс. температура:</p>
            <p>{this.state.data.main.temp_max} C</p>
          </div>
        </div>
        <div className='weather'>
          <div className='wind'>
            <div className='wind__main'>
              <p>скорость ветра:</p>
              <p>{this.state.data.wind.speed} м/c</p>
            </div>
            <div className='wind__gust'>
              <p>порывы ветра:</p>
              <p>{this.state.data.wind.gust} м/c</p>
            </div>
          </div>
        </div>
        <div className='location'>
          <h2>Город:</h2>
          <h2>{this.state.data.name}</h2>
        </div>
      </div>
    );
  }
}
