import React from 'react';
import './app.css';
import { MainWeather } from '../weather';
import { LocationForm } from '../locationForm';
import { Weather } from '../../Weather';
import { reduceForecast } from '../../Utils';
import { DailyWeather } from '../DailyForecast';
const { REACT_APP_APP_ID } = process.env;
export class App extends React.Component {
  state = {
    currentDayWeather: undefined,
    location: 'London',
    forecast: [],
    geolocation: '',
  };
  getCoords = async () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const crd = pos.coords;
        console.log('>>>>>>>ЗАБЫЛ ВЕРНУТЬ', crd)
        this.setState({
          geolocation: {lon: crd.longitude, lat: crd.latitude},
        });
      });
    
    } else {
      console.log('FUCK OFF');
    }
    console.log(this.state.geolocation);
  };

  getLocationWeather = async () => {
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?appid=103d2bea1f0fea90b85f7ca4c51dcc4f&lat=47.977100799999995&lon=36.2312349&units=metric`;
    const response = await fetch(requestUrl);
    const data = await response.json();
    this.setState({ currentDayWeather: new Weather(data) });
  };

  getCurrentWeather = async () => {
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${REACT_APP_APP_ID}&q=${this.state.location}&units=metric`;
    const response = await fetch(requestUrl);
    const data = await response.json();
    this.setState({ currentDayWeather: new Weather(data) });
    console.log(this.props.coords);
  };

  getForecast = async () => {
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${REACT_APP_APP_ID}&q=${this.state.location}&units=metric&cnt=40`;
    const response = await fetch(requestUrl);
    const data = await response.json();
    const dayliForecast = reduceForecast(data.list);
    this.setState({ forecast: dayliForecast });
  };

  async componentDidMount() {
    await this.getCoords();
    this.getCurrentWeather();
    this.getForecast();
  }
  search = (text) => {
    this.setState({ location: text }, () => {
      this.getCurrentWeather();
      this.getForecast();
    });
  };

  render() {
    if (!this.state.currentDayWeather) {
      return <h2>LOADING...</h2>;
    }

    return (
      <div>
        <MainWeather data={this.state.currentDayWeather}>
          <LocationForm
            location={this.state.location}
            data={this.state.currentDayWeather}
            onSubmit={this.search}
          />
        </MainWeather>
        <DailyWeather forecast={this.state.forecast} />
      </div>
    );
  }
}
